import {
  CREATE_PHASE,
  REQUEST_CREATE_PHASE,
  CREATE_PHASE_SUCCESS,
  CREATE_PHASE_FAILURE,
  LOAD_ALL_PHASES,
  LOAD_ALL_PHASES_REQUEST,
  LOAD_ALL_PHASES_SUCCESS,
  LOAD_ALL_PHASES_FAILURE,
  UPDATE_PHASE_ISSUES_LIST,
  UPDATE_PHASE_ISSUES_LIST_REQUEST,
  UPDATE_PHASE_ISSUES_LIST_SUCCESS,
  UPDATE_PHASE_ISSUES_LIST_FAILURE,
  RESET_PHASE
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

const resetPhase = () => {
  return {
    type: RESET_PHASE
  }
};

const updatePhaseIssuesList = (phaseId, issueList) => {
  return {
    type: UPDATE_PHASE_ISSUES_LIST,
    phaseId,
    issueList
  }
};

const updatePhaseIssuesListRequest = () => {
  return {
    type: UPDATE_PHASE_ISSUES_LIST_REQUEST
  }
};

const updatePhaseIssuesListSuccess = () => {
  return {
    type: UPDATE_PHASE_ISSUES_LIST_SUCCESS,
  }
};

const updatePhaseIssuesListFailure = (error) => {
  return {
    type: UPDATE_PHASE_ISSUES_LIST_FAILURE,
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
  loadAllPhasesFailure,
  updatePhaseIssuesList,
  updatePhaseIssuesListRequest,
  updatePhaseIssuesListSuccess,
  updatePhaseIssuesListFailure,
  resetPhase
}
