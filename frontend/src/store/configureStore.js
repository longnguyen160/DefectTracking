import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas';

const initialState = {};
const logger = createLogger();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  let store;

  if (module.hot) {
    // Support hot reloading of components
    const composeEnhancers = composeWithDevTools({});
    const devToolMiddleware = composeEnhancers(applyMiddleware(sagaMiddleware, logger));

    store = createStore(
      rootReducer,
      initialState,
      devToolMiddleware,
    );
  } else {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(sagaMiddleware),
    );
  }

  sagaMiddleware.run(rootSaga);

  return store;
}
