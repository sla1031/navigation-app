import { ILinkAction } from '../actions/link';
import { CREATE_LINK, DELETE_LINK, LOAD_LINKS_SUCCESS, UPDATE_LINK } from '../constants/link';
import initialState from '../store/initialState';
import { ILinkDB } from '../types/';

export function linkReducer(state: ILinkDB[] = initialState.links, action: ILinkAction): ILinkDB[] {
	switch(action.type) {
		case CREATE_LINK:
			return [
				// TODO
			]
		case UPDATE_LINK:
			return [
				// TODO
			]
		case DELETE_LINK: {

			/* TODO
			const newState = Object.assign([], state);
			const indexToDelete = newState.links.findIndex((link: ILinkDB) => {
				return link.id === action.link.id;
			});
			newState.links.splice(indexToDelete, 1);
			return newState;
			*/
			return [
				// TODO
			]
		}
		case LOAD_LINKS_SUCCESS: {
			return action.links;
		}
		default:
			return state;
	}
}
