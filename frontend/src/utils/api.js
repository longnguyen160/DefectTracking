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

const loadAllProjects = (userId) => {
  return axios.post('loadAllProjects', userId);
};

const API = {
  login,
  signUp,
  loadCurrentUser,
  createProject,
  loadAllProjects
};

export default API;
