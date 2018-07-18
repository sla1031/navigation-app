import * as React from 'react';

import './style.css';

interface Iprops {
	navigation_name: string;
	max_length: number;
	min_length: number;
	has_image: boolean;
	handleNew(): void;
}



export class Navigation extends React.Component<Iprops, any> {
	public testsave() {
        // tslint:disable-next-line
        console.log('save');
    }
    public testdelete() {
        // tslint:disable-next-line
        console.log('delete');
    }

    public testnew() {
        // tslint:disable-next-line
        console.log('new');
    }

	public handleNewClick(event: any) {
		this.props.handleNew();
	}

	public render() {
		return (
			<div className="navigation">
				<div className="navigation-header style4">
					<span>{this.props.navigation_name}</span>
					<a className="navigation-add-link pull-right" onClick={this.props.handleNew}>+ item</a>
				</div>
				<div className="navigation-link">
					{this.props.children}
				</div>

			</div>
		);
	}
}
