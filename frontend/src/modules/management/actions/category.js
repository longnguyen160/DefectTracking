import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  REQUEST_CREATE_CATEGORY,
  LOAD_ALL_CATEGORIES,
  LOAD_ALL_CATEGORIES_REQUEST,
  LOAD_ALL_CATEGORIES_SUCCESS,
  LOAD_ALL_CATEGORIES_FAILURE,
  DELETE_CATEGORY,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE
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

export {
  createCategory,
  requestCreateCategory,
  createCategorySuccess,
  createCategoryFailure,
  loadAllCategories,
  loadAllCategoriesRequest,
  loadAllCategoriesSuccess,
  loadAllCategoriesFailure,
  deleteCategory,
  deleteCategoryRequest,
  deleteCategorySuccess,
  deleteCategoryFailure
}
