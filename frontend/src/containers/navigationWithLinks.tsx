import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


import * as linkActions from '../actions/link';
import * as navigationActions from '../actions/navigation';

import {
  ILinkComponent,
  ILinkDB,
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
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
  handleLinkNew(navigationId: string): void;
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
                handleLinkUpdate={this.props.handleLinkUpdate}
                handleLinkDelete={this.props.handleLinkDelete}
                handleLinkNew={this.props.handleLinkNew}
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
  // tslint:disable-next-line
  console.log('link', links);
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
    handleLinkNew: (navigationId: string) => dispatch(linkActions.createLink(navigationId)),
    handleLinkUpdate: (link: ILinkComponent) => dispatch(linkActions.updateLink(link)),
    handleNavigationUpdate: (navigation: INavigationDB) => dispatch(navigationActions.updateNavigation(navigation)),
  }
}

export const NavigationPage = connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
