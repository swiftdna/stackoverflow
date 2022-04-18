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

const initialState = {
  alert: false,
  toast: false,
  alertMessage: '',
  alertType: 'error',
  isLoggedIn: false,
  user: {},
  currency: 'USD',
  countries: []
};

const resetAlert = {
  alert: false,
  toast: false,
  alertMessage: '',
  alertType: 'error'
};

const resetToast = {
  alert: false,
  toast: false,
  alertMessage: '',
  alertType: 'error'
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS: {
      return {
        ...state,
        ...resetAlert,
        isLoggedIn: true,
        user: action.payload.user
      }
    }
    case LOGIN_FAILURE: {
      const { message } = action.payload;
      return {
        ...state,
        alert: true,
        alertMessage: message,
        isLoggedIn: false
      }
    }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        ...resetAlert,
        isLoggedIn: false
      }
    case LOGOUT_FAILURE: {
      const { message } = action.payload;
      return {
        ...state,
        alert: true,
        alertMessage: message,
        isLoggedIn: false
      }
    }
    case SET_ALERT: {
      const { type, message } = action.payload;
      return {
        ...state,
        alert: true,
        alertMessage: message,
        alertType: type
      };
    }
    case CLEAR_ALERT: {
      return {
        ...state,
        ...resetAlert
      };
    }
    case SET_TOAST: {
      const { type, message } = action.payload;
      return {
        ...state,
        alert: false,
        toast: true,
        alertMessage: message,
        alertType: type
      };
    }
    case CLEAR_TOAST: {
      return {
        ...state,
        ...resetToast
      };
    }
    default:
      return state
  }
}