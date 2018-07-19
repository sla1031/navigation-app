import * as React from 'react';

import { ILinkComponent } from '../../types';
import { LinkList } from '../link';

import './style.css';

interface Iprops {
  hasImage: boolean;
  links: ILinkComponent[];
	maxLength: number;
	minLength: number;
	navigationName: string;
	handleNew(): void;
}



export class Navigation extends React.Component<Iprops, any> {
	public testsave() {
        // tslint:disable-next-line
        console.log('save');
    }

	public handleNewClick(event: any) {
		this.props.handleNew();
	}

	public render() {
		return (
			<div className="navigation">
				<div className="navigation-header style4">
					<span>{this.props.navigationName}</span>
					<a className="navigation-add-link pull-right" onClick={this.props.handleNew}>+ item</a>
				</div>
				<div className="navigation-link">
          <LinkList links={this.props.links} />
				</div>

			</div>
		);
	}
}
