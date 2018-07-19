import { combineReducers } from 'redux';

import { linkAjaxReducer, linkReducer} from './link';
import { navigationAjaxReducer, navigationReducer}  from './navigation';


const rootReducer = combineReducers({
  links: linkReducer,
  linksAjaxLoading: linkAjaxReducer,
  navigations: navigationReducer,
  navigationsAjaxloading: navigationAjaxReducer,
});

export default rootReducer;
