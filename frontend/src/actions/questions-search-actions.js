import {
   ADD_QUESTIONS_SEARCH,
   LOADING_QUESTIONS_SEARCH,
   // CLEAR_QUESTIONS_SEARCH,
   FETCH_QUESTIONS_SEARCH_ERROR
} from '../constants/actionTypes';

function fetchQuesSearchSuccess(data) {
   return {
      type: ADD_QUESTIONS_SEARCH,
      payload: data
   }
}

function fetchQuesSearchFailure(data) {
   return {
      type: FETCH_QUESTIONS_SEARCH_ERROR,
      payload: data
   }
}

export function questionSearchLoading() {
   return {
      type: LOADING_QUESTIONS_SEARCH
   }
}

export function handleQuesSearchResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchQuesSearchSuccess(data.data);
   } else {
      return fetchQuesSearchFailure({
         message: data.message
      });
   }
}