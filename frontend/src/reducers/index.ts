import { combineReducers } from 'redux';

import { linkAjaxReducer, linkReducer} from './link';
import { navigationAjaxReducer, navigationReducer}  from './navigation';
import { navigationTypeAjaxReducer, navigationTypeReducer}  from './navigationType';


const rootReducer = combineReducers({
  links: linkReducer,
  linksAjaxLoading: linkAjaxReducer,
  navigationTypes: navigationTypeReducer,
  navigationTypesAjaxloading: navigationTypeAjaxReducer,
  navigations: navigationReducer,
  navigationsAjaxloading: navigationAjaxReducer,

});

export default rootReducer;
