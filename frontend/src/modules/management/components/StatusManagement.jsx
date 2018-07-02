import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTable from 'react-table';
import {
  ElementHeaderStyled,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';

class StatusManagement extends Component {
  render() {
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
        Header: 'Name',
        accessor: 'name',
        ...styleColumn,
      },
      {
        Header: 'Color',
        accessor: 'color',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            123
          </TableBlockStyled>
        )
      },
      {
        Header: 'Project Category',
        accessor: 'category',
        ...styleColumn,
      },
      {
        Header: 'Action',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Button hasBorder>
              Delete
            </Button>
          </TableBlockStyled>
        )
      },
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Status
          </TitleElementStyled>
        </ElementHeaderStyled>
        <ReactTable
          data={[]}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

StatusManagement.propTypes = {};

export default StatusManagement;
