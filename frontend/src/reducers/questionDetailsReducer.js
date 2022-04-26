import {
  ADD_QUESTION_DETAILS,
  LOADING_QUESTION_DETAILS,
  CLEAR_QUESTION_DETAILS
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: {},
  error: false,
  errorMessage: ''
};

export default function questionDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION_DETAILS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case LOADING_QUESTION_DETAILS: {
      return {
        ...state,
        loading: true
      }
    }
    case CLEAR_QUESTION_DETAILS:
      return {
        ...state,
        data: {}
      }
    default:
      return state
  }
}