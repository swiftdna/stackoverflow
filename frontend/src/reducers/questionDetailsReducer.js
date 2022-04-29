import {
  ADD_QUESTION_DETAILS,
  LOADING_QUESTION_DETAILS,
  CLEAR_QUESTION_DETAILS,
  ADD_ANSWER_DETAILS,
  LOADING_ANSWER_DETAILS,
  CLEAR_ANSWER_DETAILS
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  loading_answer: false,
  data: {},
  answers: [],
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
    case ADD_ANSWER_DETAILS: {
      return {
        ...state,
        loading: false,
        answers: action.payload
      }
    }
    case LOADING_ANSWER_DETAILS: {
      return {
        ...state,
        loading_answer: true
      }
    }
    case CLEAR_QUESTION_DETAILS:
      return {
        ...state,
        answers: []
      }
    default:
      return state
  }
}