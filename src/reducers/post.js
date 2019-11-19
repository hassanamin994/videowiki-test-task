import {
  CREATE_PENDING,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  GET_PENDING,
  GET_SUCCESS,
  GET_FAILURE
} from '../actions/actionTypes';

const defaultState = {
  isLoading: true,
  hasError: false,
  errorMessage: '',
  success: false,
  newUserPost: false,
  posts: [],
  post: null,
  pagingData: {}
};

const Posts = (state = defaultState, action) => {
  switch(action.type) {
    case CREATE_PENDING:
      return {
        ...defaultState,
        isLoading: true,
        hasError: false,
      };
    case CREATE_SUCCESS:
      return {
        ...defaultState,
        isLoading: false,
        success: true,
        newUserPost: true,
        post: action.post
      };
    case CREATE_FAILURE:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
        errorMessage: action.message,
      };
    case GET_PENDING:
      return {
        ...defaultState,
        isLoading: true,
        hasError: false,
      };
    case GET_SUCCESS:
      return {
        ...defaultState,
        isLoading: false,
        success: true,
        posts: action.posts
      };
    case GET_FAILURE:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
        errorMessage: action.message,
      };
    default:
      return state;
  }
}

export default Posts;