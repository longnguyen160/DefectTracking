import axios from 'axios';
import { getAccessToken } from './ultis';

const BASE_URL = 'http://localhost:8080/';

axios.interceptors.request.use((_config) => {
  const config = Object.assign({}, _config);

  config.headers.Authorization = `Bearer ${getAccessToken() || ''}`;
  config.url = BASE_URL + config.url;

  return config;
});

// Account
const login = (user) => {
  return axios.post('user/signin', user);
};

const signUp = (user) => {
  return axios.post('user/signup', user);
};

const loadCurrentUser = () => {
  return axios.get('user/currentUser');
};

const updateProfile = ({ profile, email }) => {
  return axios.post('user/updateProfile', { profile, email });
};

const loadAllUsers = (input, projectId) => {
  return axios.get(`user/loadAllUsers?input=${input}&projectId=${projectId}`);
};

// Project
const createProject = (project) => {
  return axios.post('admin/createProject', project);
};

const loadAllProjects = () => {
  return axios.get('loadAllProjects');
};

const loadALlUsersInProject = (projectId) => {
  return axios.get(`user/loadAllUsersInProject?projectId=${projectId}`);
};

const addUserToProject = (requestData) => {
  return axios.post('project/addUserToProject', requestData);
};

const loadProjectDetails = (projectId) => {
  return axios.get(`user/loadProjectDetails?projectId=${projectId}`);
};

const updateBacklog = (projectId, backlog) => {
  return axios.post('project/updateBacklog', { projectId, backlog });
};
// Issue
const createIssue = (issue) => {
  return axios.post('user/createIssue', issue);
};

const loadAllIssues = () => {
  return axios.get('user/loadAllIssues');
};

const loadAllIssuesShortcut = (userId) => {
  return axios.get(`user/loadAllIssuesShortcut?userId=${userId}`);
};

const loadIssueShortcut = (issueId) => {
  return axios.get(`user/loadIssueShortcut?issueId=${issueId}`);
};

const loadIssueDetails = (issueId) => {
  return axios.get(`user/loadIssueDetails?issueId=${issueId}`);
};

const updateIssue = (data) => {
  return axios.post('user/updateIssue', data);
};
// Category
const createCategory = (category) => {
  return axios.post('admin/createCategory', category);
};

const loadAllCategories = () => {
  return axios.get('admin/loadAllCategories');
};

// File
const uploadFile = (file) => {
  return axios.post('files/uploadFile', file);
};

const loadFile = (fileId) => {
  return axios.get(`files/load?fileId=${fileId}`);
};

const deleteFile = (fileId) => {
  return axios.delete(`files/delete/${fileId}`);
};

//Phase
const createPhase = (phase) => {
  return axios.post('user/createPhase', phase);
};

const loadAllPhases = (projectId) => {
  return axios.get(`user/loadAllPhases?projectId=${projectId}`);
};

const loadActivePhase = (projectId) => {
  return axios.get(`user/loadActivePhase?projectId=${projectId}`);
};

const updatePhaseIssuesList = (phaseId, issueList) => {
  return axios.post('user/updatePhaseIssueList', { phaseId, issueList });
};

const API = {
  login,
  signUp,
  loadCurrentUser,
  createProject,
  loadAllProjects,
  loadAllUsers,
  createIssue,
  loadAllIssues,
  updateProfile,
  addUserToProject,
  createCategory,
  loadAllCategories,
  loadALlUsersInProject,
  loadProjectDetails,
  uploadFile,
  loadFile,
  deleteFile,
  loadAllIssuesShortcut,
  loadIssueDetails,
  updateIssue,
  createPhase,
  loadAllPhases,
  loadIssueShortcut,
  updateBacklog,
  updatePhaseIssuesList,
  loadActivePhase
};

export default API;
