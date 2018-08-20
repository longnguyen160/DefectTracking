import axios from 'axios';
import { getAccessToken } from './ultis';

const BASE_URL = `${window.location.origin}/`;

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

const manageUser = (user) => {
  return axios.post('user/manageUser', user);
};
// Project
const createProject = (projectCategory) => {
  return axios.post('admin/createProject', projectCategory);
};

const loadAllProjects = () => {
  return axios.get('loadAllProjects');
};

const loadAllProjectsForManagement = () => {
  return axios.get('admin/loadAllProjectsForManagement');
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

const removeUserFromProject = (projectId, userId) => {
  return axios.delete(`manager/removeUserFromProject/${projectId}/${userId}`);
};

const updateProject = (projectRequest) => {
  return axios.post('admin/updateProject', projectRequest);
};
// Issue
const createIssue = (issue) => {
  return axios.post('user/createIssue', issue);
};

const loadAllIssues = (request) => {
  return axios.get(`admin/loadAllIssues?request=${encodeURI(JSON.stringify(request))}`);
};

const loadAllIssuesShortcut = (userId) => {
  return axios.get(`user/loadAllIssuesShortcut?userId=${userId}`);
};

const loadAllIssuesBasedOnFilter = (issueListRequest, filter) => {
  return axios.get(`user/loadAllIssuesBasedOnFilter?issueListRequest=${encodeURI(JSON.stringify(issueListRequest))}&filter=${encodeURI(JSON.stringify(filter))}`);
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

const updateIssueCategories = (data) => {
  return axios.post('user/updateIssueCategories', data);
};

const loadAllIssuesFromBacklog = (issueList) => {
  return axios.get(`user/loadAllIssuesFromBacklog?issueIds=${issueList}`);
};

const updateFilter = (filter) => {
  return axios.post('user/updateFilter', filter);
};

const getFilter = (userId) => {
  return axios.get(`user/getFilter?userId=${userId}`);
};
// Category
const createCategory = (category) => {
  return axios.post('admin/createCategory', category);
};

const updateCategory = (category) => {
  return axios.post('admin/updateCategory', category);
};

const loadAllCategories = () => {
  return axios.get('admin/loadAllCategories');
};

const loadAllCategoryNames = () => {
  return axios.get('admin/loadAllCategoryNames');
};

const loadAllCategoriesInProject = (projectId) => {
  return axios.get(`user/loadAllCategoriesInProject?projectId=${projectId}`);
};

const loadCategoryDetails = (categoryId) => {
  return axios.get(`admin/loadCategoryDetails?categoryId=${categoryId}`);
};

const deleteCategory = (categoryId) => {
  return axios.delete(`admin/deleteCategory/${categoryId}`);
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

// Message
const createMessage = (message) => {
  return axios.post('user/createMessage', message);
};

const loadAllMessagesOnIssue = (issueId, messageType) => {
  return axios.get(`user/loadAllMessagesOnIssue?issueId=${issueId}&type=${messageType}`);
};

const loadAllMessages = () => {
  return axios.get('user/loadAllMessages');
};

const editMessage = (message) => {
  return axios.post('user/editMessage', message);
};

// Status
const createStatus = (status) => {
  return axios.post('admin/createStatus', status);
};

const loadAllStatus = (role) => {
  return axios.get(`admin/loadAllStatus?role=${role}`);
};

const loadStatusDetails = (statusId) => {
  return axios.get(`admin/loadStatusDetails?statusId=${statusId}`);
};

const removeStatus = (statusId) => {
  return axios.delete(`admin/removeStatus/${statusId}`);
};

const updateStatus = (status) => {
  return axios.post('admin/updateStatus', status);
};

const updateStatusDefault = (status) => {
  return axios.post('admin/changeDefaultStatus', status);
};

// Summary
const getIssueSummary = (summaryRequest) => {
  return axios.get(`user/getIssueSummary?summaryRequest=${encodeURI(JSON.stringify(summaryRequest))}`);
};

// KPI
const getUsersKPI = (dataRequest) => {
  return axios.get(`user/getUsersKPI?dataRequest=${encodeURI(JSON.stringify(dataRequest))}`);
};

const getKPIData = () => {
  return axios.get('admin/getKPIData');
};

const updateKPI = (kpi) => {
  return axios.post('admin/updateKPI', kpi);
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
  loadAllCategoryNames,
  loadALlUsersInProject,
  loadProjectDetails,
  uploadFile,
  loadFile,
  deleteFile,
  loadAllIssuesShortcut,
  loadIssueDetails,
  updateIssue,
  updateIssueCategories,
  removeUserFromProject,
  loadIssueShortcut,
  updateBacklog,
  loadAllIssuesFromBacklog,
  createMessage,
  loadAllMessagesOnIssue,
  loadAllMessages,
  editMessage,
  createStatus,
  loadAllStatus,
  removeStatus,
  updateStatus,
  updateStatusDefault,
  updateFilter,
  getFilter,
  loadAllProjectsForManagement,
  loadAllCategoriesInProject,
  updateProject,
  loadAllIssuesBasedOnFilter,
  manageUser,
  loadStatusDetails,
  deleteCategory,
  loadCategoryDetails,
  updateCategory,
  getIssueSummary,
  getUsersKPI,
  getKPIData,
  updateKPI
};

export default API;
