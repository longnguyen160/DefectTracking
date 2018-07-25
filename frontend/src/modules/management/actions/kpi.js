import {
  LOAD_ALL_KPI,
  LOAD_ALL_KPI_REQUEST,
  LOAD_ALL_KPI_SUCCESS,
  LOAD_ALL_KPI_FAILURE,
  UPDATE_KPI,
  UPDATE_KPI_REQUEST,
  UPDATE_KPI_SUCCESS,
  UPDATE_KPI_FAILURE,
  LOAD_USERS_KPI,
  LOAD_USERS_KPI_REQUEST,
  LOAD_USERS_KPI_SUCCESS,
  LOAD_USERS_KPI_FAILURE
}from './types';

const loadAllKPI = () => {
  return {
    type: LOAD_ALL_KPI
  }
};

const loadAllKPIRequest = () => {
  return {
    type: LOAD_ALL_KPI_REQUEST
  }
};

const loadAllKPISuccess = (data) => {
  return {
    type: LOAD_ALL_KPI_SUCCESS,
    data
  }
};

const loadAllKPIFailure = (error) => {
  return {
    type: LOAD_ALL_KPI_FAILURE,
    error
  }
};

const updateKPI = (kpi) => {
  return {
    type: UPDATE_KPI,
    kpi
  }
};

const updateKPIRequest = () => {
  return {
    type: UPDATE_KPI_REQUEST
  }
};

const updateKPISuccess = () => {
  return {
    type: UPDATE_KPI_SUCCESS,
  }
};

const updateKPIFailure = (error) => {
  return {
    type: UPDATE_KPI_FAILURE,
    error
  }
};

const loadUsersKPI = (dataRequest) => {
  return {
    type: LOAD_USERS_KPI,
    dataRequest
  }
};

const loadUsersKPIRequest = () => {
  return {
    type: LOAD_USERS_KPI_REQUEST
  }
};

const loadUsersKPISuccess = (data) => {
  return {
    type: LOAD_USERS_KPI_SUCCESS,
    data
  }
};

const loadUsersKPIFailure = (error) => {
  return {
    type: LOAD_USERS_KPI_FAILURE,
    error
  }
};

export {
  loadAllKPI,
  loadAllKPIRequest,
  loadAllKPISuccess,
  loadAllKPIFailure,
  updateKPI,
  updateKPIRequest,
  updateKPISuccess,
  updateKPIFailure,
  loadUsersKPI,
  loadUsersKPIRequest,
  loadUsersKPISuccess,
  loadUsersKPIFailure
}
