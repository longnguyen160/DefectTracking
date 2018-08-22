import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SockJsClient from "react-stomp";
import ReactTable from "react-table";
import {
  ElementHeaderStyled,
  Image,
  PageBoardStyled,
  TableBlockStyled,
  TitleElementStyled
} from '../../../stylesheets/GeneralStyled';
import { Button } from '../../../stylesheets/Button';
import { openModal, updateCurrentUserRole } from '../../layout/actions/layout';
import { FILE_BASE_URL, MODAL_TYPE, WEB_SOCKET_URL, DEFAULT_AVATAR, USER_ROLE_IN_PROJECT } from '../../../utils/enums';
import { loadAllUsersInProject } from '../../projects/actions/usersInProject';
import { removeUser } from '../actions/account';
import NoDataProps from '../../../components/table/NoDataProps';
import LoadingComponent from '../../../components/table/LoadingComponent';
import NoDataComponent from '../../../components/table/NoDataComponent';

class UsersList extends React.Component {

  componentWillMount() {
    const { loadAllUsersInProject, selectedProject } = this.props;

    if (selectedProject) {
      loadAllUsersInProject(selectedProject.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { selectedProject } = nextProps;
    const { loadAllUsersInProject, user, updateCurrentUserRole } = this.props;

    if (JSON.stringify(selectedProject) !== JSON.stringify(this.props.selectedProject)) {
      loadAllUsersInProject(selectedProject.id);
      const newExistedMember = selectedProject.members.find(member => member.userId === user.id);
      const newRole = newExistedMember ? newExistedMember.role : null;

      updateCurrentUserRole(newRole, null);

    }
  }

  onMessageReceive = () => {
    const { loadAllUsersInProject, selectedProject } = this.props;

    if (selectedProject) {
      loadAllUsersInProject(selectedProject.id);
    }
  };

  render() {
    const { users, openModal, selectedProject, removeUser, loading, user } = this.props;
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
        Header: 'Username',
        accessor: 'username',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled>
            <Image topNav src={row.original.avatarURL ? FILE_BASE_URL + row.original.avatarURL : FILE_BASE_URL + DEFAULT_AVATAR}/>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Email',
        accessor: 'email',
        ...styleColumn,
        Cell: row => (
          <TableBlockStyled>
            {row.value}
          </TableBlockStyled>
        )
      },
      {
        Header: 'Role',
        accessor: 'role',
        ...styleColumn,
        Cell: row => USER_ROLE_IN_PROJECT.find(role => role.value === row.value).label
      },
      {
        Header: '',
        ...styleColumn,
        Cell: row => user.id !== row.original.id && (
          <Button
            small
            hasBorder
            remove
            onClick={() => removeUser(selectedProject.id, row.original.id)}
          >
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
          loading={loading}
          LoadingComponent={LoadingComponent}
          getNoDataProps={() => NoDataProps({ loading })}
          NoDataComponent={NoDataComponent}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/usersInProject']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </PageBoardStyled>
    );
  }
}

UsersList.propTypes = {
  users: PropTypes.array.isRequired,
  updateCurrentUserRole: PropTypes.func.isRequired,
  loadAllUsersInProject: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  user: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  users: state.project.usersInProject,
  user: state.layout.user,
  selectedProject: state.layout.selectedProject,
  loading: state.account.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsersInProject: loadAllUsersInProject,
  updateCurrentUserRole: updateCurrentUserRole,
  openModal: openModal,
  removeUser: removeUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
