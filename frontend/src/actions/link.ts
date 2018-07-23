import axios from 'axios';
import { Dispatch } from 'redux';

import * as constants from '../constants/link';
import { ILinkDB, ILinkPatch, INavigationDB } from '../types/';

export interface ICreateLinkAction {
  link: ILinkDB;
  type: constants.CREATE_LINK;
}

export interface IUpdateLinkAction {
  link: ILinkPatch;
  type: constants.UPDATE_LINK;
}

export interface IReSortLinkAction {
  link: ILinkPatch;
  type: constants.RESORT_LINK;
}

export interface IDeleteLinkAction {
  linkId: string;
  type: constants.DELETE_LINK;
}

export interface ISetLinksAction {
  links: ILinkDB[];
  type: constants.SET_LINKS;
}

export interface IRemoveLinkImageAction {
  navigation: INavigationDB;
  type: constants.REMOVE_LINKS_IMAGE;
}

export type ILinkActionType =
  IDeleteLinkAction |
  ICreateLinkAction |
  IUpdateLinkAction |
  IReSortLinkAction |
  ISetLinksAction |
  IRemoveLinkImageAction;

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

export function updateLinkAction(link: ILinkPatch): IUpdateLinkAction {
  return {
    link,
    type: constants.UPDATE_LINK,
  }
}

export function reSortLinkAction(link: ILinkPatch): IReSortLinkAction {
  return {
    link,
    type: constants.RESORT_LINK,
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

export function removeLinkImageAction(navigation: INavigationDB): IRemoveLinkImageAction {
  return {
    navigation,
    type: constants.REMOVE_LINKS_IMAGE,
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
    axios.get(`${process.env.REACT_APP_API_URL}/link`)
      .then((res) => {
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


export function updateLink(link: ILinkPatch): any {
  return (dispatch: Dispatch) => {
    // so the db doesn't try to update id
    const updatedLink = {
      ...link,
    };
    delete updatedLink.id;
    axios.patch(`${process.env.REACT_APP_API_URL}/link/${link.id}`, updatedLink)
      .then((res) => {
        dispatch(updateLinkAction(res.data[0]));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('updateLink', err);
      });
  }
}

export function deleteLink(linkId: string): any {
  return (dispatch: Dispatch) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/link/${linkId}`)
      .then((res) => {
        dispatch(deleteLinkAction(linkId));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('deleteLink', err);
      });
  }
}


export function createLink(link: ILinkPatch):any {
  return (dispatch: Dispatch) => {
    axios.post(`${process.env.REACT_APP_API_URL}/link`, link)
      .then((res) => {
        dispatch(createLinkAction(res.data[0]));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('createLink', err);
      });
  }
}

export function reSortLink(link: ILinkPatch): any {
  return (dispatch: Dispatch) => {
    // so the db doesn't try to update id
    const updatedLink = {
      ...link,
    };
    delete updatedLink.id;
    axios.patch(`${process.env.REACT_APP_API_URL}/link/${link.id}`, updatedLink)
      .then((res) => {
        dispatch(reSortLinkAction(res.data[0]));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('reSortLinks', err);
      });
  }
}
