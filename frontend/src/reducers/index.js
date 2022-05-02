import { combineReducers } from 'redux';

import appReducer from './appReducer';
import questionDetailsReducer from './questionDetailsReducer';
import questionsReducer from './questionsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  questiondetails: questionDetailsReducer,
  questions: questionsReducer
})

export default rootReducer