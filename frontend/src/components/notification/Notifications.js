import React from 'react';
import { success, error } from 'react-notification-system-redux';
import { store } from '../../index';
import { Icon } from '../../stylesheets/GeneralStyled';

const Notifications = {
  success(message) {
    store.dispatch(success({
      message,
      position: 'tr',
      children: (<Icon className="fa fa-check" />),
    }));
  },
  error(message) {
    store.dispatch(error({
      message,
      position: 'tr',
      children: (<Icon className="fa fa-exclamation-triangle" />),
    }));
  }
};

export function showSuccessNotification(message = 'Done Processing') {
  Notifications.success(message);
}

export function showErrorNotification(message = 'Network Error! Re-connecting...') {
  Notifications.error(message);
}

export default Notifications;
