import axios from 'axios';
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
} from './actionTypes';

import Token from '../helpers/Token'
const API_URL = 'http://localhost:3030/api';

const getData = (response) => {
  const {payload, error} = response;
  return {payload, error};
}


const checkAuth = () => (dispatch) => {
  const userToken =  Token.decodeToken();
  if (userToken.status === 'error') {
    return dispatch({
      type: UNAUTH_USER
    })
  } else {
    const { 
      id,
      email
    } = userToken
    return dispatch({
      type: AUTH_USER,
      id,
      email
    });
  }
}

const login = userDetails => async(dispatch) => {
    const {
    email,
    password
  } = userDetails
  dispatch({ type: LOGIN_PENDING });
  try {
    const response = await axios.post(`${API_URL}/users/login`, {
      email,
      password
    });
    const {payload: {newUser, token}} = getData(response.data);
    Token.setToken(token)
    dispatch({ type: LOGIN_SUCCESS, user: newUser })
  } catch (err) {
    const { data: { error } } = err.response;
    dispatch({ type: LOGIN_ERROR, error });
  }
}



const register = userDetails => async (dispatch) => {
  const {
    displayName,
    email,
    password
  } = userDetails
  dispatch({ type: REGISTER_PENDING });
  try {
    const response = await axios.post(`${API_URL}/users`, {
      displayName,
      email,
      password
    });
    const {payload: {newUser, token}} = getData(response.data);
    Token.setToken(token)
    dispatch({ type: REGISTER_SUCCESS,  user: newUser });
  } catch (err) {
    const { data: { error } } = err.response;
    dispatch({ type: REGISTER_ERROR, error });
  }
}

const resetUserState = () => (dispatch) => {
  dispatch({ type: RESET_USER_STATE });
}

export {
  register,
  login,
  checkAuth,
  resetUserState
}