import axios from 'axios';
import {
  CREATE_PENDING,
  CREATE_SUCCESS,
  CREATE_FAILURE,
  GET_PENDING,
  GET_SUCCESS,
  GET_FAILURE
} from './actionTypes';

import Token from '../helpers/Token'
const API_URL = 'http://localhost:3030/api';

const getData = (response) => {
  const {payload, error} = response;
  return {payload, error};
}


const createPost = post => async(dispatch) => {
  const userToken = Token.getToken()
  dispatch({ type: CREATE_PENDING });
  try {
    const response = await axios({
      url:`${API_URL}/posts`,
      method: 'POST',
      headers: {
        authorization: userToken
      },
      data: post
    }
    );
    const {payload} = getData(response.data);
    dispatch({ type: CREATE_SUCCESS, post: payload })
  } catch (err) {
    // const { data: { error } } = err.response;
    dispatch({ type: CREATE_FAILURE, error: null });
  }
}


const getPosts = (newPage) => async(dispatch) => {
  const page = (newPage) ? newPage : 1
  const userToken = Token.getToken();
  dispatch({ type: GET_PENDING });
  try {
    const response = await axios({
      url:`${API_URL}/get-posts`,
      method: 'POST',
      headers: {
        authorization: userToken
      },
      data: { page }
    } 
    );
    const {payload} = getData(response.data);
    dispatch({ type: GET_SUCCESS, posts: payload })
  } catch (err) {
    const { data: { error } } = err.response;
    dispatch({ type: GET_FAILURE, error });
  }
}


export {
  createPost,
  getPosts
}