import * as React from 'react';
import { connect } from 'react-redux';

// import * as navigationActions from '../../actions/navigation';
import { INavigationComponent, INavigationDB, IStoreState } from '../../types';

import { NavigationList } from '../../components/navigation';

interface IProps {
    navigations: INavigationComponent[];
	navigationsAjaxloading: boolean;
}

class NavigationContainer extends React.Component<IProps> {
	constructor(props: IProps) {
		super(props);
	}

	public render() {
		return (
			<div className="navigation-container">
                {
                    this.props.navigationsAjaxloading ?
                        <p className="alert-info">Loading...</p>
                        :
                        <NavigationList navigations={this.props.navigations} />
                }
            </div>
		);
	}
}

function convertDBNames(navigations: INavigationDB[]): INavigationComponent[] {
	let navigationsForComponents: INavigationComponent[] = [];
	if (typeof navigations !== 'undefined' && navigations.length) {
		navigationsForComponents = navigations.map((nav) => {
			return {
				hasImage: nav.has_image,
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
		navigations: convertDBNames(state.navigations),
		navigationsAjaxloading: state.navigationsAjaxloading,
	}
}


export const NavigationPage = connect(mapStateToProps)(NavigationContainer);
