import axios from 'axios';
import { Dispatch } from 'redux';

import * as constants from '../constants/link';
import { ILinkDB } from '../types/';

export interface ICreateLinkAction {
  link: ILinkDB;
  type: constants.CREATE_LINK;
}

export interface IUpdateLinkAction {
  link: ILinkDB;
  type: constants.UPDATE_LINK;
}

export interface IDeleteLinkAction {
  linkId: string;
  type: constants.DELETE_LINK;
}

export interface ISetLinksAction {
  links: ILinkDB[];
  type: constants.SET_LINKS;
}

export type ILinkActionType = IDeleteLinkAction | ICreateLinkAction | IUpdateLinkAction | ISetLinksAction;

export interface ILinksAjaxLoadingAction {
  status: boolean;
  type: constants.LINKS_AJAX_LOADING;
}

export type ILinkAjaxActionType = ILinksAjaxLoadingAction;

export function createLinkAction(link: ILinkDB): ICreateLinkAction {
  return {
    link,
    type: constants.CREATE_LINK,
  }
}

export function updateLinkAction(link: ILinkDB): IUpdateLinkAction {
  return {
    link,
    type: constants.UPDATE_LINK,
  }
}

export function deleteLinkAction(linkId: string): IDeleteLinkAction {
  return {
    linkId,
    type: constants.DELETE_LINK,
  }
}

export function setLinksAction(links: ILinkDB[]): ISetLinksAction {
  return {
    links,
    type: constants.SET_LINKS,
  }
}

export function linksAjaxLoadingAction(status: boolean): ILinksAjaxLoadingAction {
  return {
    status,
    type: constants.LINKS_AJAX_LOADING,
  }
}


export function getLinks(): any {
  return (dispatch: Dispatch) => {
    dispatch(linksAjaxLoadingAction(true));
    // tslint:disable-next-line
    axios.get(`${process.env.REACT_APP_API_URL}/link`)
      .then((res) => {
        // tslint:disable-next-line
        console.log('getLinks', res);
        dispatch(setLinksAction(res.data));
        dispatch(linksAjaxLoadingAction(false));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('getLinks', err);
        dispatch(linksAjaxLoadingAction(false));
      });
    }
}


export function updateLink(link: ILinkDB): any {
  // tslint:disable-next-line
  console.log('updateLink', `${process.env.REACT_APP_API_URL}/link/${link.id}`);
  return (dispatch: Dispatch) => {
    axios.patch(`${process.env.REACT_APP_API_URL}/link/${link.id}`, link)
      .then((res) => {
        // tslint:disable-next-line
        console.log('updateLink', res);
        dispatch(updateLinkAction(res.data))
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('updateLink', err);
      });
  }
}

export function deleteLink(linkId: string): any {
  // tslint:disable-next-line
  console.log('deleteLink', `${process.env.REACT_APP_API_URL}/link/${linkId}`);
  return (dispatch: Dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/link/${linkId}`)
      .then((res) => {
        // tslint:disable-next-line
        console.log('deleteLink', res);
        dispatch(deleteLinkAction(linkId))
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('deleteLink', err);
      });
  }
}
