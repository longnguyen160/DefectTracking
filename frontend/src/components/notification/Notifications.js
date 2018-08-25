import React from 'react';
import { success, error, info } from 'react-notification-system-redux';
import { store } from '../../index';
import { Icon } from '../../stylesheets/GeneralStyled';
import NotificationDetails from '../../modules/notification/components/NotificationDetails';

const Notifications = {
  custom(handleFunction, notification) {
    store.dispatch(info({
      position: 'br',
      children: (
        <NotificationDetails
          handleOpenModal={handleFunction.handleOpenModal}
          setNotificationToSeen={handleFunction.setNotificationToSeen}
          notification={notification}
        />
      )
    }));
  },
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

export function showCustomNotification(handleFunction, notification) {
  Notifications.custom(handleFunction, notification);
}

export default Notifications;
