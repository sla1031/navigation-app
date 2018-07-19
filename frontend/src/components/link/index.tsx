import * as React from 'react';

import { ILinkComponent } from '../../types';
import { Link } from './linkSingle';

export interface IProps {
	links: ILinkComponent[];
}

function test() {
	// tslint:disable-next-line
	console.log('test');
}

export const LinkList = ({links}: IProps) => {
	return (
		<div className="link-lists">
			{links.map((link) => {
				return (
					<Link
            key={link.id}
            id={link.id}
          	title={link.title}
          	navigationName={link.navigationName}
          	linkUrl={link.linkUrl}
          	imageUrl={link.imageUrl}
          	order={link.order}
          	canHaveImage={link.canHaveImage}
          	handleDelete={test}
          	handleSave={test}
					/>
				);
			})}
		</div>
	);
}
