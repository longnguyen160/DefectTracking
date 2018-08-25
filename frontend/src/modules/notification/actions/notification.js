import {
  LOAD_NOTIFICATION,
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE,
  LOAD_NOTIFICATIONS,
  LOAD_NOTIFICATIONS_REQUEST,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAILURE,
  SET_NOTIFICATION_TO_SEEN,
  SET_NOTIFICATION_TO_SEEN_REQUEST,
  SET_NOTIFICATION_TO_SEEN_SUCCESS,
  SET_NOTIFICATION_TO_SEEN_FAILURE,
  SET_NOTIFICATION_TO_READ,
  SET_NOTIFICATION_TO_READ_REQUEST,
  SET_NOTIFICATION_TO_READ_SUCCESS,
  SET_NOTIFICATION_TO_READ_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_SEEN,
  SET_ALL_NOTIFICATIONS_TO_SEEN_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_SEEN_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_SEEN_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_READ,
  SET_ALL_NOTIFICATIONS_TO_READ_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_READ_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_READ_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_DELETE,
  SET_ALL_NOTIFICATIONS_TO_DELETE_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_DELETE_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_DELETE_FAILURE
} from './types';

const loadNotification = () => ({
  type: LOAD_NOTIFICATION
});

const loadNotificationRequest = () => ({
  type: LOAD_NOTIFICATION_REQUEST
});

const loadNotificationSuccess = (notification) => ({
  type: LOAD_NOTIFICATION_SUCCESS,
  notification
});

const loadNotificationFailure = (error) => ({
  type: LOAD_NOTIFICATION_FAILURE,
  error
});

const loadNotifications = () => ({
  type: LOAD_NOTIFICATIONS
});

const loadNotificationsRequest = () => ({
  type: LOAD_NOTIFICATIONS_REQUEST
});

const loadNotificationsSuccess = (notifications) => ({
  type: LOAD_NOTIFICATIONS_SUCCESS,
  notifications
});

const loadNotificationsFailure = (error) => ({
  type: LOAD_NOTIFICATIONS_FAILURE,
  error
});

const setNotificationToSeen = (notificationId) => ({
  type: SET_NOTIFICATION_TO_SEEN,
  notificationId
});

const setNotificationToSeenRequest = () => ({
  type: SET_NOTIFICATION_TO_SEEN_REQUEST
});

const setNotificationToSeenSuccess = () => ({
  type: SET_NOTIFICATION_TO_SEEN_SUCCESS
});

const setNotificationToSeenFailure = (error) => ({
  type: SET_NOTIFICATION_TO_SEEN_FAILURE,
  error
});

const setNotificationToRead = (notificationId) => ({
  type: SET_NOTIFICATION_TO_READ,
  notificationId
});

const setNotificationToReadRequest = () => ({
  type: SET_NOTIFICATION_TO_READ_REQUEST
});

const setNotificationToReadSuccess = () => ({
  type: SET_NOTIFICATION_TO_READ_SUCCESS
});

const setNotificationToReadFailure = (error) => ({
  type: SET_NOTIFICATION_TO_READ_FAILURE,
  error
});

const setAllNotificationsToSeen = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_SEEN
});

const setAllNotificationsToSeenRequest = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_SEEN_REQUEST
});

const setAllNotificationsToSeenSuccess = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_SEEN_SUCCESS
});

const setAllNotificationsToSeenFailure = (error) => ({
  type: SET_ALL_NOTIFICATIONS_TO_SEEN_FAILURE,
  error
});

const setAllNotificationsToRead = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_READ
});

const setAllNotificationsToReadRequest = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_READ_REQUEST
});

const setAllNotificationsToReadSuccess = (notifications) => ({
  type: SET_ALL_NOTIFICATIONS_TO_READ_SUCCESS,
  notifications
});

const setAllNotificationsToReadFailure = (error) => ({
  type: SET_ALL_NOTIFICATIONS_TO_READ_FAILURE,
  error
});

const setAllNotificationsToDelete = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_DELETE
});

const setAllNotificationsToDeleteRequest = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_DELETE_REQUEST
});

const setAllNotificationsToDeleteSuccess = () => ({
  type: SET_ALL_NOTIFICATIONS_TO_DELETE_SUCCESS
});

const setAllNotificationsToDeleteFailure = (error) => ({
  type: SET_ALL_NOTIFICATIONS_TO_DELETE_FAILURE,
  error
});

export {
  loadNotification,
  loadNotificationRequest,
  loadNotificationSuccess,
  loadNotificationFailure,
  loadNotifications,
  loadNotificationsRequest,
  loadNotificationsSuccess,
  loadNotificationsFailure,
  setNotificationToSeen,
  setNotificationToSeenRequest,
  setNotificationToSeenSuccess,
  setNotificationToSeenFailure,
  setNotificationToRead,
  setNotificationToReadRequest,
  setNotificationToReadSuccess,
  setNotificationToReadFailure,
  setAllNotificationsToSeen,
  setAllNotificationsToSeenRequest,
  setAllNotificationsToSeenSuccess,
  setAllNotificationsToSeenFailure,
  setAllNotificationsToRead,
  setAllNotificationsToReadRequest,
  setAllNotificationsToReadSuccess,
  setAllNotificationsToReadFailure,
  setAllNotificationsToDelete,
  setAllNotificationsToDeleteRequest,
  setAllNotificationsToDeleteSuccess,
  setAllNotificationsToDeleteFailure
}
