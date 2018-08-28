import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Select from 'react-select';
import ReactTable from 'react-table';
import SockJsClient from 'react-stomp';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import {
  ElementHeaderStyled,
  FormGroupStyled,
  Input,
  IssueStatusStyled,
  LineFormStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import {
  ListTableBodyStyled,
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
import NoDataProps from '../../../components/table/NoDataProps';
import LoadingComponent from '../../../components/table/LoadingComponent';
import NoDataComponent from '../../../components/table/NoDataComponent';
import CalendarIcon from '../../../components/icon/CalendarIcon';


class Dashboard extends Component {

  constructor(props) {
    super(props);

    const { selectedProject, filter, user } = props;

    this.state = {
      view: 'list',
      filtered: [],
      issueListRequest: {},
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
      loadAllUsersInProject,
      selectedProject,
      user,
      getFilter,
      filter,
    } = this.props;

    loadAllStatus(ROLES.ADMIN);
    if (user && !filter) {
      getFilter(user.id);
    } else if (filter) {
      this.setState({ filter });
    }
    if (selectedProject) {
      loadAllUsersInProject(selectedProject.id);
      loadAllCategoriesInProject(selectedProject.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject, user, issues, filter } = nextProps;
    const { updateCurrentUserRole, loadAllUsersInProject, getFilter, loadAllCategoriesInProject, loadAllIssuesBasedOnFilter, updateFilter } = this.props;
    const { issueListRequest } = this.state;

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
      loadAllIssuesBasedOnFilter(issueListRequest, newFilter);
    }
    if (user && JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const list = {
        backlog: selectedProject.backlog
      };
      const newExistedMember = selectedProject.members.find(member => member.userId === user.id);
      const newRole = newExistedMember ? newExistedMember.role : null;
      const oldRole = user.roles.find(role => role !== ROLES.USER && role !== ROLES.ADMIN);
      let newFilter = Object.assign(filter || this.state.filter, {
        projectId: selectedProject.id
      });

      if (this.props.selectedProject && selectedProject.id !== this.props.selectedProject.id) {
        newFilter = Object.assign(newFilter, {
          assignee: [],
          reporter: []
        });
      }
      this.setState({
        filter: newFilter
      });
      loadAllIssuesBasedOnFilter(issueListRequest, newFilter);
      updateFilter(newFilter);
      loadAllUsersInProject(selectedProject.id);
      loadAllCategoriesInProject(selectedProject.id);
      updateCurrentUserRole(newRole, oldRole);
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

  fetchData = (state) => {
    const { loadAllIssuesBasedOnFilter, selectedProject } = this.props;
    const { filter } = this.state;
    const issueListRequest = {
      page: state.page,
      pageSize: 10,
      sorted: state.sorted[0],
      filtered: state.filtered.map((filter) => {
        if (filter.id === 'createdAt') {
          return Object.assign({}, filter, {
            value: moment(filter.value).format('MM/DD/YYYY')
          });
        }

        return filter;
      })
    };

    if (JSON.stringify(issueListRequest) !== JSON.stringify(this.state.issueListRequest)) {
      this.setState({ issueListRequest });

      if (selectedProject) {
        loadAllIssuesBasedOnFilter(issueListRequest, filter);
      }
    }
  };

  handleFocus = (type) => {
    document.getElementById(type).click();
  };

  handleEventDate = (type, e) => {
    let { filtered } = this.state;

    if (e.keyCode === 8 || e.keyCode === 46) {
      e.target.value = '';
      filtered = filtered.filter(filter => filter.id !== type);
      this.setState({ filtered });
    }
  };

  handleChangeView = (type) => {
    this.setState({ view: type });
  };

  handleChangeSelect = (type, value) => {
    let { filter } = this.state;
    const { issueListRequest } = this.state;
    const { updateFilter, loadAllIssuesBasedOnFilter } = this.props;

    filter = Object.assign(filter, {
      [type]: value
    });
    this.setState({ filter });
    loadAllIssuesBasedOnFilter(issueListRequest, filter);
    updateFilter(filter);
  };

  handleOpenModal = (issueId) => {
    const { openModal, loadIssueDetails } = this.props;

    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  optionComponent = (name) => {
    return (props) => (
      <CustomOptionForSelect
        name={name}
        multi={true}
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

  renderRow = (props) => (
    <ListTableStyled
      className={'rt-tr ' + props.className}
      odd={props.index % 2 === 0}
      onClick={() => this.handleOpenModal(props.original && props.original.id)}
      style={{
        ...props.style,
      }}
    >
      <ListTableBodyStyled
        showList
        noBackground
        fixed
        done={props.original && props.original.status.done}
        color={props.original && props.original.status.background}
      >
        {props.children}
      </ListTableBodyStyled>
    </ListTableStyled>
  );

  renderHeader = (props) => (
    <ListTableHeaderStyled
      className={`rt-thead ${props.className}`}
      padding={'0'}
      style={{
        ...props.style
      }}
    >
      {props.children}
    </ListTableHeaderStyled>
  );

  renderList = () => {
    const { issues, loadingIssues, pages } = this.props;
    const { filtered } = this.state;
    const styleColumn = {
      style: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px'
      },
      headerStyle: {
        textAlign: 'left'
      }
    };
    const columns = [
      {
        Header: 'Issue',
        accessor: 'issueKey',
        ...styleColumn,
        width: 85
      },
      {
        Header: 'Name',
        accessor: 'issueName',
        ...styleColumn,
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        ...styleColumn,
        width: 85,
        Filter: () => null,
        Cell: (row) => {
          const priority = ISSUE_PRIORITY_ARRAY.find(element => element.value === row.value);

          return (
            <TableBlockStyled alignLeft>
              <Icon
                icon={ICONS.ARROW}
                color={priority && priority.color}
                width={15}
                height={15}
                rotated rotate={'rotateZ(90deg)'}
              />
              <span>{priority && priority.label}</span>
            </TableBlockStyled>
          );
        }
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        ...styleColumn,
        width: 200,
        Filter: ({ filter, onChange }) =>
          <LineFormStyled
            noMargin
            customDatePicker
          >
            <Input
              value={filter ? moment(filter.value).format('MM/DD/YYYY') : ''}
              onFocus={() => this.handleFocus('event_datePicker_createdAt')}
              onKeyDown={(e) => this.handleEventDate('createdAt', e)}
            />
            <DatePicker
              id="event_datePicker_createdAt"
              customInput={<CalendarIcon />}
              selected={filter ? filter.value : null}
              maxDate={moment()}
              onChange={onChange}
            />
          </LineFormStyled>
        ,
        Cell: row => moment(row.value).format('LLL')
      },
      {
        Header: 'Status',
        accessor: 'status',
        ...styleColumn,
        width: 100,
        Filter: () => null,
        Cell: (row) => (
          <IssueStatusStyled small status={row.value}>
            {row.value.name}
          </IssueStatusStyled>
        )
      }
    ];

    return (
      <ReactTable
        manual
        filterable={true}
        columns={columns}
        data={issues}
        pages={pages}
        filtered={filtered}
        onFilteredChange={data => this.setState({ filtered: data })}
        style={{ willChange: 'transform' }}
        getTrGroupProps={(state, rowInfo, column, instance) => rowInfo}
        TrGroupComponent={this.renderRow}
        TheadComponent={this.renderHeader}
        loading={loadingIssues}
        getLoadingProps={() => ({ filter: true })}
        onFetchData={this.fetchData}
        LoadingComponent={LoadingComponent}
        getNoDataProps={() => NoDataProps({ loading: loadingIssues })}
        NoDataComponent={NoDataComponent}
        getTheadFilterThProps={() => { return { style: { position: "inherit", overflow: "inherit" } } }}
        pageSize={issues.length < 10 ? issues.length : 10}
        showPageSizeOptions={false}
      />
    );
  };

  onMessageReceive = () => {
    const { loadAllIssuesBasedOnFilter } = this.props;
    const { filter, issueListRequest } = this.state;

    loadAllIssuesBasedOnFilter(issueListRequest, filter);
  };

  render() {
    const { view, filter } = this.state;
    const { usersInProject, statusList, categories, issues, openModal, user } = this.props;

    return (
      <PageBoardStyled block>
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
            multi
            removeSelected={false}
            closeOnSelect={false}
            optionComponent={this.optionComponent('status')}
            onChange={(e) => this.handleChangeSelect('status', e ? e.map(status => status.id) : [])}
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
            multi
            removeSelected={false}
            closeOnSelect={false}
            onChange={(e) => this.handleChangeSelect('priority', e ? e.map(priority => priority.value) : [])}
          />
          <Select
            isSearchable={false}
            placeholder={'Assignee'}
            options={usersInProject}
            value={filter['assignee']}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            multi
            removeSelected={false}
            closeOnSelect={false}
            onChange={(e) => this.handleChangeSelect('assignee', e ? e.map(assignee => assignee.id) : [])}
          />
          <Select
            isSearchable={false}
            placeholder={'Reporter'}
            options={usersInProject}
            value={filter['reporter']}
            classNamePrefix="react-select"
            optionComponent={this.optionComponent('user')}
            valueComponent={this.valueComponent('user')}
            multi
            removeSelected={false}
            closeOnSelect={false}
            onChange={(e) => this.handleChangeSelect('reporter', e ? e.map(reporter => reporter.id) : [])}
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
            removeSelected={false}
            closeOnSelect={false}
            optionComponent={this.optionComponent('category')}
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
                {
                  user && ((user.roles.length === 1 && !user.roles.includes(ROLES.USER)) || (user.roles.includes(ROLES.USER) && user.roles.length > 1 && !user.roles.includes(ROLES.DEVELOPER))) &&
                    <TitleElementStyled noPadding flex={'0'}>
                      <Button hasBorder onClick={() => openModal(MODAL_TYPE.CREATING_ISSUE)}>
                        Create Issue
                      </Button>
                    </TitleElementStyled>
                }
              </ElementHeaderStyled>
              {this.renderList()}
            </PageBoardItemStyled>
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
  pages: PropTypes.number.isRequired,
  categories: PropTypes.array.isRequired,
  selectedProject: PropTypes.object,
  user: PropTypes.object,
  filter: PropTypes.object,
  loadingIssues: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject,
  user: state.layout.user,
  statusList: state.management.statusList,
  issues: state.issue.issues,
  pages: state.issue.pages,
  loadingIssues: state.issue.isLoading,
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
