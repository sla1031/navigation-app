import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';


import * as linkActions from '../actions/link';
import { ILinkComponent, ILinkDB, INavigationComponent, INavigationDB, IStoreState } from '../types';

import { NavigationList } from '../components/navigation';

interface IProps {
  navigations: INavigationComponent[];
	navigationsAjaxloading: boolean;
  linksAjaxLoading: boolean;
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
}

class NavigationContainer extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<>
        {
          (this.props.navigationsAjaxloading || this.props.linksAjaxLoading) ?
              <p className="alert-info">Loading...</p>
              :
              <NavigationList
                navigations={this.props.navigations}
                handleLinkUpdate={this.props.handleLinkUpdate}
                handleLinkDelete={this.props.handleLinkDelete}
              />
        }
      </>
		);
	}
}

function linksConvertDBNamesAndFilter(links: ILinkDB[], navigationName: string, canHaveImage: boolean): ILinkComponent[] {
	let linksForComponents: ILinkComponent[] = [];
	if (typeof links !== 'undefined' && links.length) {
		linksForComponents = links.reduce((res: ILinkComponent[], link: ILinkDB) => {
      if(link.navigation_name === navigationName) {
        res.push({
          canHaveImage,
          id: link.id,
          imageUrl: link.image_url,
          linkUrl: link.link_url,
          navigationName: link.navigation_name,
          order: link.order,
          title: link.title,
  			});
      }
      return res;
		}, []);
	}
	return linksForComponents;
}

function linkConvertComponentNames(link: ILinkComponent): ILinkDB {
	return {
    id: link.id,
    image_url: link.imageUrl,
    link_url: link.linkUrl,
    navigation_name: link.navigationName,
    order: link.order,
    title: link.title,
  }
}

function navigationConvertDBNames(navigations: INavigationDB[], links: ILinkDB[]): INavigationComponent[] {
	let navigationsForComponents: INavigationComponent[] = [];
	if (typeof navigations !== 'undefined' && navigations.length) {
		navigationsForComponents = navigations.map((nav) => {
			return {
				hasImage: nav.has_image,
        links: linksConvertDBNamesAndFilter(links, nav.name, nav.has_image),
				maxLength: nav.max_length,
				minLength: nav.min_length,
				navigationName: nav.name,
			};
		});
	}
	return navigationsForComponents;
}

function mapStateToProps(state: IStoreState, ownProps: IProps) {
	return {
    linksAjaxLoading: state.linksAjaxLoading,
		navigations: navigationConvertDBNames(state.navigations, state.links),
		navigationsAjaxloading: state.navigationsAjaxloading,
	}
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    handleLinkDelete: (linkId: string) => dispatch(linkActions.deleteLink(linkId)),
    handleLinkUpdate: (link: ILinkComponent) => dispatch(linkActions.updateLink(linkConvertComponentNames(link))),
  }
}

export const NavigationPage = connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
