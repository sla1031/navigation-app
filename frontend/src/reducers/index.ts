import { combineReducers } from 'redux';

// import link from './link';
import { navigationAjaxReducer, navigationReducer}  from './navigation';


const rootReducer = combineReducers({
  navigations: navigationReducer,
  navigationsAjaxloading: navigationAjaxReducer,
});

export default rootReducer;
