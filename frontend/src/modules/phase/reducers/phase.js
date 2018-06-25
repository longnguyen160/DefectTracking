import {
  REQUEST_CREATE_PHASE,
  CREATE_PHASE_SUCCESS,
  CREATE_PHASE_FAILURE,
  LOAD_ALL_PHASES_REQUEST,
  LOAD_ALL_PHASES_SUCCESS,
  LOAD_ALL_PHASES_FAILURE,
  LOAD_ACTIVE_PHASE_REQUEST,
  LOAD_ACTIVE_PHASE_SUCCESS,
  LOAD_ACTIVE_PHASE_FAILURE,
  RESET_PHASE
} from '../actions/types';

const initialState = {
  phases: [],
  activePhase: null,
  isLoading: false,
  error: null,
};

export default function phase(state = initialState, action) {
  switch (action.type) {

    case REQUEST_CREATE_PHASE:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case CREATE_PHASE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_PHASE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_PHASES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ALL_PHASES_SUCCESS:
      return Object.assign({}, state, {
        phases: action.phases,
        error: null
      });

    case LOAD_ALL_PHASES_FAILURE:
      return Object.assign({}, state, {
        error: action.error
      });

    case LOAD_ACTIVE_PHASE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_ACTIVE_PHASE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        activePhase: action.phase
      });

    case LOAD_ACTIVE_PHASE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_PHASE:
      return initialState;

    default:
      return state;
  }
}
