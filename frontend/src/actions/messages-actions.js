import {
   ADD_MESSAGES,
   LOADING_MESSAGES,
   // CLEAR_MESSAGES,
   FETCH_MESSAGES_ERROR,
   ADD_RECIPIENTS,
   LOADING_RECIPIENTS,
   FETCH_RECIPIENTS_ERROR,
} from '../constants/actionTypes';

function fetchMessagesSuccess(id, data) {
   return {
      type: ADD_MESSAGES,
      payload: {
         id,
         data
      }
   }
}

function fetchMessagesFailure(data) {
   return {
      type: FETCH_MESSAGES_ERROR,
      payload: data
   }
}

export function messagesLoading() {
   return {
      type: LOADING_MESSAGES
   }
}

export function handleMessagesResponse(id, response) {
   const {data} = response;
   if (data.success) {
      return fetchMessagesSuccess(id, data.data);
   } else {
      return fetchMessagesFailure({
         message: data.message
      });
   }
}

function fetchRecipientSuccess(data) {
   return {
      type: ADD_RECIPIENTS,
      payload: data
   }
}

function fetchRecipientFailure(data) {
   return {
      type: FETCH_RECIPIENTS_ERROR,
      payload: data
   }
}

export function recipientsLoading() {
   return {
      type: LOADING_RECIPIENTS
   }
}

export function handleRecipientsResponse(response) {
   const {data} = response;
   if (data.success) {
      return fetchRecipientSuccess(data.data);
   } else {
      return fetchRecipientFailure({
         message: data.message
      });
   }
}