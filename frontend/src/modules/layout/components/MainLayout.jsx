import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import SockJsClient from "react-stomp";
import TopNavBar from './TopNavBar';
import SideBar from './SideBar';
import { loadCurrentUser, openModal, closeModal, resetProject, selectProject } from '../actions/layout';
import { logOut } from '../../account/actions/logout';
import { notificationStyle } from '../../../stylesheets/Notifications';
import { FormGroupStyled } from '../../../stylesheets/GeneralStyled';
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import ModalCreatingProject from '../../../components/modal/ModalCreatingProject';
import ModalCreatingAccount from '../../../components/modal/ModalCreatingAccount';
import ModalCreatingIssue from '../../../components/modal/ModalCreatingIssue';
import ModalProfile from '../../../components/modal/ModalProfile';
import ModalIssueDetails from '../../../components/modal/ModalIssueDetails';
import ModalAddUser from '../../../components/modal/ModalAddUser';


const LIST_MODAL = {
  [MODAL_TYPE.CREATING_PROJECT]: ModalCreatingProject,
  [MODAL_TYPE.CREATING_USER]: ModalCreatingAccount,
  [MODAL_TYPE.CREATING_ISSUE]: ModalCreatingIssue,
  [MODAL_TYPE.PROFILE]: ModalProfile,
  [MODAL_TYPE.ISSUE_DETAILS]: ModalIssueDetails,
  [MODAL_TYPE.ADD_USER]: ModalAddUser
};

class MainLayout extends React.Component {

  componentWillMount() {
    const { loadCurrentUser, history } = this.props;

    loadCurrentUser(() => {
      history.push('/signin');
    });
  }

  handleOpenModal = () => {
    const { closeModal, layout: { modalIsOpen, modalType } } = this.props;
    const Modal = LIST_MODAL[modalType];

    if (Modal) {
      return (
        <Modal
          isOpen={modalIsOpen}
          onClose={closeModal}
        />
      );
    }

    return null;
  };

  onMessageReceive = () => {
    const { loadCurrentUser } = this.props;

    loadCurrentUser();
  };

  render() {
    const {
      children,
      notifications,
      layout: { user, selectedProject },
      logOut,
      history,
      openModal,
      selectProject
    } = this.props;

    return (
      <div className="app-wrapper">
        <Notifications
          notifications={notifications}
          style={notificationStyle}
        />
        <TopNavBar
          user={user}
          logOut={logOut}
          history={history}
          openModal={openModal}
          selectProject={selectProject}
        />
        <FormGroupStyled padding>
          <SideBar
            history={history}
            selectedProject={selectedProject}
          />
          {children}
        </FormGroupStyled>
        {this.handleOpenModal()}
        <SockJsClient
          url={WEB_SOCKET_URL}
          topics={['/topic/currentUser']}
          onMessage={this.onMessageReceive}
          debug={true}
        />
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired,
  notifications: PropTypes.array.isRequired,
  loadCurrentUser: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  layout: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    modalIsOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedProject: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  layout: state.layout,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCurrentUser: loadCurrentUser,
  logOut: logOut,
  openModal: openModal,
  closeModal: closeModal,
  resetProject: resetProject,
  selectProject: selectProject
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
