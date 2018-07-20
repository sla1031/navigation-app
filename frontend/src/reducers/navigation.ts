import { INavigationActionType, INavigationAjaxActionType } from '../actions/navigation';
import { NAVIGATIONS_AJAX_LOADING, SET_NAVIGATIONS } from '../constants/navigation';
import initialState from '../store/initialState';
import { INavigationDB } from '../types/';


export function navigationReducer(state: INavigationDB[] = initialState.navigations, action: INavigationActionType): INavigationDB[] {
	switch(action.type) {
		case SET_NAVIGATIONS: {
			return action.navigations;
		}
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
