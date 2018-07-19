import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { getNavigations } from './actions/navigation';
import configureStore from './store/configureStore';

import App from './App';
import './index.css';

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
store.dispatch(getNavigations());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
