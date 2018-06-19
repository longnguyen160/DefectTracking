import {
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  LOAD_FILE_REQUEST,
  LOAD_FILE_SUCCESS,
  LOAD_FILE_FAILURE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
  RESET_FILE_STATE
} from '../actions/types';

const initialState = {
  fileList: [],
  fileIds: [],
  fileData: null,
  error: null,
  isLoading: false
};

export default function file(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case UPLOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        fileIds: action.fileIds,
        error: null
      });

    case UPLOAD_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
        error: null
      });

    case LOAD_FILE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        fileData: action.data,
        error: null
      });

    case LOAD_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case DELETE_FILE_REQUEST:
      return Object.assign({}, state, {
        isLoading: true,
      });

    case DELETE_FILE_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        fileIds: state.fileIds.filter(fileId => fileId !== action.fileId),
        error: null
      });

    case DELETE_FILE_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_FILE_STATE:
      return initialState;

    default:
      return state;
  }
}
