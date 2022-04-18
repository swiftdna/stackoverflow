import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  SET_ALERT,
  CLEAR_ALERT,
  SET_TOAST,
  CLEAR_TOAST
} from '../constants/actionTypes';

function loginSuccess(data) {
   return {
      type: LOGIN_SUCCESS,
      payload: data
   }
}

function loginFailure(data) {
   return {
      type: LOGIN_FAILURE,
      payload: data
   }
}

function logoutSuccess() {
   return {
      type: LOGOUT_SUCCESS
   }
}

function logoutFailure(data) {
   return {
      type: LOGOUT_FAILURE,
      payload: data
   }
}

export function handleLoginResponse(response) {
   const {data} = response;
   if (data.success) {
      return loginSuccess(data);
   } else {
      return loginFailure({
         message: data.message
      });
   }
}

export function handleLogoutResponse(response) {
   const {data} = response;
   if (data.success) {
      return logoutSuccess();
   } else {
      return logoutFailure({
         message: data.message
      });
   }
}

export function setAlert(data) {
   return {
      type: SET_ALERT,
      payload: data
   }
}

export function clearAlert(data) {
   return {
      type: CLEAR_ALERT
   }
}

export function setToast(data) {
   return {
      type: SET_TOAST,
      payload: data
   }
}

export function clearToast() {
   return {
      type: CLEAR_TOAST
   }
}
