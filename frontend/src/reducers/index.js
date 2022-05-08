import { combineReducers } from 'redux';

import appReducer from './appReducer';
import questionDetailsReducer from './questionDetailsReducer';
import questionsReducer from './questionsReducer';
import questionsSearchReducer from './questionsSearchReducer';

const rootReducer = combineReducers({
  app: appReducer,
  questiondetails: questionDetailsReducer,
  questions: questionsReducer,
  questionssearch: questionsSearchReducer
})

export default rootReducer