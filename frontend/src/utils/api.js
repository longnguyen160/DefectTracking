import axios from 'axios';
import { getAccessToken } from './ultis';

const BASE_URL = 'http://localhost:8080/';

axios.interceptors.request.use((_config) => {
  const config = Object.assign({}, _config);

  config.headers.Authorization = `Bearer ${getAccessToken() || ''}`;
  config.url = BASE_URL + config.url;

  return config;
});

const login = (user) => {
  return axios.post('user/signin', user);
};

const signUp = (user) => {
  return axios.post('user/signup', user);
};

const loadCurrentUser = () => {
  return axios.get('user/currentUser');
};

const createProject = (project) => {
  return axios.post('admin/createProject', project);
};

const loadAllProjects = () => {
  return axios.get('loadAllProjects');
};

const loadAllUsers = (input) => {
  return axios.get(`user/loadAllUsers?input=${input}`);
};

const createIssue = (issue) => {
  return axios.post('user/createIssue', issue);
};

const loadAllIssues = () => {
  return axios.get('user/loadAllIssues');
};

const updateProfile = ({ profile, email }) => {
  return axios.post('user/updateProfile', { profile, email });
};

const addUserToProject = (requestData) => {
  return axios.post('project/addUserToProject', requestData);
};

const createCategory = (category) => {
  return axios.post('admin/createCategory', category);
};

const loadAllCategories = () => {
  return axios.get('admin/loadAllCategories');
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
  loadAllCategories
};

export default API;
