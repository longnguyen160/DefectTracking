import {
  CREATE_MESSAGE_REQUEST,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  LOAD_ALL_MESSAGES_REQUEST,
  LOAD_ALL_MESSAGES_SUCCESS,
  LOAD_ALL_MESSAGES_FAILURE
} from '../actions/types';

const initialState = {
  messages: [],
  isLoading: false,
  error: null
};

export default function message(state = initialState, action) {
  switch (action.type) {

    case CREATE_MESSAGE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case CREATE_MESSAGE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_MESSAGE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_MESSAGES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        messages: action.messages
      });

    case LOAD_ALL_MESSAGES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
      
    default:
      return state;
  }
}
