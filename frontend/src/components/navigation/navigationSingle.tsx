import * as React from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

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
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
}



export class Navigation extends React.Component<Iprops, any> {
	public testsave() {
        // tslint:disable-next-line
        console.log('save');
    }

	public onClickNew(event: any) {
		this.props.handleNew();
	}

	public render() {
    const tooltip = (
      <Tooltip>
        This navigation type can only hold {this.props.maxLength} link{(this.props.maxLength > 1) ? 's' : ''}
      </Tooltip>
    );

    // tslint:disable-next-line
    console.log(`length ${this.props.links.length} min ${this.props.minLength}`);

		return (
			<div className="navigation">
				<div className="navigation-header style4">
					<span>{this.props.navigationName}</span>
					{(this.props.links.length < this.props.maxLength) ?
            <a className="navigation-add-link pull-right" onClick={this.onClickNew}>+ item</a>
            :
            <OverlayTrigger placement="right" overlay={tooltip}>
              <Glyphicon glyph="info-sign" className="pull-right" />
            </OverlayTrigger>
          }
				</div>
				<div className="navigation-link">
          {
            (this.props.links.length) ?
            <LinkList
              links={this.props.links}
              handleUpdate={this.props.handleLinkUpdate}
              handleDelete={this.props.handleLinkDelete}
            />
            :
            <p>No links added to this navigation</p>
          }
				</div>

			</div>
		);
	}
}
