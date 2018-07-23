import axios from 'axios';
import { Dispatch } from 'redux';
import * as constants from '../constants/navigationType';
import { INavigationType } from '../types';

export interface ISetNavigationTypesAction {
    navigationTypes: INavigationType[];
    type: constants.SET_NAVIGATION_TYPES;
}

export type INavigationTypeActionType = ISetNavigationTypesAction;

export interface INavigationTypesAjaxLoadingAction {
  status: boolean;
  type: constants.NAVIGATION_TYPES_AJAX_LOADING;
}
export type INavigationTypeAjaxActionType = INavigationTypesAjaxLoadingAction;

export function setNavigationTypesAction(navigationTypes: INavigationType[]): ISetNavigationTypesAction {
    return {
        navigationTypes,
        type: constants.SET_NAVIGATION_TYPES,
    }
}

export function navigationTypesAjaxLoadingAction(status: boolean): INavigationTypesAjaxLoadingAction {
  return {
    status,
    type: constants.NAVIGATION_TYPES_AJAX_LOADING,
  }
}

export function getNavigationTypes(): any {
  return (dispatch: Dispatch) => {
    dispatch(navigationTypesAjaxLoadingAction(true));
    // tslint:disable-next-line
    axios.get(`${process.env.REACT_APP_API_URL}/navigation_type`)
      .then((res) => {
        dispatch(setNavigationTypesAction(res.data));
        dispatch(navigationTypesAjaxLoadingAction(false));
      })
      .catch((err) => {
        dispatch(navigationTypesAjaxLoadingAction(false));
      });
  }
}
