import { INavigationAction, INavigationAjaxAction } from '../actions/navigation';
import { NAVIGATION_AJAX_LOADING, SET_NAVIGATIONS } from '../constants/navigation';
import initialState from '../store/initialState';
import { INavigationDB } from '../types/';


export function navigationReducer(state: INavigationDB[] = initialState.navigations, action: INavigationAction): INavigationDB[] {
	switch(action.type) {
		case SET_NAVIGATIONS: {
			return action.navigations;
		}
		default:
			return state;
	}
}

export function navigationAjaxReducer(state: boolean  = initialState.navigationsAjaxloading, action: INavigationAjaxAction): boolean {
	switch(action.type) {
		case NAVIGATION_AJAX_LOADING: {
			return action.status;
		}
		default:
			return state;
	}
}