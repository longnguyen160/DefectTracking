import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  REQUEST_CREATE_CATEGORY,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  LOAD_ALL_CATEGORIES,
  LOAD_ALL_CATEGORIES_REQUEST,
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAILURE,
  LOAD_ALL_CATEGORY_NAMES,
  LOAD_ALL_CATEGORY_NAMES_REQUEST,
  LOAD_ALL_CATEGORY_NAMES_SUCCESS,
  LOAD_ALL_CATEGORY_NAMES_FAILURE,
  LOAD_CATEGORY_DETAILS,
  LOAD_CATEGORY_DETAILS_REQUEST,
  LOAD_CATEGORY_DETAILS_SUCCESS,
  LOAD_CATEGORY_DETAILS_FAILURE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  RESET_CATEGORY,
  RESET_CATEGORIES,
} from './types';

const createCategory = (category, closeModal) => {
  return {
    type: CREATE_CATEGORY,
    category,
    closeModal
  }
};

const requestCreateCategory = () => {
  return {
    type: REQUEST_CREATE_CATEGORY
  }
};

const createCategorySuccess = () => {
  return {
    type: CREATE_CATEGORY_SUCCESS
  }
};

const createCategoryFailure = (error) => {
  return {
    type: CREATE_CATEGORY_FAILURE,
    error
  }
};

const updateCategory = (category, closeModal) => {
  return {
    type: UPDATE_CATEGORY,
    category,
    closeModal
  }
};

const updateCategoryRequest = () => {
  return {
    type: UPDATE_CATEGORY_REQUEST
  }
};

const updateCategorySuccess = () => {
  return {
    type: UPDATE_CATEGORY_SUCCESS
  }
};

const updateCategoryFailure = (error) => {
  return {
    type: UPDATE_CATEGORY_FAILURE,
    error
  }
};

const loadAllCategories = () => {
  return {
    type: LOAD_ALL_CATEGORIES
  }
};

const loadAllCategoriesRequest = () => {
  return {
    type: LOAD_ALL_CATEGORIES_REQUEST
  }
};

const loadAllCategoriesSuccess = (categories) => {
  return {
    type: LOAD_ALL_CATEGORIES_SUCCESS,
    categories
  }
};

const loadAllCategoriesFailure = (error) => {
  return {
    type: LOAD_ALL_CATEGORIES_FAILURE,
    error
  }
};

const loadAllCategoryNames = () => {
  return {
    type: LOAD_ALL_CATEGORY_NAMES
  }
};

const loadAllCategoryNamesRequest = () => {
  return {
    type: LOAD_ALL_CATEGORY_NAMES_REQUEST
  }
};

const loadAllCategoryNamesSuccess = (categories) => {
  return {
    type: LOAD_ALL_CATEGORY_NAMES_SUCCESS,
    categories
  }
};

const loadAllCategoryNamesFailure = (error) => {
  return {
    type: LOAD_ALL_CATEGORY_NAMES_FAILURE,
    error
  }
};


const loadCategoryDetails = (categoryId) => {
  return {
    type: LOAD_CATEGORY_DETAILS,
    categoryId
  }
};

const loadCategoryDetailsRequest = () => {
  return {
    type: LOAD_CATEGORY_DETAILS_REQUEST
  }
};

const loadCategoryDetailsSuccess = (category) => {
  return {
    type: LOAD_CATEGORY_DETAILS_SUCCESS,
    category
  }
};

const loadCategoryDetailsFailure = (error) => {
  return {
    type: LOAD_CATEGORY_DETAILS_FAILURE,
    error
  }
};

const deleteCategory = (categoryId) => {
  return {
    type: DELETE_CATEGORY,
    categoryId
  }
};

const deleteCategoryRequest = () => {
  return {
    type: DELETE_CATEGORY_REQUEST
  }
};

const deleteCategorySuccess = () => {
  return {
    type: DELETE_CATEGORY_SUCCESS
  }
};

const deleteCategoryFailure = (error) => {
  return {
    type: DELETE_CATEGORY_FAILURE,
    error
  }
};

const resetCategory = () => {
  return {
    type: RESET_CATEGORY
  }
};

const resetCategories = () => {
  return {
    type: RESET_CATEGORIES
  }
};

export {
  createCategory,
  requestCreateCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategory,
  updateCategoryRequest,
  updateCategorySuccess,
  updateCategoryFailure,
  loadAllCategories,
  loadAllCategoriesRequest,
  loadAllCategoriesSuccess,
  loadAllCategoriesFailure,
  loadAllCategoryNames,
  loadAllCategoryNamesRequest,
  loadAllCategoryNamesSuccess,
  loadAllCategoryNamesFailure,
  loadCategoryDetails,
  loadCategoryDetailsRequest,
  loadCategoryDetailsSuccess,
  loadCategoryDetailsFailure,
  deleteCategory,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure,
  resetCategory,
  resetCategories
}
