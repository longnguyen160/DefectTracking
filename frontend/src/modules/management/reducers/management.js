import {
  LOAD_ALL_PROJECTS_FOR_MANAGEMENT_REQUEST,
  LOAD_ALL_PROJECTS_FOR_MANAGEMENT_SUCCESS,
  LOAD_ALL_PROJECTS_FOR_MANAGEMENT_FAILURE,
  REQUEST_UPDATE_STATUS_DEFAULT,
  UPDATE_STATUS_DEFAULT_FAILURE,
  UPDATE_STATUS_DEFAULT_SUCCESS,
  REQUEST_CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  LOAD_ALL_CATEGORIES_REQUEST,
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAILURE,
  LOAD_CATEGORY_DETAILS_REQUEST,
  LOAD_CATEGORY_DETAILS_SUCCESS,
  LOAD_CATEGORY_DETAILS_FAILURE,
  REQUEST_BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_FAILURE,
  REQUEST_CREATE_STATUS,
  CREATE_STATUS_FAILURE,
  CREATE_STATUS_SUCCESS,
  LOAD_ALL_STATUS_REQUEST,
  LOAD_ALL_STATUS_SUCCESS,
  LOAD_ALL_STATUS_FAILURE,
  LOAD_STATUS_DETAILS_REQUEST,
  LOAD_STATUS_DETAILS_SUCCESS,
  LOAD_STATUS_DETAILS_FAILURE,
  REQUEST_REMOVE_STATUS,
  REMOVE_STATUS_SUCCESS,
  REMOVE_STATUS_FAILURE,
  REQUEST_UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE,
  LOAD_ALL_KPI_REQUEST,
  LOAD_ALL_KPI_SUCCESS,
  LOAD_ALL_KPI_FAILURE,
  UPDATE_KPI_REQUEST,
  UPDATE_KPI_SUCCESS,
  UPDATE_KPI_FAILURE,
  LOAD_USERS_KPI_REQUEST,
  LOAD_USERS_KPI_SUCCESS,
  LOAD_USERS_KPI_FAILURE,
  RESET_STATUS,
  RESET_CATEGORY
} from '../actions/types';

const initialState = {
  projectList: [],
  statusList: [],
  categories: [],
  kpiData: [],
  usersKPI: [],
  status: null,
  category: null,
  isLoading: false,
  error: null
};

export default function management(state = initialState, action) {
  switch (action.type) {
    // load all projects for management
    case LOAD_ALL_PROJECTS_FOR_MANAGEMENT_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_PROJECTS_FOR_MANAGEMENT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        projectList: action.projectList,
        error: null
      });

    case LOAD_ALL_PROJECTS_FOR_MANAGEMENT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    //create category
    case REQUEST_CREATE_CATEGORY:
      return Object.assign({}, state, {
        isLoading: true
      });

    case CREATE_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case CREATE_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case UPDATE_CATEGORY_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case UPDATE_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case UPDATE_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        categories: action.categories,
        error: null
      });

    case LOAD_ALL_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_CATEGORY_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_CATEGORY_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        category: action.category,
        error: null
      });

    case LOAD_CATEGORY_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case REQUEST_BAN_USER:
      return Object.assign({}, state, {
        isLoading: true
      });

    case BAN_USER_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case BAN_USER_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

//new
    case REQUEST_CREATE_STATUS:
      return Object.assign({}, state, {
        isLoading:true
      });

    case CREATE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case CREATE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case LOAD_ALL_STATUS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        statusList: action.statusList,
        error: null
      });

    case LOAD_ALL_STATUS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_STATUS_DETAILS_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_STATUS_DETAILS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        status: action.status,
        error: null
      });

    case LOAD_STATUS_DETAILS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case REQUEST_REMOVE_STATUS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case REMOVE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case REMOVE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case REQUEST_UPDATE_STATUS:
      return Object.assign({}, state, {
        isLoading: true
      });

    case UPDATE_STATUS_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case UPDATE_STATUS_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });
    //update status default
    case REQUEST_UPDATE_STATUS_DEFAULT:
      return Object.assign({}, state, {
        isLoading: true
      });

    case UPDATE_STATUS_DEFAULT_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false
      });

    case UPDATE_STATUS_DEFAULT_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_ALL_KPI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_ALL_KPI_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        kpiData: action.data,
        error: null
      });

    case LOAD_ALL_KPI_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case UPDATE_KPI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case UPDATE_KPI_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        error: null
      });

    case UPDATE_KPI_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case LOAD_USERS_KPI_REQUEST:
      return Object.assign({}, state, {
        isLoading: true
      });

    case LOAD_USERS_KPI_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        usersKPI: action.data,
        error: null
      });

    case LOAD_USERS_KPI_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error
      });

    case RESET_STATUS:
      return Object.assign({}, state, {
        status: null
      });

    case RESET_CATEGORY:
      return Object.assign({}, state, {
        category: null
      });

    default:
      return state;
  }
}
