import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as reducerForm } from 'redux-form';
import account from '../modules/account/reducers/account';
import layout from '../modules/layout/reducers/layout';
import project from '../modules/projects/reducers/project';

const appReducer = combineReducers({
  account,
  layout,
  project,
  form: reducerForm,
  notifications
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
