import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
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
import { FILE_BASE_URL, ICONS, ROLES } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';
import CalendarIcon from '../../../components/icon/CalendarIcon';
import { getIssueSummary, resetSummary } from '../actions/summary';
import { loadUsersKPI } from '../../management/actions/kpi';
import NoDataComponent from '../../../components/table/NoDataComponent';
import NoDataProps from '../../../components/table/NoDataProps';

class Summary extends Component {

  state = {
    options: [
      { value: 'Issues', label: 'Issues' },
      { value: 'Staff', label: 'Staff' }
    ],
    summaryType: { value: 'Issues', label: 'Issues' },
    dates: [],
    from: null,
    to: null
  };

  componentWillMount() {
    const { selectedProject } = this.props;

    if (selectedProject) {
      const from = moment(selectedProject.createdAt);
      const to = moment();

      this.setState({
        from,
        to
      });
      this.getSummary(from, to);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject } = nextProps;

    if (JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      const from = moment(selectedProject.createdAt);
      const to = moment();

      this.setState({
        from,
        to
      });
      this.getSummary(from, to, selectedProject.id);
    }
  }

  componentWillUnmount() {
    const { resetSummary } = this.props;

    resetSummary();
  }

  getRangeOfDates = (number, from, to, projectId) => {
    const { getIssueSummary, selectedProject } = this.props;
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
      dates.push(moment(date).format('MM/DD/YYYY'));
    }

    this.setState({ dates });
    getIssueSummary({ projectId: projectId || selectedProject.id, dates: formattedDates });
  };

  getSummary = (from, to, projectId) => {
    const diffDays = moment(to).diff(moment(from), 'days');

    switch (true) {
      case diffDays <= 10:
        this.getRangeOfDates(1, from, to, projectId);
        break;

      case diffDays > 10 && diffDays <= 30:
        this.getRangeOfDates(3, from, to, projectId);
        break;

      case diffDays > 30 && diffDays <= 60:
        this.getRangeOfDates(5, from, to, projectId);
        break;

      case diffDays > 60 && diffDays <= 90:
        this.getRangeOfDates(7, from, to, projectId);
        break;

      case diffDays > 90:
        this.getRangeOfDates(30, from, to, projectId);
    }
  };

  handleChangeSelect = (value) => {
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
          console.log(row);
          return (
            <TableBlockStyled alignLeft>
              <Image topNav
                     src={row.original && row.original.user.avatarURL ? FILE_BASE_URL + row.original.user.avatarURL : '/images/default_avatar.jpg'}/>
              {row.original && row.original.user.username}
            </TableBlockStyled>
          )
        }
      },
      {
        Header: 'Point',
        accessor: 'point',
        ...styleColumn,
      },
    ];

    return (
      <ReactTable
        data={usersKPI}
        columns={columns}
        getNoDataProps={() => NoDataProps({ loading })}
        NoDataComponent={NoDataComponent}
        defaultPageSize={2}
        pivotBy={['position']}
        className="-striped -highlight"
      />
    )
  };

  render() {
    const { options, from, to, dates, summaryType } = this.state;
    const { selectedProject, summaryData } = this.props;
    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Created Issues',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: summaryData.length > 0 ? summaryData[0].data : []
        },
        {
          label: 'Resolved Issues',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(255,99,132,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(255,99,132,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: summaryData.length > 0 ? summaryData[1].data : []
        }
      ]
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
              onChange={this.handleChangeSelect}
              classNamePrefix="react-select"
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
            <Button
              small
              hasBorder
              autoHeight
              onClick={() => this.getSummary(from, to)}
            >
              Get
            </Button>
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
  getIssueSummary: PropTypes.func.isRequired,
  resetSummary: PropTypes.func.isRequired,
  loadUsersKPI: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  summaryData: PropTypes.array.isRequired,
  usersKPI: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  selectedProject: state.layout.selectedProject,
  summaryData: state.summary.summaryData,
  usersKPI: state.management.usersKPI.filter(user => user.position !== ROLES.MANAGER),
  loading: state.management.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getIssueSummary: getIssueSummary,
  resetSummary: resetSummary,
  loadUsersKPI: loadUsersKPI
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
