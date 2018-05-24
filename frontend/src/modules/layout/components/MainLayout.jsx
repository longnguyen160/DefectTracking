import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Notifications from 'react-notification-system-redux';
import TopNavBar from './TopNavBar';
import { loadCurrentUser } from '../actions/layout';
import { logOut } from '../../account/actions/logout';
import { notificationStyle } from '../../../stylesheets/Notifications';

class MainLayout extends React.Component {

  componentWillMount() {
    const { loadCurrentUser } = this.props;

    loadCurrentUser();
  }

  render() {
    const { children, notifications, layout: { user }, logOut, history } = this.props;

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
        />
        {children}
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
  layout: PropTypes.shape({
    isLoading: PropTypes.bool.isRequired,
    user: PropTypes.object,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  })
};

const mapStateToProps = state => ({ layout: state.layout, notifications: state.notifications });

const mapDispatchToProps = dispatch => bindActionCreators({
  loadCurrentUser: loadCurrentUser,
  logOut: logOut
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainLayout));
