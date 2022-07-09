import * as ActionTypes from '../actionTypes';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestLogin = () => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
  }
}

export const receiveLogin = () => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
  }
}

export const loginError = (message) => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    message
  }
}

export const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
  }
}

export const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
  }
}

export const logoutError = (message) => {
  return {
    type: ActionTypes.LOGOUT_FAILURE,
    message
  }
}


/**************************************
 * Manual Register
 *************************************/
 export const registerUser = (formBody) => (dispatch) => {
    fetch(`${process.env.BASE_URL}auth/register`, {
      method: 'POST',
      body: formBody,
      headers: {
        //Header Defination
        'Content-Type':
        'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then(async (responseJson) => {
      console.log(responseJson);
      // If server response message same as Data Matched
      if (responseJson.status === 'success') {
        await AsyncStorage.setItem('user_token', responseJson.token)
        dispatch(receiveLogin());
      } 
      else {
        var errmess = new Error(responseJson.status);
        throw errmess;
      }
    })
    .catch((error) => {
      dispatch(loginError(error));
      return { error: true };
    });
  }
  