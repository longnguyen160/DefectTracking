import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import { connect } from 'react-redux';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import {
  ElementHeaderStyled,
  FormGroupStyled,
  Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { loadAllIssues } from '../actions/issue';
import { FILE_BASE_URL } from '../../../utils/enums';


class IssueList extends React.Component {

  componentWillMount() {
    const { loadAllIssues } = this.props;

    loadAllIssues();
  }

  render() {
    const { issues } = this.props;
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
        Header: 'Summary',
        accessor: 'issueName',
        ...styleColumn,
      },
      {
        Header: 'Assignee',
        accessor: 'assignee',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.value && row.value.avatarURL ? FILE_BASE_URL + row.value.avatarURL : '/images/default_avatar.jpg'}/>
            {row.value && row.value.username}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Reporter',
        accessor: 'reporter',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.value && row.value.avatarURL ? FILE_BASE_URL + row.value.avatarURL : '/images/default_avatar.jpg'}/>
            {row.value && row.value.username}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Priority',
        accessor: 'priority',
        ...styleColumn,
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        ...styleColumn,
        Cell: row => moment(row.value).format('LLL')
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        ...styleColumn,
        Cell: row => moment(row.value).format('LLL')
      },
      {
        Header: 'Status',
        accessor: 'status',
        ...styleColumn,
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
          data={issues}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

IssueList.propTypes = {
  issues: PropTypes.array.isRequired,
  loadAllIssues: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  issues: state.issue.issues,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllIssues: loadAllIssues
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(IssueList);
