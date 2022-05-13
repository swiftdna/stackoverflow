import {
   ADD_QUESTIONS_SEARCH,
   LOADING_QUESTIONS_SEARCH,
   // CLEAR_QUESTIONS_SEARCH,
   FETCH_QUESTIONS_SEARCH_ERROR
} from '../constants/actionTypes';
import {isJsonString} from '../utils';

function fetchQuesSearchSuccess(data) {
   data.map(dt => {
      if (isJsonString(dt.text)) {
         dt.text = JSON.parse(dt.text);
         if (dt.text && dt.text.blocks) {
            dt.text = dt.text.blocks;
            dt.text.blocks = dt.text.blocks.filter(x => x.type !== 'image');
         }
         dt.isMultiMedia = true;
      }
   });
   data = data.filter(dt => dt.status !== 'pending');
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