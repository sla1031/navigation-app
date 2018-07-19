import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/navigation';
import { INavigationDB } from '../types';

export interface ISetNavigations {
    navigations: INavigationDB[];
    type: constants.SET_NAVIGATIONS;
}

export interface INavigationsAjaxLoading {
  status: boolean;
  type: constants.NAVIGATIONS_AJAX_LOADING;
}

export type INavigationAction = ISetNavigations;
export type INavigationAjaxAction = INavigationsAjaxLoading;

export function setNavigations(navigations: INavigationDB[]): ISetNavigations {
    return {
        navigations,
        type: constants.SET_NAVIGATIONS,
    }
}

export function navigationsAjaxLoading(status: boolean) {
  return {
    status,
    type: constants.NAVIGATIONS_AJAX_LOADING,
  }
}

export function getNavigations(): any {
  return (dispatch: Dispatch) => {
    dispatch(navigationsAjaxLoading(true));
    // tslint:disable-next-line
    axios.get(`${process.env.REACT_APP_API_URL}/navigation`)
      .then((res) => {
         // tslint:disable-next-line
         console.log('getnavigations', res);
        dispatch(setNavigations(res.data));
        dispatch(navigationsAjaxLoading(false));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('getnavigations', err);
        dispatch(navigationsAjaxLoading(false));
      });
  }
}
