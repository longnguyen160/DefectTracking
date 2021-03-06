import {
  UPDATE_STATUS_DEFAULT,
  REQUEST_UPDATE_STATUS_DEFAULT,
  UPDATE_STATUS_DEFAULT_FAILURE,
  UPDATE_STATUS_DEFAULT_SUCCESS,
  CREATE_STATUS,
  REQUEST_CREATE_STATUS,
  CREATE_STATUS_FAILURE,
  CREATE_STATUS_SUCCESS,
  LOAD_ALL_STATUS,
  LOAD_ALL_STATUS_REQUEST,
  LOAD_ALL_STATUS_SUCCESS,
  LOAD_ALL_STATUS_FAILURE,
  LOAD_STATUS_DETAILS,
  LOAD_STATUS_DETAILS_REQUEST,
  LOAD_STATUS_DETAILS_SUCCESS,
  LOAD_STATUS_DETAILS_FAILURE,
  REMOVE_STATUS,
  REQUEST_REMOVE_STATUS,
  REMOVE_STATUS_FAILURE,
  REMOVE_STATUS_SUCCESS,
  UPDATE_STATUS,
  REQUEST_UPDATE_STATUS,
  UPDATE_STATUS_FAILURE,
  UPDATE_STATUS_SUCCESS,
  RESET_STATUS
} from './types';
//status default

const updateStatusDefault = (status) => {
  return {
    type: UPDATE_STATUS_DEFAULT,
    status
  }
};

const requestUpdateStatusDefault = () => {
  return {
    type: REQUEST_UPDATE_STATUS_DEFAULT,
  }
};

const updateStatusDefaultSuccess = () => {
  return {
    type: UPDATE_STATUS_DEFAULT_SUCCESS
  }
};

const updateStatusDefaultFailure = (error) => {
  return {
    type: UPDATE_STATUS_DEFAULT_FAILURE,
    error
  }
};

//status
const createStatus = (status, closeModal) => {
  return {
    type: CREATE_STATUS,
    status,
    closeModal
  }
};

const requestCreateStatus = () => {
  return {
    type: REQUEST_CREATE_STATUS
  }
};

const createStatusSuccess = () => {
  return {
    type: CREATE_STATUS_SUCCESS
  }
};

const createStatusFailure = (error) => {
  return {
    type: CREATE_STATUS_FAILURE,
    error
  }
};

const loadAllStatus = (role) => {
  return {
    type: LOAD_ALL_STATUS,
    role
  }
};

const loadAllStatusRequest = () => {
  return {
    type: LOAD_ALL_STATUS_REQUEST
  }
};

const loadAllStatusSuccess = (statusList) => {
  return {
    type: LOAD_ALL_STATUS_SUCCESS,
    statusList
  }
};

const loadAllStatusFailure = (error) => {
  return {
    type: LOAD_ALL_STATUS_FAILURE,
    error
  }
};

const loadStatusDetails = (statusId) => {
  return {
    type: LOAD_STATUS_DETAILS,
    statusId
  }
};

const loadStatusDetailsRequest = () => {
  return {
    type: LOAD_STATUS_DETAILS_REQUEST
  }
};

const loadStatusDetailsSuccess = (status) => {
  return {
    type: LOAD_STATUS_DETAILS_SUCCESS,
    status
  }
};

const loadStatusDetailsFailure = (error) => {
  return {
    type: LOAD_STATUS_DETAILS_FAILURE,
    error
  }
};

const removeStatus = (statusId) => {
  return {
    type: REMOVE_STATUS,
    statusId
  }
};

const requestRemoveStatus = () => {
  return {
    type: REQUEST_REMOVE_STATUS
  }
};

const removeStatusSuccess = () => {
  return {
    type: REMOVE_STATUS_SUCCESS
  }
};

const removeStatusFailure = (error) => {
  return {
    type: REMOVE_STATUS_FAILURE,
    error
  }
};

const updateStatus = (status) => {
  return {
    type: UPDATE_STATUS,
    status
  }
};

const requestUpdateStatus = () => {
  return {
    type: REQUEST_UPDATE_STATUS,
  }
};

const updateStatusSuccess = () => {
  return {
    type: UPDATE_STATUS_SUCCESS
  }
};

const updateStatusFailure = (error) => {
  return {
    type: UPDATE_STATUS_FAILURE,
    error
  }
};

const resetStatus = () => {
  return {
    type: RESET_STATUS
  }
};

export{
  updateStatusDefault,
  requestUpdateStatusDefault,
  updateStatusDefaultSuccess,
  updateStatusDefaultFailure,
  createStatus,
  requestCreateStatus,
  createStatusSuccess,
  createStatusFailure,
  loadAllStatus,
  loadAllStatusRequest,
  loadAllStatusSuccess,
  loadAllStatusFailure,
  loadStatusDetails,
  loadStatusDetailsRequest,
  loadStatusDetailsSuccess,
  loadStatusDetailsFailure,
  removeStatus,
  requestRemoveStatus,
  removeStatusSuccess,
  removeStatusFailure,
  updateStatus,
  requestUpdateStatus,
  updateStatusSuccess,
  updateStatusFailure,
  resetStatus
}
