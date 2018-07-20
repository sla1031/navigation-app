import { ILinkActionType, ILinkAjaxActionType } from '../actions/link';
import { CREATE_LINK, DELETE_LINK, LINKS_AJAX_LOADING, SET_LINKS, UPDATE_LINK } from '../constants/link';
import initialState from '../store/initialState';
import { ILinkDB } from '../types/';

export function linkReducer(state: ILinkDB[] = initialState.links, action: ILinkActionType): ILinkDB[] {
	switch(action.type) {
		case CREATE_LINK:
			return [
				// TODO
			]
		case UPDATE_LINK:

			return state.map((link) => {
        if (link.id === action.link.id) {
          return action.link;
        }
        return link;
      });
		case DELETE_LINK: {
			const newState = Object.assign([], state);
			const indexToDelete = newState.findIndex((link: ILinkDB) => {
				return link.id === action.linkId;
			});
			newState.splice(indexToDelete, 1);
			return newState;
		}
		case SET_LINKS: {
			return action.links;
		}
		default:
			return state;
	}
}

export function linkAjaxReducer(state: boolean  = initialState.linksAjaxLoading, action: ILinkAjaxActionType): boolean {
	switch(action.type) {
		case LINKS_AJAX_LOADING: {
			return action.status;
		}
		default:
			return state;
	}
}
