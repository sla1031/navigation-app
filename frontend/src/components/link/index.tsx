import * as React from 'react';

import { ILinkComponent } from '../../types';
import { Link } from './linkSingle';

export interface IProps {
  canDeleteLinks: boolean;
	links: ILinkComponent[];
  handleUpdate(link: ILinkComponent): void;
  handleDelete(linkId: string): void;
}

export const LinkList = ({canDeleteLinks, links, handleUpdate, handleDelete}: IProps) => {
	return (
		<div className="link-lists">
			{links.map((link) => {
				return (
					<Link
            key={link.id}
            {...link}
            canDeleteLink={canDeleteLinks}
          	handleDelete={handleDelete}
            handleUpdate={handleUpdate}
					/>
				);
			})}
		</div>
	);
}
