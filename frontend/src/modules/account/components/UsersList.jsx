import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from "react-table";
import { loadAllUsers } from '../actions/account';
import {
  ElementHeaderStyled,
  Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal } from '../../layout/actions/layout';
import { MODAL_TYPE } from '../../../utils/enums';

class UsersList extends React.Component {

  componentWillMount() {
    const { loadAllUsers } = this.props;

    loadAllUsers();
  }

  render() {
    const { users, openModal } = this.props;
    const columns = [
      {
        Header: 'Username',
        accessor: 'username',
        style: {
          display: 'flex',
          alignItems: 'center',
          fontSize: '13px'
        },
        headerStyle: {
          textAlign: 'left'
        },
        Cell: row => (
          <TableBlockStyled>
            <Image topNav src={row.row.profile ? row.row.profile.imageSrc : '/images/default_avatar.jpg'}/>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Email',
        accessor: 'email',
        style: {
          display: 'flex',
          alignItems: 'center',
          fontSize: '13px'
        },
        headerStyle: {
          textAlign: 'left'
        },
        Cell: row => (
          <TableBlockStyled>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Role',
        headerStyle: {
          textAlign: 'left'
        },
      },
      {
        Header: '',
        headerStyle: {
          textAlign: 'left'
        },
        Cell: row => (
          <Button hasBorder remove>
            Remove
          </Button>
        )
      }
    ];

    return (
      <PageBoardStyled backlog>
        <ElementHeaderStyled padding={'0'}>
          <TitleElementStyled noPadding fontSize={'20px'}>
            Members
          </TitleElementStyled>
          <Button hasBorder right onClick={() => openModal(MODAL_TYPE.ADD_USER)}>
            Add member
          </Button>
        </ElementHeaderStyled>
        <ReactTable
          data={users}
          columns={columns}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </PageBoardStyled>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  loadAllUsers: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  users: state.account.users,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsers: loadAllUsers,
  openModal: openModal
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
