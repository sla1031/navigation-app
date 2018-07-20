import { INavigationTypeActionType, INavigationTypeAjaxActionType } from '../actions/navigationType';
import { NAVIGATION_TYPES_AJAX_LOADING, SET_NAVIGATION_TYPES } from '../constants/navigationType';
import initialState from '../store/initialState';
import { INavigationType } from '../types/';


export function navigationTypeReducer(state: INavigationType[] = initialState.navigationTypes, action: INavigationTypeActionType): INavigationType[] {
	switch(action.type) {
		case SET_NAVIGATION_TYPES: {
			return action.navigationTypes;
		}
		default:
			return state;
	}
}

export function navigationTypeAjaxReducer(state: boolean  = initialState.navigationTypesAjaxloading, action: INavigationTypeAjaxActionType): boolean {
	switch(action.type) {
		case NAVIGATION_TYPES_AJAX_LOADING: {
			return action.status;
		}
		default:
			return state;
	}
}
