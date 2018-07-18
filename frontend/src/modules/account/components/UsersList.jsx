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
import { openModal } from '../../layout/actions/layout';
import { FILE_BASE_URL, MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import { loadAllUsersInProject } from '../../projects/actions/usersInProject';
import { removeUser } from '../actions/account';
import NoDataProps from '../../../components/table/NoDataProps';
import NoDataComponent from '../../../components/table/NoDataComponent';

class UsersList extends React.Component {

  componentWillMount() {
    const { loadAllUsersInProject, selectedProject } = this.props;

    if (selectedProject) {
      loadAllUsersInProject(selectedProject.id);
    }
  }

  onMessageReceive = () => {
    const { loadAllUsersInProject, selectedProject } = this.props;

    if (selectedProject) {
      loadAllUsersInProject(selectedProject.id);
    }
  };

  render() {
    const { users, openModal, selectedProject, removeUser, loading } = this.props;
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
            <Image topNav src={FILE_BASE_URL + row.row._original.avatarURL || '/images/default_avatar.jpg'}/>
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
      },
      {
        Header: '',
        ...styleColumn,
        Cell: row => (
          <Button
            small
            hasBorder
            remove
            onClick={() => removeUser(selectedProject.id, row.row._original.id)}
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
  loadAllUsersInProject: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  selectedProject: PropTypes.object,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  users: state.project.usersInProject,
  selectedProject: state.layout.selectedProject,
  loading: state.account.isFetching
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadAllUsersInProject: loadAllUsersInProject,
  openModal: openModal,
  removeUser: removeUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UsersList);
