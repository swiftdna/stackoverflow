import {
  ADD_QUESTIONS,
  LOADING_QUESTIONS,
  CLEAR_QUESTIONS
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: false,
  errorMessage: ''
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTIONS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case LOADING_QUESTIONS: {
      return {
        ...state,
        loading: true
      }
    }
    case CLEAR_QUESTIONS:
      return {
        ...state,
        data: []
      }
    default:
      return state
  }
}