import { INavigationActionType, INavigationAjaxActionType } from '../actions/navigation';
import { NAVIGATIONS_AJAX_LOADING, SET_NAVIGATIONS, UPDATE_NAVIGATION } from '../constants/navigation';
import initialState from '../store/initialState';
import { INavigationDB } from '../types/';


export function navigationReducer(state: INavigationDB[] = initialState.navigations, action: INavigationActionType): INavigationDB[] {
	switch(action.type) {
		case SET_NAVIGATIONS: {
			return action.navigations;
		}
    case UPDATE_NAVIGATION:

			return state.map((nav) => {
        if (nav.id === action.navigation.id) {
          return action.navigation;
        }
        return nav;
      });
		default:
			return state;
	}
}

export function navigationAjaxReducer(state: boolean  = initialState.navigationsAjaxloading, action: INavigationAjaxActionType): boolean {
	switch(action.type) {
		case NAVIGATIONS_AJAX_LOADING: {
			return action.status;
		}
		default:
			return state;
	}
}
