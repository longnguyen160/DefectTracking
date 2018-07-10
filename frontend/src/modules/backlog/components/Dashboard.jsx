import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import SockJsClient from "react-stomp";
import {
  ElementHeaderStyled,
  FormGroupStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableBodyContainerStyled,
  ListTableBodyItemStyled,
  ListTableBodyStyled,
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled,
  ListTableStyled
} from '../../../stylesheets/Table';
import { Button } from '../../../stylesheets/Button';
import {
  loadAllCategoriesInProject,
  loadProjectDetails,
  openModal,
  updateCurrentUserRole
} from '../../layout/actions/layout';
import {
  ICONS,
  ISSUE_PRIORITY_ARRAY,
  MODAL_TYPE,
  ROLES,
  WEB_SOCKET_URL
} from '../../../utils/enums';
import { getFilter, updateBacklog, updateFilter } from '../actions/backlog';
import Icon from '../../../components/icon/Icon';
import Column from './Column';
import CustomOptionForSelect from '../../../components/form/CustomOptionForSelect';
import CustomValueForSelect from '../../../components/form/CustomValueForSelect';
import { loadAllUsersInProject } from '../../projects/actions/usersInProject';
import { loadAllStatus } from '../../management/actions/status';
import { loadAllIssuesBasedOnFilter, loadIssueDetails, resetIssueList } from '../../issue/actions/issue';

class Dashboard extends Component {

  constructor(props) {
    super(props);

    const { selectedProject, filter, user } = props;

    this.state = {
      view: 'list',
      filter: {
        ...filter,
        projectId: selectedProject && selectedProject.id,
        userId: user && user.id
      }
    };
  }

  componentWillMount() {
    const {
      loadAllStatus,
      loadAllCategoriesInProject,
      selectedProject,
      user,
      getFilter,
      filter,
      loadAllIssuesBasedOnFilter,
    } = this.props;

    loadAllStatus(ROLES.ADMIN);
    if (user && !filter) {
      getFilter(user.id);
    } else if (filter) {
      loadAllIssuesBasedOnFilter(filter);
      this.setState({ filter });
    }
    if (selectedProject) {
      loadAllCategoriesInProject(selectedProject.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject, user, issues, filter } = nextProps;
    const { updateCurrentUserRole, loadAllUsersInProject, getFilter, loadAllCategoriesInProject, loadAllIssuesBasedOnFilter, updateFilter } = this.props;

    if (user && !this.props.user) {
      const filterState = this.state.filter;

      this.setState({
        filter: Object.assign(filterState, {
          userId: user.id
        })
      });
      getFilter(user.id);
    }
    if (filter && JSON.stringify(filter) !== JSON.stringify(this.state.filter) && selectedProject) {
      const newFilter = Object.assign(filter, {
        projectId: selectedProject.id
      });

      this.setState({
        filter: newFilter
      });
      updateFilter(newFilter);
      loadAllIssuesBasedOnFilter(newFilter);
    }
    if (user && JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const list = {
        backlog: selectedProject.backlog
      };
      const existedMember = selectedProject.members.find(member => member.userId === user.id);

      loadAllUsersInProject(selectedProject.id);
      loadAllCategoriesInProject(selectedProject.id);

      if (existedMember) {
        updateCurrentUserRole(existedMember.role);
      }
      this.setState({ list });
    }
    if (JSON.stringify(issues) !== JSON.stringify(this.props.issues)) {
      const list = {
        backlog: issues
      };

      this.setState({ list });
    }
  }

  componentWillUnmount() {
    const { resetIssueList } = this.props;

    resetIssueList();
  }

  handleChangeView = (type) => {
    this.setState({ view: type });
  };

  handleChangeSelect = (type, value) => {
    let { filter } = this.state;
    const { updateFilter, loadAllIssuesBasedOnFilter } = this.props;

    filter = Object.assign(filter, {
      [type]: value
    });
    this.setState({ filter });
    loadAllIssuesBasedOnFilter(filter);
    updateFilter(filter);
  };

  handleOpenModal = (issueId) => {
    const { openModal, loadIssueDetails } = this.props;

    loadIssueDetails(issueId);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  optionComponent = (name) => {
    return (props) => (
      <CustomOptionForSelect
        name={name}
        {...props}
      />
    );
  };

  valueComponent = (name) => {
    return (props) => (
      <CustomValueForSelect
        name={name}
        {...props}
      />
    );
  };

  onMessageReceive = () => {
    const { loadAllIssuesBasedOnFilter } = this.props;
    const { filter } = this.state;

    loadAllIssuesBasedOnFilter(filter);
  };

  render() {
    const { view, filter } = this.state;
    const { usersInProject, statusList, categories, issues, openModal } = this.props;

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Dashboard
          </TitleElementStyled>
          <TitleElementStyled noPadding flex={'0 0 60px'}>
            <Icon
              icon={ICONS.MENU}
              color={view === 'list' ? '#d1d1d1' : '#1A1A1A'}
              width={20}
              height={20}
              margin={'0 5px'}
              onClick={() => this.handleChangeView('list')}
            />
            |
            <Icon
              icon={ICONS.COLUMN}
              color={view === 'column' ? '#d1d1d1' : '#1A1A1A'}
              width={15}
              height={15}
              margin={'0 5px'}
              onClick={() => this.handleChangeView('column')}
            />
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled visible>
          <Select
            isSearchable={false}
            placeholder={'Status'}
            options={statusList}
            valueKey={'id'}
            labelKey={'name'}
            value={filter['status']}
            onChange={(e) => this.handleChangeSelect('status', e ? e.id : null)}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Priority'}
            options={ISSUE_PRIORITY_ARRAY}
            name={'priority'}
            value={filter['priority']}
            optionComponent={this.optionComponent('priority')}
            valueComponent={this.valueComponent('priority')}
            classNamePrefix="react-select"
            onChange={(e) => this.handleChangeSelect('priority', e ? e.value : null)}
          />
          <Select
            isSearchable={false}
            placeholder={'Assignee'}
            options={usersInProject}
            value={filter['assignee']}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            onChange={(e) => this.handleChangeSelect('assignee', e ? e.id : null)}
          />
          <Select
            isSearchable={false}
            placeholder={'Reporter'}
            options={usersInProject}
            value={filter['reporter']}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            onChange={(e) => this.handleChangeSelect('reporter', e ? e.id : null)}
          />
          <Select
            isSearchable={false}
            placeholder={'Category'}
            options={categories}
            valueKey={'id'}
            labelKey={'name'}
            classNamePrefix="react-select"
            value={filter['categories']}
            multi
            onChange={(e) => this.handleChangeSelect('categories', e ? e.map(category => category.id) : [])}
          />
        </FormGroupStyled>
        {
          view === 'list' ?
            <PageBoardItemStyled activity margin={'0'}>
              <ElementHeaderStyled padding={'20px 5px'}>
                <TitleElementStyled noPadding flex={'0 0 85px'}>
                  Issues
                </TitleElementStyled>
                <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                  {issues.length} Issues
                </TitleElementStyled>
                <TitleElementStyled noPadding flex={'0'}>
                  <Button hasBorder onClick={() => openModal(MODAL_TYPE.CREATING_ISSUE)}>
                    Create Issue
                  </Button>
                </TitleElementStyled>
              </ElementHeaderStyled>
              <div>
                <div>
                  <ListTableHeaderStyled>
                    <ListTableHeaderItemsStyled itemId>Issue</ListTableHeaderItemsStyled>
                    <ListTableHeaderItemsStyled issueName>Name</ListTableHeaderItemsStyled>
                    <ListTableHeaderItemsStyled priority>Priority</ListTableHeaderItemsStyled>
                  </ListTableHeaderStyled>
                  <ListTableBodyContainerStyled willChange>
                    {
                      issues.map((issue, index) => {
                        const priority = ISSUE_PRIORITY_ARRAY.find(element => element.value === issue.priority);

                        return (
                          <ListTableStyled
                            onClick={() => this.handleOpenModal(issue.id)}
                            key={issue.id}
                            odd={index % 2 === 0}
                          >
                            <ListTableBodyStyled
                              showList
                              noBackground
                              fixed
                              color={issue.status}
                            >
                              <ListTableBodyItemStyled itemId>
                                {issue.issueKey}
                              </ListTableBodyItemStyled>
                              <ListTableBodyItemStyled issueName>
                                {issue.summary}
                              </ListTableBodyItemStyled>
                              <ListTableBodyItemStyled priority>
                                <Icon
                                  icon={ICONS.ARROW}
                                  color={priority && priority.color}
                                  width={15}
                                  height={15}
                                  rotated rotate={'rotateZ(90deg)'}
                                />
                              </ListTableBodyItemStyled>
                            </ListTableBodyStyled>
                          </ListTableStyled>
                        );
                      })
                    }
                  </ListTableBodyContainerStyled>
                </div>
              </div>
            </PageBoardItemStyled>
          :
            <Column />
        }
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList', '/topic/message']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

Dashboard.propTypes = {
  loadProjectDetails: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  updateCurrentUserRole: PropTypes.func.isRequired,
  loadAllUsersInProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadAllStatus: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  getFilter: PropTypes.func.isRequired,
  loadAllCategoriesInProject: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  loadAllIssuesBasedOnFilter: PropTypes.func.isRequired,
  resetIssueList: PropTypes.func.isRequired,
  usersInProject: PropTypes.array.isRequired,
  statusList: PropTypes.array.isRequired,
  issues: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  user: PropTypes.object,
  filter: PropTypes.object,
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject,
  user: state.layout.user,
  statusList: state.management.statusList,
  issues: state.issue.issues,
  filter: state.backlog.filter,
  categories: state.layout.categories,
  usersInProject: state.project.usersInProject.map(user => ({
    value: user.id,
    label: user.username,
    ...user
  }))
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadProjectDetails: loadProjectDetails,
  updateBacklog: updateBacklog,
  updateCurrentUserRole: updateCurrentUserRole,
  openModal: openModal,
  loadAllUsersInProject: loadAllUsersInProject,
  loadAllStatus: loadAllStatus,
  updateFilter: updateFilter,
  getFilter: getFilter,
  loadAllCategoriesInProject: loadAllCategoriesInProject,
  loadIssueDetails: loadIssueDetails,
  loadAllIssuesBasedOnFilter: loadAllIssuesBasedOnFilter,
  resetIssueList: resetIssueList
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
