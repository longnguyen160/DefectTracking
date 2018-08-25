import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter, matchPath } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import SockJsClient from "react-stomp";
import TopNavBar from './TopNavBar';
import SideBar from './SideBar';
import {
  loadCurrentUser,
  openModal,
  closeModal,
  resetSelectedProject,
  loadProjectDetails,
  selectProject,
  resetUser, loadNotificationCount, resetNotificationCount
} from '../actions/layout';
import { logOut } from '../../account/actions/logout';
import { loadAllProjects } from '../../projects/actions/project';
import { notificationStyle } from '../../../stylesheets/Notifications';
import { FormGroupStyled } from '../../../stylesheets/GeneralStyled';
import { MODAL_TYPE, WEB_SOCKET_URL } from '../../../utils/enums';
import ModalCreatingProject from '../../../components/modal/ModalCreatingProject';
import ModalCreatingAccount from '../../../components/modal/ModalCreatingAccount';
import ModalCreatingIssue from '../../../components/modal/ModalCreatingIssue';
import ModalProfile from '../../../components/modal/ModalProfile';
import ModalIssueDetails from '../../../components/modal/ModalIssueDetails';
import ModalAddUser from '../../../components/modal/ModalAddingUser';
import ModalAddCategory from '../../../components/modal/ModalAddingCategory';
import ModalAddStatus from '../../../components/modal/ModalAddingStatus';
import ModalSummaryReport from '../../../components/modal/ModalSummaryReport';
import { loadIssueDetails } from '../../issue/actions/issue';
import { showCustomNotification } from '../../../components/notification/Notifications';
import {
  loadNotification, setAllNotificationsToSeen,
  setNotificationToRead, setNotificationToSeen
} from '../../notification/actions/notification';

const LIST_MODAL = {
  [MODAL_TYPE.CREATING_PROJECT]: ModalCreatingProject,
  [MODAL_TYPE.CREATING_USER]: ModalCreatingAccount,
  [MODAL_TYPE.CREATING_ISSUE]: ModalCreatingIssue,
  [MODAL_TYPE.PROFILE]: ModalProfile,
  [MODAL_TYPE.ISSUE_DETAILS]: ModalIssueDetails,
  [MODAL_TYPE.ADD_USER]: ModalAddUser,
  [MODAL_TYPE.ADD_CATEGORY]: ModalAddCategory,
  [MODAL_TYPE.ADD_STATUS]: ModalAddStatus,
  [MODAL_TYPE.SUMMARY_REPORT]: ModalSummaryReport
};

const getParams = pathname => {
  const matchProfile = matchPath(pathname, {
    path: `/project/:projectId/`,
  }) || matchPath(pathname, {
    path: `/issue/:issueId`,
  });
  return (matchProfile && matchProfile.params) || {};
};

class MainLayout extends React.Component {

  componentWillMount() {
    const { loadCurrentUser, history, loadAllProjects, selectProject, loadNotificationCount } = this.props;
    const { pathname } = this.props.location;
    const currentParams = getParams(pathname);

    loadNotificationCount();
    loadAllProjects();
    loadCurrentUser(() => {
      history.push('/signin');
    });

    if (currentParams.projectId) {
      const { loadProjectDetails } = this.props;

      loadProjectDetails(currentParams.projectId, (project) => selectProject(project));
    } else if (currentParams.issueId) {
      this.openModal(currentParams.issueId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { notification, loadNotificationCount, setNotificationToSeen } = nextProps;

    if (notification && JSON.stringify(notification) !== JSON.stringify(this.props.notification)) {
      loadNotificationCount();
      showCustomNotification({ handleOpenModal: this.openModal, setNotificationToSeen: setNotificationToSeen }, notification);
    }
  }

  componentWillUnmount() {
    const { resetUser } = this.props;

    resetUser();
  }

  openModal = (issueId, notificationId) => {
    const { openModal, loadIssueDetails, setNotificationToRead } = this.props;

    setNotificationToRead(notificationId);
    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

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

  onMessageReceive = (message) => {
    const { loadCurrentUser, loadNotification, loadNotificationCount } = this.props;

    if (message.message === 'Notification') {
      loadNotificationCount();
      loadNotification();
    } else if (message.message === 'Notifications') {
      loadNotificationCount();
    } else {
      loadCurrentUser();
    }
  };

  render() {
    const {
      children,
      notifications,
      layout: { user, selectedProject, notificationCount },
      logOut,
      history,
      openModal,
      loadProjectDetails,
      selectProject,
      setAllNotificationsToSeen,
      resetNotificationCount
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
          notificationCount={notificationCount}
          loadProjectDetails={loadProjectDetails}
          resetNotificationCount={resetNotificationCount}
          setAllNotificationsToSeen={setAllNotificationsToSeen}
        />
        <FormGroupStyled padding>
          <SideBar
            history={history}
            user={user}
            selectedProject={selectedProject}
          />
          {children}
        </FormGroupStyled>
        {this.handleOpenModal()}
        {
          user &&
            <SockJsClient
              url={WEB_SOCKET_URL}
              topics={['/topic/currentUser', `/topic/${user.id}/notification`]}
              onMessage={this.onMessageReceive}
              debug={true}
            />
        }
      </div>
    );
  }
}

MainLayout.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.object.isRequired,
  notification: PropTypes.object,
  notifications: PropTypes.array.isRequired,
  loadCurrentUser: PropTypes.func.isRequired,
  loadProjectDetails: PropTypes.func.isRequired,
  loadAllProjects: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectProject: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  loadNotification: PropTypes.func.isRequired,
  loadNotificationCount: PropTypes.func.isRequired,
  resetUser: PropTypes.func.isRequired,
  setNotificationToSeen: PropTypes.func.isRequired,
  setNotificationToRead: PropTypes.func.isRequired,
  setAllNotificationsToSeen: PropTypes.func.isRequired,
  resetNotificationCount: PropTypes.func.isRequired,
  layout: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    modalIsOpen: PropTypes.bool.isRequired,
    modalType: PropTypes.string.isRequired,
    selectedProject: PropTypes.object,
    notificationCount: PropTypes.number.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({
  layout: state.layout,
  notification: state.notification.notification,
  notifications: state.notifications
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCurrentUser: loadCurrentUser,
  logOut: logOut,
  openModal: openModal,
  closeModal: closeModal,
  resetSelectedProject: resetSelectedProject,
  selectProject: selectProject,
  loadAllProjects: loadAllProjects,
  loadProjectDetails: loadProjectDetails,
  loadIssueDetails: loadIssueDetails,
  loadNotification: loadNotification,
  loadNotificationCount: loadNotificationCount,
  setNotificationToSeen: setNotificationToSeen,
  setNotificationToRead: setNotificationToRead,
  setAllNotificationsToSeen: setAllNotificationsToSeen,
  resetNotificationCount: resetNotificationCount,
  resetUser: resetUser,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
