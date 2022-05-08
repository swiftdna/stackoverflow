import {
   ADD_QUESTIONS,
   LOADING_QUESTIONS,
   // CLEAR_QUESTIONS,
   FETCH_QUESTIONS_ERROR
} from '../constants/actionTypes';

function fetchQuestionsSuccess(data) {
   return {
      type: ADD_QUESTIONS,
      payload: data
   }
}

function fetchQuestionsFailure(data) {
   return {
      type: FETCH_QUESTIONS_ERROR,
      payload: data
   }
}

export function questionsLoading() {
   return {
      type: LOADING_QUESTIONS
   }
}

export function handleQuestionsResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchQuestionsSuccess(data.data);
   } else {
      return fetchQuestionsFailure({
         message: data.message
      });
   }
}