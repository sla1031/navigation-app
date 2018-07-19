import * as React from 'react';

import './style.css';

interface Iprops {
	navigationName: string;
	maxLength: number;
	minLength: number;
	hasImage: boolean;
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
					{this.props.children}
				</div>

			</div>
		);
	}
}
