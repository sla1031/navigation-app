import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/navigation';
import { INavigationDB } from '../types';

export interface ISetNavigationsAction {
    navigations: INavigationDB[];
    type: constants.SET_NAVIGATIONS;
}

export interface IUpdateNavigationAction {
  navigation: INavigationDB;
  type: constants.UPDATE_NAVIGATION;
}

export type INavigationActionType = ISetNavigationsAction | IUpdateNavigationAction;

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

export function updateNavigationAction(navigation: INavigationDB): IUpdateNavigationAction {
  return {
    navigation,
    type: constants.UPDATE_NAVIGATION,
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
         console.log('getNavigations', res);
        dispatch(setNavigationsAction(res.data));
        dispatch(navigationsAjaxLoadingAction(false));
      })
      .catch((err) => {
        // tslint:disable-next-line
        console.log('getNavigations', err);
        dispatch(navigationsAjaxLoadingAction(false));
      });
  }
}
