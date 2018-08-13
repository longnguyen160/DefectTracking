import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import {
  ElementHeaderStyled,
  FormGroupStyled,
  Image, Input,
  IssueStatusStyled, LineFormStyled,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { loadAllIssues } from '../actions/issue';
import { FILE_BASE_URL, ICONS, ISSUE_PRIORITY_ARRAY, DEFAULT_AVATAR } from '../../../utils/enums';
import Icon from '../../../components/icon/Icon';
import NoDataProps from '../../../components/table/NoDataProps';
import LoadingComponent from '../../../components/table/LoadingComponent';
import NoDataComponent from '../../../components/table/NoDataComponent';
import CalendarIcon from '../../../components/icon/CalendarIcon';

class IssueList extends React.Component {

  state = {
    filtered: []
  };

  fetchData = (state) => {
    const { loadAllIssues } = this.props;

    loadAllIssues({
      page: state.page,
      pageSize: state.pageSize,
      sorted: state.sorted[0],
      filtered: state.filtered.map((filter) => {
        if (filter.id === 'createdAt' || filter.id === 'finishedAt') {
          return Object.assign({}, filter, {
            value: moment(filter.value).format('MM/DD/YYYY')
          });
        }

        return filter;
      })
    });
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

  render() {
    const { issues, loading, pages } = this.props;
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
        Header: 'Issue Key',
        accessor: 'issueKey',
        ...styleColumn,
        width: 80,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Summary',
        accessor: 'issueName',
        ...styleColumn,
        width: 200,
        Cell: row => (
          <TableBlockStyled alignLeft fullText>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Assignee',
        accessor: 'assignee',
        ...styleColumn,
        Filter: () => null,
        Cell: row => row.value && row.value.username ?
          (
            <TableBlockStyled alignLeft>
              <Image topNav src={row.value && row.value.avatarURL ? FILE_BASE_URL + row.value.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
              {row.value && row.value.username}
            </TableBlockStyled>
          )
        :
          (
            <TableBlockStyled alignLeft>
              No assignee yet
            </TableBlockStyled>
          )
      },
      {
        Header: 'Reporter',
        accessor: 'reporter',
        ...styleColumn,
        Filter: () => null,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.value && row.value.avatarURL ? FILE_BASE_URL + row.value.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
            {row.value && row.value.username}
          </TableBlockStyled>
        )
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
        Header: 'Finished At',
        accessor: 'finishedAt',
        ...styleColumn,
        Filter: ({ filter, onChange }) =>
          <LineFormStyled
            noMargin
            customDatePicker
          >
            <Input
              value={filter ? moment(filter.value).format('MM/DD/YYYY') : ''}
              onFocus={() => this.handleFocus('event_datePicker_finishedAt')}
              onKeyDown={(e) => this.handleEventDate('finishedAt', e)}
            />
            <DatePicker
              id="event_datePicker_finishedAt"
              customInput={<CalendarIcon />}
              selected={filter ? filter.value : null}
              maxDate={moment()}
              onChange={onChange}
            />
          </LineFormStyled>
        ,
        Cell: row => row.value && moment(row.value).format('LLL')
      },
      {
        Header: 'Status',
        accessor: 'status',
        ...styleColumn,
        width: 90,
        Filter: () => null,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <IssueStatusStyled status={row.value}>
              {row.value.name}
            </IssueStatusStyled>
          </TableBlockStyled>
        )
      }
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Issues
          </TitleElementStyled>
        </ElementHeaderStyled>
        <FormGroupStyled visible>
          <Select
            isSearchable={false}
            placeholder={'Project'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Status'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Assignee'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
          />
          <Select
            isSearchable={false}
            placeholder={'Reporter'}
            options={[
              { value: 'My Issue', label: 'One' },
              { value: 'All Issue', label: 'Two' }
            ]}
            classNamePrefix="react-select"
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
        <ReactTable
          manual
          filterable={true}
          data={issues}
          columns={columns}
          defaultPageSize={10}
          pages={pages}
          loading={loading}
          filtered={filtered}
          onFilteredChange={data => this.setState({ filtered: data })}
          LoadingComponent={LoadingComponent}
          getLoadingProps={() => ({ filter: true })}
          getNoDataProps={() => NoDataProps({ loading })}
          NoDataComponent={NoDataComponent}
          onFetchData={this.fetchData}
          getTheadFilterThProps={() => { return { style: { position: "inherit", overflow: "inherit" } } }}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

IssueList.propTypes = {
  issues: PropTypes.array.isRequired,
  pages: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  loadAllIssues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  issues: state.issue.issues,
  loading: state.issue.isLoading,
  pages: state.issue.pages
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllIssues: loadAllIssues
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
