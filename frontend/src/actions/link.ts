import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/link';
import { ILinkDB } from '../types/';

export interface ICreateLink {
  link: ILinkDB;
  type: constants.CREATE_LINK;
}

export interface IUpdateLink {
  link: ILinkDB;
  type: constants.UPDATE_LINK;
}

export interface IDeleteLink {
  link: ILinkDB;
  type: constants.DELETE_LINK;
}

export interface ISetLinks {
  links: ILinkDB[];
  type: constants.SET_LINKS;
}

export type ILinkAction = IDeleteLink | ICreateLink | IUpdateLink | ISetLinks;

export interface ILinksAjaxLoading {
  status: boolean;
  type: constants.LINKS_AJAX_LOADING;
}

export type ILinkAjaxAction = ILinksAjaxLoading;

export function createLink(link: ILinkDB): ICreateLink {
  return {
    link,
    type: constants.CREATE_LINK,
  }
}

export function updateLink(link: ILinkDB): IUpdateLink {
  return {
    link,
    type: constants.UPDATE_LINK,
  }
}

export function deleteLink(link: ILinkDB): IDeleteLink {
  return {
    link,
    type: constants.DELETE_LINK,
  }
}

export function setLinks(links: ILinkDB[]): ISetLinks {
  return {
    links,
    type: constants.SET_LINKS,
  }
}

export function linksAjaxLoading(status: boolean) {
  return {
  status,
  type: constants.LINKS_AJAX_LOADING,
  }
}


export function getLinks(): any {
  return (dispatch: Dispatch) => {
  dispatch(linksAjaxLoading(true));
  // tslint:disable-next-line
  axios.get(`${process.env.REACT_APP_API_URL}/link`)
    .then((res) => {
     // tslint:disable-next-line
     console.log('getLinks', res);
    dispatch(setLinks(res.data));
    dispatch(linksAjaxLoading(false));
    })
    .catch((err) => {
    // tslint:disable-next-line
    console.log('getLinks', err);
    dispatch(linksAjaxLoading(false));
    });
  }
}
