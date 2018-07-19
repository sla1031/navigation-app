import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/navigation';
import { INavigationDB } from '../types';

export interface ISetNavigations {
    navigations: INavigationDB[];
    type: constants.SET_NAVIGATIONS;
}

export interface INavigationAjaxLoading {
  status: boolean;
  type: constants.NAVIGATION_AJAX_LOADING;
}

export type INavigationAction = ISetNavigations;
export type INavigationAjaxAction = INavigationAjaxLoading;

export function setNavigations(navigations: INavigationDB[]): ISetNavigations {
    return {
        navigations,
        type: constants.SET_NAVIGATIONS,
    }
}

export function navigationAjaxLoading(status: boolean) {
  return {
    status,
    type: constants.NAVIGATION_AJAX_LOADING,
  }
}

export function getNavigations(): any {
  return (dispatch: Dispatch) => {
    dispatch(navigationAjaxLoading(true));
    // tslint:disable-next-line
    axios.get('http://localhost:3000/navigation') // TODO
      .then((res) => {
         // tslint:disable-next-line
         console.log('getnavigations', res);
        dispatch(setNavigations(res.data));
        dispatch(navigationAjaxLoading(false));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('getnavigations', err);
        dispatch(navigationAjaxLoading(false));
      });
  }
}
