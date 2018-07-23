import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


import * as linkActions from '../actions/link';
import * as navigationActions from '../actions/navigation';

import {
  ILinkComponent,
  ILinkDB,
  ILinkPatch,
  INavigationComponent,
  INavigationDB,
  INavigationType,
  IStoreState,
 } from '../types';

import { Navigation } from '../components/navigation/navigationSingle';

interface IProps {
  navigations: INavigationComponent[];
	navigationsAjaxloading: boolean;
  navigationTypes: INavigationType[];
  navigationTypesAjaxLoading: boolean;
  linksAjaxLoading: boolean;
  handleLinkDelete(linkId: string): void;
  handleLinkNew(link: ILinkPatch): void;
  handleLinkReSort(link: ILinkPatch): void;
  handleLinkUpdate(link: ILinkPatch): void;
  handleNavigationUpdate(navigation: INavigationDB): void;
}

class NavigationContainer extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<>
        {
          (this.props.navigationsAjaxloading || this.props.linksAjaxLoading || this.props.navigationTypesAjaxLoading) ?
          <p className="alert-info">Loading...</p>
          :
          this.props.navigations.map((navigation) => {
    				return (
              <Navigation
                key={navigation.id}
                {...navigation}
                allNavigationTypes={this.props.navigationTypes}
                handleLinkNew={this.props.handleLinkNew}
                handleLinkDelete={this.props.handleLinkDelete}
                handleLinkUpdate={this.props.handleLinkUpdate}
                handleLinkReSort={this.props.handleLinkReSort}
                handleNavigationUpdate={this.props.handleNavigationUpdate}
              />
    				);
    			})
        }
      </>
		);
	}
}

function findNavigationType(
  navigationTypeName: string,
  navigationTypes: INavigationType[],
): INavigationType {
  const defaultType = {
    hasImage: false,
    maxLength: 10,
    minLength: 0,
    name: 'default',
  };
  return navigationTypes.find((navType) => {
    return navType.name === navigationTypeName;
  }) || defaultType;
}

function convertFilterLinks(
  links: ILinkDB[],
  navigationId: string,
  canHaveImage: boolean,
): ILinkComponent[] {
  return links.reduce((filtered: ILinkComponent[], link: ILinkDB) => {
    if (link.navigation === navigationId) {
      filtered.push({
        ...link,
        canHaveImage,
      });
    }
    return filtered;
  }, []);
}

function convertNavigations(
  navigations: INavigationDB[],
  links:ILinkDB[],
  navigationTypes: INavigationType[],
):INavigationComponent[] {
  return navigations.map((nav) => {
    const navigationTypeFound =  findNavigationType(nav.navigationType, navigationTypes);
    return {
      allNavigationTypes: navigationTypes,
      id: nav.id,
      links: convertFilterLinks(links, nav.id, navigationTypeFound.hasImage),
      navigationType: navigationTypeFound,
      navigationTypeName: nav.navigationType,
    }
  });
}


function mapStateToProps(state: IStoreState, ownProps: IProps) {
	return {
    linksAjaxLoading: state.linksAjaxLoading,
    navigationTypes: state.navigationTypes,
    navigationTypesAjaxloading: state.navigationsAjaxloading,
		navigations: convertNavigations(state.navigations, state.links, state.navigationTypes),
		navigationsAjaxloading: state.navigationsAjaxloading,
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleLinkDelete: (linkId: string) => dispatch(linkActions.deleteLink(linkId)),
    handleLinkNew: (link: ILinkPatch) => dispatch(linkActions.createLink(link)),
    handleLinkReSort: (link: ILinkPatch) => dispatch(linkActions.reSortLink(link)),
    handleLinkUpdate: (link: ILinkPatch) => dispatch(linkActions.updateLink(link)),
    handleNavigationUpdate: (navigation: INavigationDB, navigationType: INavigationType) => dispatch(navigationActions.updateNavigation(navigation, navigationType)),
  }
}

export const NavigationPage = connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
