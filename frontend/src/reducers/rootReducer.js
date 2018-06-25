import { combineReducers } from 'redux';
import { reducer as notifications } from 'react-notification-system-redux';
import { reducer as reducerForm } from 'redux-form';
import account from '../modules/account/reducers/account';
import layout from '../modules/layout/reducers/layout';
import project from '../modules/projects/reducers/project';
import issue from '../modules/issue/reducers/issue';
import management from '../modules/management/reducers/management';
import file from '../modules/file/reducers/file';
import phase from '../modules/phase/reducers/phase';
import backlog from '../modules/backlog/reducers/backlog';

const appReducer = combineReducers({
  account,
  layout,
  project,
  issue,
  management,
  file,
  phase,
  backlog,
  form: reducerForm,
  notifications
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
