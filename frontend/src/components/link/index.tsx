import * as React from 'react';

import { ILinkComponent } from '../../types';
import { Link } from './linkSingle';

export interface IProps {
	links: ILinkComponent[];
  handleUpdate(link: ILinkComponent): void;
  handleDelete(linkId: string): void;
}

export const LinkList = ({links, handleUpdate, handleDelete}: IProps) => {
	return (
		<div className="link-lists">
			{links.map((link) => {
				return (
					<Link
            key={link.id}
            {...link}
          	handleDelete={handleDelete}
            handleUpdate={handleUpdate}
					/>
				);
			})}
		</div>
	);
}
