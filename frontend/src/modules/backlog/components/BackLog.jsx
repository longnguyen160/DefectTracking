import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import { DragDropContext } from 'react-beautiful-dnd';
import SockJsClient from "react-stomp";
import {
  ElementHeaderStyled,
  FormGroupStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableHeaderItemsStyled,
  ListTableHeaderStyled
} from '../../../stylesheets/Table';
import BacklogDetails from './BacklogDetails';
import { reorderMap } from '../../../utils/ultis';
import { Button } from '../../../stylesheets/Button';
import { loadProjectDetails, openModal, updateCurrentUserRole } from '../../layout/actions/layout';
import {
  ICONS,
  ISSUE_PRIORITY_ARRAY,
  COLOR_ARRAY,
  MODAL_TYPE,
  ROLES,
  WEB_SOCKET_URL
} from '../../../utils/enums';
import { updateBacklog } from '../actions/backlog';
import Icon from '../../../components/icon/Icon';
import Column from './Column';
import CustomOptionForSelect from '../../../components/form/CustomOptionForSelect';
import CustomValueForSelect from '../../../components/form/CustomValueForSelect';
import { loadAllUsersInProject } from '../../projects/actions/usersInProject';
import { loadAllStatus } from '../../management/actions/status';
import { updateFilter } from '../../issue/actions/issue';

class BackLog extends React.Component {

  constructor(props) {
    super(props);

    const { selectedProject, user } = props;

    this.state = {
      view: 'list',
      filter: {
        userId: user && user.id
      },
      list: {
        backlog: selectedProject ? selectedProject.backlog : []
      }
    };
  }

  componentWillMount() {
    const { loadAllStatus } = this.props;

    loadAllStatus(ROLES.ADMIN);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject, user, issues } = nextProps;
    const { updateCurrentUserRole, loadAllUsersInProject } = this.props;

    if (JSON.stringify(user) !== JSON.stringify(this.props.user)) {
      const filter = {
        userId: user.id
      };

      this.setState({ filter });
    }
    if (user && JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const list = {
        backlog: selectedProject.backlog
      };

      loadAllUsersInProject(selectedProject.id);
      updateCurrentUserRole(selectedProject.members.find(member => member.userId === user.id).role);
      this.setState({ list });
    }
    if (JSON.stringify(issues) !== JSON.stringify(this.props.issues)) {
      const list = {
        backlog: issues
      };

      this.setState({ list });
    }
  }

  handleChangeView = (type) => {
    this.setState({ view: type });
  };

  handleChangeSelect = (type, value) => {
    let { filter } = this.state;
    const { updateFilter } = this.props;

    filter = Object.assign(filter, {
      [type]: value
    });
    this.setState({ filter });
    updateFilter(filter);
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const { list } = this.state;
    const { selectedProject, updateBacklog } = this.props;
    const updatedList = reorderMap(
      list,
      result.source,
      result.destination
    );

    this.setState({
      list: updatedList,
    });

    if (JSON.stringify(updatedList.backlog) !== JSON.stringify(selectedProject.backlog)) {
      updateBacklog(selectedProject.id, updatedList.backlog);
    }
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
    const { selectedProject, loadProjectDetails } = this.props;

    loadProjectDetails(selectedProject.id);
  };

  render() {
    const { list, view } = this.state;
    const { usersInProject, statusList } = this.props;

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
            onChange={(e) => this.handleChangeSelect('status', e.id)}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Priority'}
            options={ISSUE_PRIORITY_ARRAY}
            name={'priority'}
            optionComponent={this.optionComponent('priority')}
            valueComponent={this.valueComponent('priority')}
            classNamePrefix="react-select"
            onChange={(e) => this.handleChangeSelect('priority', e.value)}
          />
          <Select
            isSearchable={false}
            placeholder={'Assignee'}
            options={usersInProject}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            onChange={(e) => this.handleChangeSelect('assignee', e.id)}
          />
          <Select
            isSearchable={false}
            placeholder={'Reporter'}
            options={usersInProject}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            onChange={(e) => this.handleChangeSelect('reporter', e.id)}
          />
          <Select
            isSearchable={false}
            placeholder={'Category'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
        </FormGroupStyled>
        {
          view === 'list' ?
            <DragDropContext onDragEnd={this.onDragEnd}>
              <PageBoardItemStyled activity margin={'0'}>
                <ElementHeaderStyled padding={'20px 5px'}>
                  <TitleElementStyled noPadding flex={'0 0 85px'}>
                    Issues
                  </TitleElementStyled>
                  <TitleElementStyled noPadding fontWeight={400} fontSize={'14px'}>
                    {list.backlog.length} Issues
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
                    <BacklogDetails
                      listId="backlog"
                      listType="card"
                      data={list.backlog}
                    />
                  </div>
                </div>
              </PageBoardItemStyled>
            </DragDropContext>
          :
            <Column />
        }
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/issuesList']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

BackLog.propTypes = {
  loadProjectDetails: PropTypes.func.isRequired,
  updateBacklog: PropTypes.func.isRequired,
  updateCurrentUserRole: PropTypes.func.isRequired,
  loadAllUsersInProject: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  loadAllStatus: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  usersInProject: PropTypes.array.isRequired,
  statusList: PropTypes.array.isRequired,
  issues: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject,
  user: state.layout.user,
  statusList: state.management.statusList,
  issues: state.issue.issues,
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
  updateFilter: updateFilter
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BackLog);
