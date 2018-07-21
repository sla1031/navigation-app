import { ILinkActionType, ILinkAjaxActionType } from '../actions/link';
import { CREATE_LINK, DELETE_LINK, LINKS_AJAX_LOADING, SET_LINKS, UPDATE_LINK } from '../constants/link';
import initialState from '../store/initialState';
import { ILinkDB } from '../types/';

export function linkReducer(state: ILinkDB[] = initialState.links, action: ILinkActionType): ILinkDB[] {
  let newState;
	switch(action.type) {
		case CREATE_LINK: {
      newState = [
        ...state,
        Object.assign({}, action.link)
      ];

			return newState;
    }
		case UPDATE_LINK: {
      newState = state.map((link) => {
        if (link.id === action.link.id) {
          return action.link;
        }
        return link;
      });
      // tslint:disable-next-line
      console.log(action.type, newState);
			return newState;
    }
		case DELETE_LINK: {
			newState = Object.assign([], state);
			const indexToDelete = newState.findIndex((link: ILinkDB) => {
				return link.id === action.linkId;
			});
			newState.splice(indexToDelete, 1);
      // tslint:disable-next-line
      console.log(action.type, newState);
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
