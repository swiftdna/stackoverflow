import {
   ADD_QUESTION_DETAILS,
   LOADING_QUESTION_DETAILS,
   // CLEAR_QUESTION_DETAILS,
   FETCH_QUESTION_DETAILS_ERROR
} from '../constants/actionTypes';

function fetchQuestionDetailsSuccess(data) {
   return {
      type: ADD_QUESTION_DETAILS,
      payload: data
   }
}

function fetchQuestionDtlsFailure(data) {
   return {
      type: FETCH_QUESTION_DETAILS_ERROR,
      payload: data
   }
}

export function questionDetailsLoading() {
   return {
      type: LOADING_QUESTION_DETAILS
   }
}

export function handleQuestionDetailsResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchQuestionDetailsSuccess(data.data);
   } else {
      return fetchQuestionDtlsFailure({
         message: data.message
      });
   }
}