import {
  ADD_MESSAGES,
  LOADING_MESSAGES,
  CLEAR_MESSAGES,
  ADD_RECIPIENTS,
  LOADING_RECIPIENTS,
  CLEAR_RECIPIENTS,
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  loadingRecipients: false,
  data: {},
  recipients: [],
  error: false,
  recipientsError: false,
  errorMessage: '',
  recipientsErrorMessage: ''
};

export default function messagesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGES: {
      const {id, data} = action.payload;
      return {
        ...state,
        loading: false,
        data: {
          [id]: data
        }
      }
    }
    case LOADING_MESSAGES: {
      return {
        ...state,
        loading: true
      }
    }
    case CLEAR_MESSAGES:
      return {
        ...state,
        data: {}
      }
    case ADD_RECIPIENTS: {
      return {
        ...state,
        loading: false,
        recipients: action.payload
      }
    }
    case LOADING_RECIPIENTS: {
      return {
        ...state,
        loadingRecipients: true
      }
    }
    case CLEAR_RECIPIENTS:
      return {
        ...state,
        recipients: []
      }
    default:
      return state
  }
}