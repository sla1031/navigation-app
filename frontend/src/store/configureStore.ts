import { applyMiddleware, createStore, } from 'redux';
import reduxThunk from 'redux-thunk';


import reducers from '../reducers';
import initialState from './initialState';

export default function configureStore() {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(reduxThunk),
  );
}
