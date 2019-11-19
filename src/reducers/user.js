import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  REGISTER_PENDING,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  AUTH_USER,
  UNAUTH_USER,
  RESET_USER_STATE,
} from '../actions/actionTypes';

const defaultState = {
  isLoggedIn: false,
  isLoading: true,
  hasError: false,
  errorMessage: '',
  success: false,
  user: null
};

const Users = (state = defaultState, action) => {
  switch(action.type) {
    case AUTH_USER:
      return {
        ...defaultState,
        isLoggedIn: true,
        isLoading: false
      };
    case UNAUTH_USER:
        return {
          ...defaultState,
          isLoggedIn: false,
          isLoading: false
        }
    case LOGIN_PENDING:
      return {
        ...defaultState,
        isLoggedIn: false,
        isLoading: true,
        hasError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...defaultState,
        isLoggedIn: true,
        isLoading: false,
        success: true,
      };
    case LOGIN_ERROR:
      return {
        ...defaultState,
        isLoggedIn: false,
        isLoading: false,
        hasError: true,
        errorMessage: action.message,
      };
    case REGISTER_PENDING:
      return {
        ...defaultState,
        isLoading: true,
        hasError: false,
      };
      case REGISTER_SUCCESS:
      return {
        ...defaultState,
        isLoggedIn: true,
        isLoading: false,
        success: true,
        user: action.user
      };
    case REGISTER_ERROR:
      return {
        ...defaultState,
        isLoading: false,
        hasError: true,
        errorMessage: action.error,
      };
    case RESET_USER_STATE:
      return defaultState;
    default:
      return state;
  }
}

export default Users;