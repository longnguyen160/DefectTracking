import {
  REQUEST_CREATE_CATEGORY,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  LOAD_ALL_CATEGORIES_REQUEST,
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAILURE,
  REQUEST_BAN_USER,
  BAN_USER_SUCCESS,
  BAN_USER_FAILURE,
  
  REQUEST_CREATE_STATUS,
  CREATE_STATUS_FAILURE,
  CREATE_STATUS_SUCCESS,
  
  LOAD_ALL_STATUS_REQUEST,
  LOAD_ALL_STATUS_SUCCESS,
  LOAD_ALL_STATUS_FAILURE,

  REQUEST_REMOVE_STATUS,
  REMOVE_STATUS_SUCCESS,
  REMOVE_STATUS_FAILURE, 

  REQUEST_UPDATE_STATUS,
  UPDATE_STATUS_SUCCESS,
  UPDATE_STATUS_FAILURE


} from '../actions/types';

const initialState = {
  categories: [],
  isLoading: false,
  error: null
};

export default function management(state = initialState, action) {
  switch (action.type) {
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
        isLoading: true,
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
        isLoading: true,
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
      return Object.assign({},state, {
        isLoading:true
      });  

    case CREATE_STATUS_FAILURE:
      return Object.assign({},state, {
        isLoading:false,
        error: action.error
      });  

    case CREATE_STATUS_SUCCESS:
      return Object.assign({},state, {
        isLoading:false
      });  
    
    case LOAD_ALL_STATUS_REQUEST:
      return object.assign({},state, {
        isLoading: true
      });

    case LOAD_ALL_STATUS_SUCCESS:
      return object.assign({},state, {
        isLoading: false
      });

    case LOAD_ALL_STATUS_FAILURE:
      return object.assign({},state, {
        isLoading: false,
        error: action.error
      });

    case REQUEST_REMOVE_STATUS:
      return object.assign({},state, {
        isLoading: true
      });

    case REMOVE_STATUS_SUCCESS:
      return object.assign({},state, {
        isLoading: false
      });

    case REMOVE_STATUS_FAILURE:
      return object.assign({},state, {
        isLoading: false,
        error: action.error
      });  

    case REQUEST_UPDATE_STATUS:
      return object.assign({},state, {
        isLoading: true
      });

    case UPDATE_STATUS_SUCCESS:
      return object.assign({},state, {
        isLoading: false
      });

    case UPDATE_STATUS_FAILURE:
      return object.assign({},state, {
        isLoading: false,
        error: action.error
      });  



    default:
      return state;
  }
}
