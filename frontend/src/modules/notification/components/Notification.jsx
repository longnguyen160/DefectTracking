import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Scrollbars } from 'react-custom-scrollbars';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  NotificationHeader,
  NotificationHeaderAction,
  NotificationBody,
  NotificationBodyContent,
  NotificationAction,
  NotificationBodyContentMessage,
  NotificationStyled,
  AngelUpStyled
} from '../../../stylesheets/TopNavBar';
import NotificationDetails from './NotificationDetails';
import { MODAL_TYPE } from '../../../utils/enums';
import { loadIssueDetails } from '../../issue/actions/issue';
import { openModal } from '../../layout/actions/layout';
import {
  loadNotifications,
  setAllNotificationsToDelete,
  setAllNotificationsToRead,
  setNotificationToRead,
} from '../actions/notification';
import LoadingIcon from '../../../components/icon/LoadingIcon';
import { ElementHeaderStyled } from '../../../stylesheets/GeneralStyled';
import Tooltip from '../../../components/tooltip/Tooltip';


class Notification extends Component {

  componentWillMount() {
    const { loadNotifications } = this.props;

    loadNotifications();
  }

  handleOpenModal = (issueId, notificationId) => {
    const { openModal, loadIssueDetails, setNotificationToRead, closeNotification } = this.props;

    closeNotification();
    setNotificationToRead(notificationId, 'read');
    loadIssueDetails(issueId, true);
    openModal(MODAL_TYPE.ISSUE_DETAILS);
  };

  renderNotificationItem = (notification) => (
    <NotificationBodyContentMessage key={notification.id} unread={!notification.read}>
      <NotificationDetails
        notification={notification}
        handleOpenModal={this.handleOpenModal}
      />
      <NotificationAction onClick={() => this.props.setNotificationToRead(notification.id, notification.read ? 'unread' : 'read')}>
        <Tooltip content={`Mark as ${notification.read ? 'Unread': 'Read'}`}>
          {
            notification.read ?
              <i className="fa fa-dot-circle-o" />
            :
              <i className="fa fa-circle" />
          }
        </Tooltip>
      </NotificationAction>
    </NotificationBodyContentMessage>
  );

  render() {
    const { notifications, loading, setAllNotificationsToRead, setAllNotificationsToDelete } = this.props;

    return (
      <NotificationStyled notification>
        <AngelUpStyled right={'14px'} />
        <NotificationHeader>
          <h3>Notification</h3>
          <NotificationHeaderAction>
            <span onClick={() => setAllNotificationsToRead()}>
              Mark All as Read
            </span>
            <i> · </i>
            <span onClick={() => setAllNotificationsToDelete()}>
              Clear All
            </span>
          </NotificationHeaderAction>
        </NotificationHeader>
        <NotificationBody>
          <NotificationBodyContent>
            <Scrollbars
              ref={scroll => this.scroll = scroll}
              autoHide
              style={{ position: 'relative', height: 480 }}
            >
              {notifications.map(notification => this.renderNotificationItem(notification))}
              {
                loading &&
                  <ElementHeaderStyled loading>
                    <LoadingIcon />
                  </ElementHeaderStyled>
              }
            </Scrollbars>
          </NotificationBodyContent>
        </NotificationBody>
      </NotificationStyled>
    );
  }
}

Notification.propTypes = {
  notifications: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  loadIssueDetails: PropTypes.func.isRequired,
  loadNotifications: PropTypes.func.isRequired,
  closeNotification: PropTypes.func.isRequired,
  setNotificationToRead: PropTypes.func.isRequired,
  setAllNotificationsToRead: PropTypes.func.isRequired,
  setAllNotificationsToDelete: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  notifications: state.notification.notifications,
  loading: state.notification.isLoading
});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadIssueDetails: loadIssueDetails,
  openModal: openModal,
  loadNotifications: loadNotifications,
  setNotificationToRead: setNotificationToRead,
  setAllNotificationsToRead: setAllNotificationsToRead,
  setAllNotificationsToDelete: setAllNotificationsToDelete
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
