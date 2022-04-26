import { combineReducers } from 'redux';

import appReducer from './appReducer';
import questionDetailsReducer from './questionDetailsReducer';

const rootReducer = combineReducers({
  app: appReducer,
  questiondetails: questionDetailsReducer
})

export default rootReducer