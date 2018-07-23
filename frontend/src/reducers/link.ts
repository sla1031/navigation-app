import { findLastIndex } from 'lodash';

import { ILinkActionType, ILinkAjaxActionType } from '../actions/link';
import {
  CREATE_LINK,
  DELETE_LINK,
  LINKS_AJAX_LOADING,
  RESORT_LINK,
  SET_LINKS,
  UPDATE_LINK,
} from '../constants/link';
import initialState from '../store/initialState';
import { ILinkDB } from '../types/';

function compareLinks(link1: ILinkDB, link2: ILinkDB) {
  if (link1.navigation === link2.navigation) {
    return link1.sort - link2.sort;
  }
  return 0;
}

function reSortLinks(links: ILinkDB[], newLink: ILinkDB, oldLink: ILinkDB) {
  const sortedLinks = links.map((link) => {
    if (newLink.navigation === link.navigation) {
      if (oldLink.sort < newLink.sort) {
        if (link.id !== newLink.id && link.sort <= newLink.sort && link.sort >= oldLink.sort) {
          return {
            ...link,
            sort: link.sort - 1
          }
        }
      } else {
        if (link.id !== newLink.id && link.sort >= newLink.sort && link.sort <= oldLink.sort) {
          return {
            ...link,
            sort: link.sort + 1
          }
        }
      }
    }
    return link;
  });

  return sortedLinks.sort(compareLinks);
}

export function linkReducer(state: ILinkDB[] = initialState.links, action: ILinkActionType): ILinkDB[] {
  let newState: ILinkDB[];
	switch(action.type) {
		case CREATE_LINK: {
      newState = [
        ...state,
      ];
      const nextIndex = findLastIndex(newState, ['navigation', action.link.navigation])  + 1;
      newState.splice(nextIndex, 0, action.link);
			return newState;
    }
		case UPDATE_LINK: {
      newState = [
        ...state,
      ];
			const foundIndex = newState.findIndex((link: ILinkDB) => {
				return link.id === action.link.id;
			});
      const oldLink: ILinkDB = Object.assign({}, newState[foundIndex]);
      newState[foundIndex] = {
        ...oldLink,
        ...action.link,
      };
			return newState;
    }

    case RESORT_LINK: {
      // update resorted link in state
      newState = [
        ...state,
      ];
			const foundIndex = newState.findIndex((link: ILinkDB) => {
				return link.id === action.link.id;
			});
      const oldLink = {
        ...newState[foundIndex]
      };
      newState[foundIndex] = {
        ...oldLink,
        ...action.link,
      };

      // resort all other links
      newState = reSortLinks(newState, newState[foundIndex], oldLink);
			return newState;
    }

		case DELETE_LINK: {
      newState = [
        ...state,
      ];
			const indexToDelete = newState.findIndex((link: ILinkDB) => {
				return link.id === action.linkId;
			});
      const oldLink = newState[indexToDelete];
      // tslint:disable-next-line
      console.log('oldLink', oldLink);
			newState.splice(indexToDelete, 1);
      const fakeLinkForSort = {
        id: 'na',
        linkUrl: 'na',
        navigation: oldLink.navigation,
        sort: newState.length + 1,
        title: 'na',
      }
      // resort rest of links
      newState = reSortLinks(newState, fakeLinkForSort, oldLink);
			return newState;
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
