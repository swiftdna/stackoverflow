import {
  ADD_QUESTIONS_SEARCH,
  LOADING_QUESTIONS_SEARCH,
  CLEAR_QUESTIONS_SEARCH
} from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: [],
  error: false,
  errorMessage: ''
};

export default function questionsSearchReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTIONS_SEARCH: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }
    case LOADING_QUESTIONS_SEARCH: {
      return {
        ...state,
        loading: true
      }
    }
    case CLEAR_QUESTIONS_SEARCH:
      return {
        ...state,
        data: []
      }
    default:
      return state
  }
}