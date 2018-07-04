import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import ReactTable from 'react-table';
import {
  CheckBoxWrapper,
  ElementHeaderStyled,
  InputCheckboxStyled,
  IssueStatusStyled,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled,
  Input
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { ISSUE_STATUS_ARRAY, MODAL_TYPE, WEB_SOCKET_URL, USER_ROLE_IN_PROJECT, ROLES } from '../../../utils/enums';
import { openModal } from '../../layout/actions/layout';
import { loadAllStatus, removeStatus, updateStatus, updateStatusDefault } from '../actions/status';

class StatusManagement extends Component {

  componentWillMount() {
    const { loadAllStatus } = this.props;

    loadAllStatus(ROLES.ADMIN);
  }

  handleCheckbox = (event, role, row) => {
    const { updateStatus } = this.props;
    let status = {};

    if (row.handlers.includes(role)) {
      status = Object.assign(status, row, {
        handlers: row.handlers.filter(element => element !== role)
      });
    } else {
      let { handlers } = row;

      handlers.push(role);
      status = Object.assign(status, row, {
        handlers
      });
    }
    updateStatus(status);
  };

  handleRadioButton = (row) => {
    const { updateStatusDefault } = this.props;

    updateStatusDefault(row.id);
  };

  onMessageReceive = () => {
    const { loadAllStatus } = this.props;

    loadAllStatus(ROLES.ADMIN);
  };

  render() {
    const { openModal, statusList, removeStatus } = this.props;
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
        width: 200,
        Cell: row => (
          <TableBlockStyled
            alignLeft
            onClick={() => openModal(MODAL_TYPE.ADD_STATUS)}
          >
            <IssueStatusStyled status={row.original}>
              {row.value}
            </IssueStatusStyled>
          </TableBlockStyled>
        )
      },
      {
        Header: 'Allow role',
        accessor: 'handlers',
        ...styleColumn,
        width: 450,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {
              USER_ROLE_IN_PROJECT.map(role => (
                <CheckBoxWrapper key={role.value}>
                  <InputCheckboxStyled
                    id={`${row.original.id}-${role.value}`}
                    type="checkbox"
                    onChange={(e) => this.handleCheckbox(e, role.value, row.original)}
                    checked={row.value.includes(role.value)}
                  />
                  <label htmlFor={`${row.original.id}-${role.value}`}>
                    {role.label}
                  </label>
                </CheckBoxWrapper>
              ))
            }
          </TableBlockStyled>
        )
      },
      {
        Header: 'Default status when user create',
        accessor: 'default',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Input
              autoWidth
              type={'radio'}
              name={'default'}
              value={row.original.name}
              checked={row.value}
              onChange={() => this.handleRadioButton(row.original)}
            />
          </TableBlockStyled>
        )
      },
      {
        Header: 'Action',
        ...styleColumn,
        Cell: row => (
          <Button
            small
            hasBorder
            remove
            onClick={() => removeStatus(row.original.id)}
          >
            Remove
          </Button>
        )
      },
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Status
          </TitleElementStyled>
          <Button autoWidth hasBorder right onClick={() => openModal(MODAL_TYPE.ADD_STATUS)}>
            Add Status
          </Button>
        </ElementHeaderStyled>
        <ReactTable
          data={statusList}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/status']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

StatusManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllStatus: PropTypes.func.isRequired,
  updateStatus: PropTypes.func.isRequired,
  removeStatus: PropTypes.func.isRequired,
  updateStatusDefault: PropTypes.func.isRequired,
  statusList: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  statusList: state.management.statusList,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllStatus: loadAllStatus,
  updateStatus: updateStatus,
  updateStatusDefault: updateStatusDefault,
  removeStatus: removeStatus
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(StatusManagement);
