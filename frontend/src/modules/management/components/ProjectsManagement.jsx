import React from 'react';
import PropTypes from 'prop-types';
import ReactTable from "react-table";
import {
  ElementHeaderStyled, Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import moment from 'moment/moment';
import { Button } from '../../../stylesheets/Button';

class ProjectsManagement extends React.Component {
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
        Header: 'Project Manager',
        accessor: 'manager',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.value.avatarURL ? row.value.avatarURL : '/images/default_avatar.jpg'}/>
            {row.value.username}
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
    const projects = [
      {
        name: 'ABC',
        manager: 'Bim beo',
        category: 'FPT'
      },
      {
        name: 'DEF',
        manager: 'Bim bim',
        category: 'FPT'
      }
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Projects
          </TitleElementStyled>
        </ElementHeaderStyled>
        <ReactTable
          data={projects}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

export default ProjectsManagement;
