import {
  LOAD_NOTIFICATION_REQUEST,
  LOAD_NOTIFICATIONS_SUCCESS,
  LOAD_NOTIFICATIONS_FAILURE,
  LOAD_NOTIFICATIONS_REQUEST,
  LOAD_NOTIFICATION_SUCCESS,
  LOAD_NOTIFICATION_FAILURE,
  SET_NOTIFICATION_TO_SEEN_REQUEST,
  SET_NOTIFICATION_TO_SEEN_SUCCESS,
  SET_NOTIFICATION_TO_SEEN_FAILURE,
  SET_NOTIFICATION_TO_READ_REQUEST,
  SET_NOTIFICATION_TO_READ_SUCCESS,
  SET_NOTIFICATION_TO_READ_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_SEEN_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_SEEN_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_SEEN_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_READ_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_READ_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_READ_FAILURE,
  SET_ALL_NOTIFICATIONS_TO_DELETE_REQUEST,
  SET_ALL_NOTIFICATIONS_TO_DELETE_SUCCESS,
  SET_ALL_NOTIFICATIONS_TO_DELETE_FAILURE
} from '../actions/types';

const initialState = {
  notification: null,
  notifications: [],
  isLoading: false,
  error: null
};

export default function notification(state = initialState, action) {
  switch (action.type) {
    case LOAD_NOTIFICATION_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_NOTIFICATION_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        notification: action.notification
      });

    case LOAD_NOTIFICATION_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_NOTIFICATIONS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_NOTIFICATIONS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        notifications: action.notifications
      });

    case LOAD_NOTIFICATIONS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SET_NOTIFICATION_TO_SEEN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case SET_NOTIFICATION_TO_SEEN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case SET_NOTIFICATION_TO_SEEN_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SET_NOTIFICATION_TO_READ_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case SET_NOTIFICATION_TO_READ_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case SET_NOTIFICATION_TO_READ_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SET_ALL_NOTIFICATIONS_TO_SEEN_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case SET_ALL_NOTIFICATIONS_TO_SEEN_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case SET_ALL_NOTIFICATIONS_TO_SEEN_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SET_ALL_NOTIFICATIONS_TO_READ_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case SET_ALL_NOTIFICATIONS_TO_READ_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        notifications: action.notifications
      });

    case SET_ALL_NOTIFICATIONS_TO_READ_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case SET_ALL_NOTIFICATIONS_TO_DELETE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case SET_ALL_NOTIFICATIONS_TO_DELETE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        notifications: []
      });

    case SET_ALL_NOTIFICATIONS_TO_DELETE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        notification: [],
        error: action.error
      });

    default:
      return state;
  }
}
