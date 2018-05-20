export const notificationStyle = {
  // Override the notification item
  NotificationItem: {
    // Applied to every notification, regardless of the notification level
    DefaultStyle: {
      borderRadius: '0px 0px 6px 6px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end',
      margin: '0px 0px 8px 0px',
      padding: '10px 18px 10px 10px',
    },
    // Applied only to the success notification item
    success: {
      border: '1px solid #b3da56',
      backgroundColor: '#b3da56',
    },
    // Applied only to the error notification item
    error: {
      border: '1px solid #d24229',
      backgroundColor: '#d24229',
    }
  }
};
