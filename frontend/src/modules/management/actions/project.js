import {
    LOAD_ALL_PROJECTS_FOR_MANAGEMENT,
    LOAD_ALL_PROJECTS_FOR_MANAGEMENT_REQUEST,
    LOAD_ALL_PROJECTS_FOR_MANAGEMENT_SUCCESS,
    LOAD_ALL_PROJECTS_FOR_MANAGEMENT_FAILURE
}from './types';

//load all project for managament
const loadAllProjectsForManagement = () => {
    return {
        types: LOAD_ALL_PROJECTS_FOR_MANAGEMENT
    }
};

const loadAllProjectsForManagementRequest = () => {
    return {
        types: LOAD_ALL_PROJECTS_FOR_MANAGEMENT_REQUEST
    }
};

const loadAllProjectsForManagementSuccess = (projectList) => {
    return {
        LOAD_ALL_PROJECTS_FOR_MANAGEMENT_SUCCESS,
        projectList
    }
};

const loadAllProjectsForManagementFailure = (error) => {
    return {
        LOAD_ALL_PROJECTS_FOR_MANAGEMENT_FAILURE,
        error
    }
};


export {
    loadAllProjectsForManagement,
    loadAllProjectsForManagementRequest,
    loadAllProjectsForManagementSuccess,
    loadAllProjectsForManagementFailure
}





