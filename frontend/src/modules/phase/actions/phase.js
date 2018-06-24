import {
  CREATE_PHASE,
  REQUEST_CREATE_PHASE,
  CREATE_PHASE_SUCCESS,
  CREATE_PHASE_FAILURE,
  LOAD_ALL_PHASES,
  LOAD_ALL_PHASES_REQUEST,
  LOAD_ALL_PHASES_SUCCESS,
  LOAD_ALL_PHASES_FAILURE
} from './types';

const createPhase = (phase, closeModal) => {
  return {
    type: CREATE_PHASE,
    phase,
    closeModal
  }
};

const requestCreatePhase = () => {
  return {
    type: REQUEST_CREATE_PHASE
  }
};

const createPhaseSuccess = () => {
  return {
    type: CREATE_PHASE_SUCCESS
  }
};

const createPhaseFailure = (error) => {
  return {
    type: CREATE_PHASE_FAILURE,
    error
  }
};

const loadAllPhases = (projectId) => {
  return {
    type: LOAD_ALL_PHASES,
    projectId
  }
};

const loadAllPhasesRequest = () => {
  return {
    type: LOAD_ALL_PHASES_REQUEST
  }
};

const loadAllPhasesSuccess = (phases) => {
  return {
    type: LOAD_ALL_PHASES_SUCCESS,
    phases
  }
};

const loadAllPhasesFailure = (error) => {
  return {
    type: LOAD_ALL_PHASES_FAILURE,
    error
  }
};

export {
  createPhase,
  requestCreatePhase,
  createPhaseSuccess,
  createPhaseFailure,
  loadAllPhases,
  loadAllPhasesRequest,
  loadAllPhasesSuccess,
  loadAllPhasesFailure
}
