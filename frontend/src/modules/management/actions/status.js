import {
    CREATE_STATUS,
    REQUEST_CREATE_STATUS,
    CREATE_STATUS_FAILURE,
    CREATE_STATUS_SUCCESS,
    LOAD_ALL_STATUS,
    LOAD_ALL_STATUS_REQUEST,
    LOAD_ALL_STATUS_SUCCESS,
    LOAD_ALL_STATUS_FAILURE,
    REMOVE_STATUS,
    REQUEST_REMOVE_STATUS,
    REMOVE_STATUS_FAILURE,
    REMOVE_STATUS_SUCCESS,
    UPDATE_STATUS,
    REQUEST_UPDATE_STATUS,
    UPDATE_STATUS_FAILURE,
    UPDATE_STATUS_SUCCESS
} from './types';

const createStatus = (status) => {
    return {
        type:CREATE_STATUS,
        status
    }
};

const requestCreateStatus = () => {
    return {
        type:REQUEST_CREATE_STATUS
    }
};

const createStatusSuccess = () => {
    return {
        type:CREATE_STATUS_SUCCESS
    }
};

const createStatusFailure = (error) => {
    return {
        type:CREATE_STATUS_FAILURE,
        error
    }
};

const loadAllStatus = () => {
    return {
        types: LOAD_ALL_STATUS
    }
};

const loadAllStatusRequest = () => {
    return {
        types: LOAD_ALL_STATUS_REQUEST
    }
};

const loadAllStatusSuccess = (statusList) => {
    return {
        types: LOAD_ALL_STATUS_SUCCESS,
        statusList
    }
};

const loadAllStatusFailure = (error) => {
    return {
        types: LOAD_ALL_STATUS_FAILURE,
        error
    }
};

const removeStatus = (status) => {
    return {
        types: REMOVE_STATUS,
        status 
    }
};

const requestRemoveStatus = () => {
    return {
        types: REQUEST_REMOVE_STATUS
    }
};

const removeStatusSuccess = () => {
    return {
        types: REMOVE_STATUS_SUCCESS
    }
};

const removeStatusFailure = (error) => {
    return {
        types: REMOVE_STATUS_FAILURE,
        error
    }
};

const updateStatus = (status) => {
    return {
        types: UPDATE_STATUS,
        status
    }
};

const requestUpdateStatus = () => {
    return {
    types: REQUEST_UPDATE_STATUS,
    }
};

const updateStatusSuccess = () => {
    return {
        types: UPDATE_STATUS_SUCCESS
    }
};

const updateStatusFailure = (error) => {
    return {
        types: UPDATE_STATUS_FAILURE,
        error
    }
};



export{
    createStatus,
    requestCreateStatus,
    createStatusSuccess,
    createStatusFailure,
    loadAllStatus,
    loadAllStatusRequest,
    loadAllStatusSuccess,
    loadAllStatusFailure,
    removeStatus,
    requestRemoveStatus,
    removeStatusSuccess,
    removeStatusFailure,
    updateStatus,
    requestUpdateStatus,
    updateStatusSuccess,
    updateStatusFailure
}



