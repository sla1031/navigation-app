import * as React from 'react';
import { Glyphicon, OverlayTrigger, Tooltip } from 'react-bootstrap';

import { ILinkComponent, INavigationType } from '../../types';
import { LinkList } from '../link';

import './style.css';

interface Iprops {
  id: string;
  navigationTypeName: string;
  links: ILinkComponent[];
	allNavigationTypes: INavigationType[];
  navigationType: INavigationType;
	handleNewLink(): void;
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
}



export class Navigation extends React.Component<Iprops, any> {
	public testsave() {
    // tslint:disable-next-line
    console.log('save');
  }

	public onClickNew(event: any) {
		this.props.handleNewLink();
	}

	public render() {
    const { maxLength, minLength } = this.props.navigationType;
    const tooltip = (
      <Tooltip>
        This navigation type can only hold {maxLength} link{(maxLength > 1) ? 's' : ''}
      </Tooltip>
    );

    // tslint:disable-next-line
    console.log(`length ${this.props.links.length} min ${minLength}`);

		return (
			<div className="navigation">
				<div className="navigation-header style4">
					<span>Navigation</span>
					{(this.props.links.length < maxLength) ?
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
