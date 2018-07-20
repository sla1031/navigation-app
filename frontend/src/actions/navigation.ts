import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/navigation';
import { INavigationDB } from '../types';

export interface ISetNavigationsAction {
    navigations: INavigationDB[];
    type: constants.SET_NAVIGATIONS;
}

export type INavigationActionType = ISetNavigationsAction;

export interface INavigationsAjaxLoadingAction {
  status: boolean;
  type: constants.NAVIGATIONS_AJAX_LOADING;
}
export type INavigationAjaxActionType = INavigationsAjaxLoadingAction;

export function setNavigationsAction(navigations: INavigationDB[]): ISetNavigationsAction {
    return {
        navigations,
        type: constants.SET_NAVIGATIONS,
    }
}

export function navigationsAjaxLoadingAction(status: boolean): INavigationsAjaxLoadingAction {
  return {
    status,
    type: constants.NAVIGATIONS_AJAX_LOADING,
  }
}

export function getNavigations(): any {
  return (dispatch: Dispatch) => {
    dispatch(navigationsAjaxLoadingAction(true));
    // tslint:disable-next-line
    axios.get(`${process.env.REACT_APP_API_URL}/navigation`)
      .then((res) => {
         // tslint:disable-next-line
         console.log('getnavigations', res);
        dispatch(setNavigationsAction(res.data));
        dispatch(navigationsAjaxLoadingAction(false));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('getnavigations', err);
        dispatch(navigationsAjaxLoadingAction(false));
      });
  }
}
