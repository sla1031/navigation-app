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

export interface ILoadLinksSuccess {
    links: ILinkDB[];
    type: constants.LOAD_LINKS_SUCCESS;
}

export type ILinkAction = IDeleteLink | ICreateLink | IUpdateLink | ILoadLinksSuccess;

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

export function loadLinkSuccess(links: ILinkDB[]): ILoadLinksSuccess {
    return {
        links,
        type: constants.LOAD_LINKS_SUCCESS,
    }
}
