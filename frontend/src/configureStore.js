import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import monitorReducersEnhancer from './enhancers/monitorReducer'
import loggerMiddleware from './middleware/logger'
import rootReducer from './reducers'

export default function configureAppStore(preloadedState) {
  const store = configureStore({
    reducer: rootReducer,
    middleware: process.env.NODE_ENV !== 'test' ? [loggerMiddleware, ...getDefaultMiddleware()] : [...getDefaultMiddleware()],
    preloadedState,
    enhancers: process.env.NODE_ENV !== 'test' ? [monitorReducersEnhancer] : []
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => store.replaceReducer(rootReducer))
  }

  return store
}