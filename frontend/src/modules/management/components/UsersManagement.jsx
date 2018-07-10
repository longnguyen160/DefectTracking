import React from 'react';
import PropTypes from 'prop-types';
import SockJsClient from 'react-stomp';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import {
  ElementHeaderStyled, Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';
import { loadAllUsers } from '../../account/actions/account';
import { banUser } from '../actions/user';

class UsersManagement extends React.Component {

  componentWillMount() {
    const { loadAllUsers } = this.props;

    loadAllUsers();
  }

  onMessageReceive = () => {
    const { loadAllUsers } = this.props;

    loadAllUsers();
  };

  render() {
    const { openModal, users, banUser } = this.props;
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
        Header: 'Username',
        accessor: 'username',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            <Image topNav src={row.original.profile && row.original.profile.avatarURL ? row.original.profile.avatarURL : '/images/default_avatar.jpg'}/>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Email',
        accessor: 'email',
        ...styleColumn
      },
      {
        Header: 'Name',
        accessor: 'profile',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {`${(row.value && row.value.firstName) || ''} ${(row.value && row.value.lastName) || ''}`}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Age',
        accessor: 'profile',
        ...styleColumn,
        width: 50,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {row.value && row.value.age}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Phone',
        accessor: 'profile',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {row.value && row.value.phone}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Active',
        accessor: 'active',
        ...styleColumn,
        width: 80,
        Cell: row => (
          <TableBlockStyled alignLeft>
            {row.value ? 'Active' : 'Locked'}
          </TableBlockStyled>
        )
      },
      {
        Header: '',
        ...styleColumn,
        Cell: row => (
          <div>
          <Button
            hasBorder
            remove
            fullWidth
            onClick={() => banUser({ id: row.original.id, active: !row.original.active })}
          >
            { row.original.active ? 'Lock account' : 'Unlock account' }
          </Button>
        </div>
        ),
      },

    ];


    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Users
          </TitleElementStyled>
          <Button autoWidth hasBorder right onClick={() => openModal(MODAL_TYPE.ADD_USER)}>
            Add New User
          </Button>
        </ElementHeaderStyled>
        <ReactTable
          data={users}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/manageUser']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

UsersManagement.propTypes = {
  openModal: PropTypes.func.isRequired,
  loadAllUsers: PropTypes.func.isRequired,
  banUser: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  users: state.account.users
});

const mapDispatchToProps = dispatch => bindActionCreators({
  openModal: openModal,
  loadAllUsers: loadAllUsers,
  banUser: banUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersManagement);
