import * as React from 'react';

import { ILinkComponent, INavigationComponent } from '../../types';
import { Navigation } from './navigationSingle';

export interface IProps {
	navigations: INavigationComponent[];
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
}

function testnew() {
	// tslint:disable-next-line
	console.log('new');
}

export const NavigationList = ({navigations, handleLinkUpdate, handleLinkDelete}: IProps) => {
	return (
		<div className="navigation-lists">
			{navigations.map((nav) => {
				return (
					<Navigation
						key={nav.navigationName}
            {...nav}
            handleNew={testnew}
            handleLinkUpdate={handleLinkUpdate}
            handleLinkDelete={handleLinkDelete}
					/>
				);
			})}
		</div>
	);
}
