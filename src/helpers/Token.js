import jwtDecode from 'jwt-decode';
import { LOGOUT_DONE } from '../actions/actionTypes';

const AUTH_TOKEN = 'auth_token'

class Token {
  static getToken() {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token;
  }

  static setToken(token) {
    return localStorage.setItem(AUTH_TOKEN, token);
  }

  static removeToken() {
    return localStorage.removeItem(AUTH_TOKEN);
  }
  
  static decodeToken() {
    try {
      const authenticated = this.getToken();
      if (authenticated !== null) {
        const {
          id, email, exp,
        } = jwtDecode(authenticated);
        const expiryDate = new Date(0).setUTCSeconds(exp);
        if (new Date() > expiryDate) {
          this.removeUserToken();
          throw new Error('Expired token');
        }
        return {
          status: "success",
          data: { id, email }
        };
      }
      throw new Error('Unauthenticated');
    } catch (error) {
      return {
        status: 'error',
        message: error.message
      }
    }
  }

  static isLoggedIn () {
    const authenticated = this.getUserToken();
    return authenticated !== null;
  }

  static unauthorizedUser(dispatch, { status }) {
    if (status === 403) {
      this.removeUserToken();
      dispatch({
        type: LOGOUT_DONE,
      });
    }
  };
}

export default Token;