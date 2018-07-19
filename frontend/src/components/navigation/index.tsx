import * as React from 'react';

import { INavigationComponent } from '../../types';
import { Navigation } from './navigationSingle';

export interface IProps {
	navigations: INavigationComponent[];
}

function testnew() {
	// tslint:disable-next-line
	console.log('new');
}

export const NavigationList = ({navigations}: IProps) => {
	return (
		<div className="navigation-lists">
			{navigations.map((nav) => {
				return (
					<Navigation
						key={nav.navigationName}
						navigationName={nav.navigationName}
						maxLength={nav.maxLength}
						minLength={nav.minLength}
						hasImage={nav.hasImage}
						handleNew={testnew}
					/>
				);
			})}
		</div>
	);
}
