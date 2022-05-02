import {
   ADD_QUESTION_DETAILS,
   LOADING_QUESTION_DETAILS,
   // CLEAR_QUESTION_DETAILS,
   FETCH_QUESTION_DETAILS_ERROR,
   ADD_ANSWER_DETAILS,
   FETCH_ANSWER_DETAILS_ERROR
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

function fetchAnswerSuccess(data) {
   return {
      type: ADD_ANSWER_DETAILS,
      payload: data
   }
}

function fetchAnswerFailure(data) {
   return {
      type: FETCH_ANSWER_DETAILS_ERROR,
      payload: data
   }
}

export function handleAnswerResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchAnswerSuccess(data.data);
   } else {
      return fetchAnswerFailure({
         message: data.message
      });
   }
}