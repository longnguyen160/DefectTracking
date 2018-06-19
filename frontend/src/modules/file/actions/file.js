import {
  UPLOAD_FILE,
  UPLOAD_FILE_REQUEST,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE,
  LOAD_FILE,
  LOAD_FILE_REQUEST,
  LOAD_FILE_SUCCESS,
  LOAD_FILE_FAILURE,
  DELETE_FILE,
  DELETE_FILE_REQUEST,
  DELETE_FILE_SUCCESS,
  DELETE_FILE_FAILURE,
  RESET_FILE_STATE
} from './types';

const uploadFile = (file) => {
  return {
    type: UPLOAD_FILE,
    file
  }
};

const uploadFileRequest = () => {
  return {
    type: UPLOAD_FILE_REQUEST
  }
};

const uploadFileSuccess = (fileIds) => {
  return {
    type: UPLOAD_FILE_SUCCESS,
    fileIds
  }
};

const uploadFileFailure = (error) => {
  return {
    type: UPLOAD_FILE_FAILURE,
    error
  }
};

const loadFile = (fileId) => {
  return {
    type: LOAD_FILE,
    fileId
  }
};

const loadFileRequest = () => {
  return {
    type: LOAD_FILE_REQUEST
  }
};

const loadFileSuccess = (data) => {
  return {
    type: LOAD_FILE_SUCCESS,
    data
  }
};

const loadFileFailure = (error) => {
  return {
    type: LOAD_FILE_FAILURE,
    error
  }
};

const deleteFile = (fileId) => {
  return {
    type: DELETE_FILE,
    fileId
  }
};

const deleteFileRequest = () => {
  return {
    type: DELETE_FILE_REQUEST
  }
};

const deleteFileSuccess = (fileId) => {
  return {
    type: DELETE_FILE_SUCCESS,
    fileId
  }
};

const deleteFileFailure = (error) => {
  return {
    type: DELETE_FILE_FAILURE,
    error
  }
};

const resetState = () => {
  return {
    type: RESET_FILE_STATE
  }
};

export {
  uploadFile,
  uploadFileRequest,
  uploadFileSuccess,
  uploadFileFailure,
  loadFile,
  loadFileRequest,
  loadFileSuccess,
  loadFileFailure,
  deleteFile,
  deleteFileRequest,
  deleteFileSuccess,
  deleteFileFailure,
  resetState
}
