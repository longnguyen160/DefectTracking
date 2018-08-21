import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import Color from 'color';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import ReactTable from "react-table";
import {
  ElementHeaderStyled,
  FormGroupStyled,
  LineFormStyled,
  PageBoardItemStyled,
  PageBoardStyled,
  TitleElementStyled,
  Input,
  TableBlockStyled, Image
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { FILE_BASE_URL, DEFAULT_AVATAR, ROLES } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';
import CalendarIcon from '../../../components/icon/CalendarIcon';
import { getIssueSummary, resetSummary } from '../actions/summary';
import { loadUsersKPI } from '../../management/actions/kpi';
import LoadingComponent from '../../../components/table/LoadingComponent';
import NoDataProps from '../../../components/table/NoDataProps';
import { loadAllStatus } from '../../management/actions/status';
import CustomOptionForSelect from '../../../components/form/CustomOptionForSelect';
import NoDataComponent from '../../../components/table/NoDataComponent';
import { updateCurrentUserRole } from '../../layout/actions/layout';

class Summary extends Component {

  state = {
    options: [
      { value: 'Issues', label: 'Issues' },
      { value: 'Staff', label: 'Staff' }
    ],
    summaryType: { value: 'Issues', label: 'Issues' },
    status: [],
    dates: [],
    from: null,
    to: null
  };

  componentWillMount() {
    const { selectedProject, statusList, loadAllStatus } = this.props;
    let status = [];

    if (statusList.length > 0) {
      const defaultStatus = statusList.find(status => status.default).id;
      const doneStatus = statusList.find(status => status.isDone).id;
      status = [defaultStatus, doneStatus];

      this.setState({ status });
    }
    if (selectedProject) {
      const from = moment(selectedProject.createdAt);
      const to = moment();

      this.setState({
        from,
        to
      });
      this.getSummary(from, to, null, status);
    }
    loadAllStatus(ROLES.ADMIN);
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject, statusList } = nextProps;
    const { updateCurrentUserRole, user } = this.props;

    if (JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const from = moment(selectedProject.createdAt);
      const to = moment();
      const newExistedMember = selectedProject.members.find(member => member.userId === user.id);
      const newRole = newExistedMember ? newExistedMember.role : null;

      this.setState({
        from,
        to
      });

      updateCurrentUserRole(newRole, null);
      this.getSummary(from, to, selectedProject.id);
    }
    if (JSON.stringify(statusList) !== JSON.stringify(this.props.statusList)) {
      const defaultStatus = statusList.find(status => status.default).id;
      const doneStatus = statusList.find(status => status.isDone).id;
      const status = [defaultStatus, doneStatus];

      this.setState({ status });
    }
  }

  componentWillUnmount() {
    const { resetSummary } = this.props;

    resetSummary();
  }

  getRangeOfDates = (number, from, to, projectId, status) => {
    const { getIssueSummary, selectedProject } = this.props;
    if (!status) {
      status = this.state.status;
    }
    let date = from;
    let dates = [];
    let formattedDates = [];

    while (moment(date).isBefore(moment(to))) {
      formattedDates.push(moment(date).format(moment.HTML5_FMT.DATETIME_LOCAL_MS));
      dates.push(moment(date).format('MM/DD/YYYY'));
      date = moment(date).add(number, 'days');
    }
    if (moment(dates[dates.length - 1]).isBefore(moment(to))) {
      formattedDates.push(moment(to).format(moment.HTML5_FMT.DATETIME_LOCAL_MS));
      dates.push(moment(to).format('MM/DD/YYYY'));
    }

    this.setState({ dates });
    getIssueSummary({ projectId: projectId || selectedProject.id, status, dates: formattedDates });
  };

  getSummary = (from, to, projectId, status) => {
    const diffDays = moment(to).diff(moment(from), 'days');
    const { summaryType } = this.state;

    if (summaryType.value === 'Issues') {
      switch (true) {
        case diffDays <= 10:
          this.getRangeOfDates(1, from, to, projectId, status);
          break;

        case diffDays > 10 && diffDays <= 30:
          this.getRangeOfDates(3, from, to, projectId, status);
          break;

        case diffDays > 30 && diffDays <= 60:
          this.getRangeOfDates(5, from, to, projectId, status);
          break;

        case diffDays > 60 && diffDays <= 90:
          this.getRangeOfDates(7, from, to, projectId, status);
          break;

        case diffDays > 90:
          this.getRangeOfDates(30, from, to, projectId, status);
      }
    } else {
      const { loadUsersKPI } = this.props;

      loadUsersKPI({ projectId, from, to });
    }
  };

  handleChangeSelect = (type, value) => {
    if (type === 'summary') {
      if (value.value === 'Staff') {
        const { loadUsersKPI, selectedProject } = this.props;
        const { from, to } = this.state;

        loadUsersKPI({
          projectId: selectedProject.id,
          from: moment(from).format(moment.HTML5_FMT.DATETIME_LOCAL_MS),
          to: moment(to).format(moment.HTML5_FMT.DATETIME_LOCAL_MS)
        });
      }

      this.setState({ summaryType: value });
    } else {
      this.setState({ status: value });
    }
  };

  handleEventDateChange = (type, value) => {
    this.setState({ [type]: value });
  };

  handleFocus = (type) => {
    document.getElementById(type).click();
  };

  handleEventDate = (type, e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      this.setState({ [type]: null });
    }
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

  renderStaffSummary = () => {
    const { usersKPI, loading } = this.props;
    const styleColumn = {
      style: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '13px'
      },
      headerStyle: {
        textAlign: 'left'
      },
    };
    const columns = [
      {
        Header: 'Position',
        accessor: 'position',
        ...styleColumn,
      },
      {
        Header: 'Username',
        ...styleColumn,
        Cell: row => {
          return (
            <TableBlockStyled alignLeft>
              <Image
                topNav
                src={row.original && row.original.user.avatarURL ? FILE_BASE_URL + row.original.user.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}
              />
              {row.original && row.original.user.username}
            </TableBlockStyled>
          )
        }
      },
      {
        Header: 'Point',
        accessor: 'point',
        ...styleColumn,
        Cell: row =>
          <TableBlockStyled alignLeft>
            {row.value} / 100
          </TableBlockStyled>
      },
    ];

    return (
      <ReactTable
        data={usersKPI}
        columns={columns}
        loading={loading}
        LoadingComponent={LoadingComponent}
        getNoDataProps={() => NoDataProps({ loading })}
        NoDataComponent={NoDataComponent}
        defaultPageSize={2}
        pivotBy={['position']}
        className="-striped -highlight"
      />
    )
  };

  dynamicColor = () => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    return "rgb(" + r + "," + g + "," + b + ")";
  };

  render() {
    const { options, from, to, dates, summaryType, status } = this.state;
    const { selectedProject, summaryData, statusList, loadingSummary } = this.props;
    const data = {
      labels: dates,
      datasets: summaryData.map(element => {
        const borderColor = this.dynamicColor();
        const backgroundColor = new Color(borderColor).alpha(0.5);

        return {
          label: `${element.type} Issues`,
          fill: false,
          lineTension: 0.1,
          backgroundColor: backgroundColor.string(),
          borderColor: borderColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: borderColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: borderColor,
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: element.data
        };
      })
    };

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0 0 10px 0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Summary
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled
          visible
        >
          <LineFormStyled>
            <Select
              isSearchable={false}
              placeholder={'Summary'}
              value={summaryType}
              options={options}
              onChange={(e) => this.handleChangeSelect('summary', e)}
              classNamePrefix="react-select"
            />
          </LineFormStyled>
          {
            summaryType.value === 'Issues' &&
              <LineFormStyled hasCheckBox>
                <Select
                  isSearchable={false}
                  placeholder={'Status'}
                  value={status}
                  options={statusList}
                  valueKey={'id'}
                  labelKey={'name'}
                  multi
                  removeSelected={false}
                  closeOnSelect={false}
                  optionComponent={this.optionComponent('status')}
                  onChange={(e) => this.handleChangeSelect('status', e ? e.map(status => status.id) : [])}
                  classNamePrefix="react-select"
                />
              </LineFormStyled>
          }
          <LineFormStyled
            noMargin
            autoWidth
            customDatePicker
            flex={'0'}
          >
            <TitleElementStyled
              fontSize={'14px'}
              fontWeight={400}
              flex={'0'}
              noPadding
            >
              From
            </TitleElementStyled>
            <Input
              value={from ? moment(from).format('MM/DD/YYYY') : ''}
              onFocus={() => this.handleFocus('event_datePicker_from')}
              onKeyDown={(e) => this.handleEventDate('from', e)}
            />
            <DatePicker
              customInput={<CalendarIcon />}
              selected={from}
              id="event_datePicker_from"
              minDate={selectedProject && moment(selectedProject.createdAt)}
              maxDate={moment()}
              onChange={(e) => this.handleEventDateChange('from', e)}
            />
          </LineFormStyled>
          <LineFormStyled
            noMargin
            autoWidth
            customDatePicker
            flex={'0'}
          >
            <TitleElementStyled
              fontSize={'14px'}
              fontWeight={400}
              flex={'0'}
              noPadding
            >
              To
            </TitleElementStyled>
            <Input
              value={to ? moment(to).format('MM/DD/YYYY') : ''}
              onFocus={() => this.handleFocus('event_datePicker_to')}
              onKeyDown={(e) => this.handleEventDate('to', e)}
            />
            <DatePicker
              customInput={<CalendarIcon />}
              selected={to}
              id="event_datePicker_to"
              minDate={from || (selectedProject && moment(selectedProject.createdAt))}
              maxDate={moment()}
              onChange={(e) => this.handleEventDateChange('to', e)}
            />
          </LineFormStyled>
          <LineFormStyled
            noMargin
            autoWidth
            customDatePicker
            flex={'0'}
          >
            {
              loadingSummary ?
                <Button
                  small
                  hasBorder
                  autoHeight
                  disabled
                >
                  <i className="fa fa-circle-o-notch fa-spin" />Loading
                </Button>
              :
                <Button
                  small
                  hasBorder
                  autoHeight
                  onClick={() => this.getSummary(from, to, selectedProject.id)}
                >
                  Get
                </Button>
            }
          </LineFormStyled>
        </FormGroupStyled>
        <PageBoardItemStyled activity margin={'0'}>
          {
            summaryType.value === 'Issues' ?
              <Line
                data={data}
                width={1000}
                height={500}
                options={{
                  maintainAspectRatio: false
                }}
              />
            : this.renderStaffSummary()
          }
        </PageBoardItemStyled>
      </PageBoardStyled>
    );
  }
}

Summary.propTypes = {
  updateCurrentUserRole: PropTypes.func.isRequired,
  getIssueSummary: PropTypes.func.isRequired,
  resetSummary: PropTypes.func.isRequired,
  loadUsersKPI: PropTypes.func.isRequired,
  loadAllStatus: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  user: PropTypes.object,
  summaryData: PropTypes.array.isRequired,
  usersKPI: PropTypes.array.isRequired,
  statusList: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  loadingSummary: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject,
  summaryData: state.summary.summaryData,
  user: state.layout.user,
  usersKPI: state.management.usersKPI.filter(user => user.position !== ROLES.MANAGER),
  statusList: state.management.statusList,
  loading: state.management.isLoading,
  loadingSummary: state.summary.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateCurrentUserRole: updateCurrentUserRole,
  getIssueSummary: getIssueSummary,
  resetSummary: resetSummary,
  loadAllStatus: loadAllStatus,
  loadUsersKPI: loadUsersKPI
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
