import * as React from 'react';
import {
  Collapse,
  Glyphicon,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
// tslint:disable-next-line
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import { ILinkComponent, INavigationDB, INavigationType } from '../../types';
import { LinkList } from '../link';

import descendSvg from '../../images/descend.svg';
import './style.css';

interface Iprops {
  id: string;
  navigationTypeName: string;
  links: ILinkComponent[];
	allNavigationTypes: INavigationType[];
  navigationType: INavigationType;
	handleLinkNew(navigationId: string): void;
  handleLinkUpdate(link: ILinkComponent): void;
  handleLinkDelete(linkId: string): void;
  handleNavigationUpdate(navigation: INavigationDB): void;
}

interface Istate {
  navigationOpen: boolean;
}



export class Navigation extends React.Component<Iprops, Istate> {
  constructor(props: Iprops) {
    super(props);
    this.onClickNew = this.onClickNew.bind(this);
    this.onNavigationSlideClick = this.onNavigationSlideClick.bind(this);
    this.onChangeNavigationType = this.onChangeNavigationType.bind(this);
    this.state = {
      navigationOpen: false,
    };
  }

	public onClickNew() {
		this.props.handleLinkNew(this.props.id);
	}

  public onNavigationSlideClick() {
    this.setState({
      navigationOpen: !this.state.navigationOpen,
    });
  }

  public onChangeNavigationType(event: {key: string, label: string, value: string}) {
    if(event.key === this.props.navigationTypeName) {
      return;
    }
    this.props.handleNavigationUpdate({
      id: this.props.id,
      navigationType: event.key,
    });
  }

  public selectArrow(){
    return (
  		<img src={descendSvg} alt="Select Navigation Type" />
  	);
  }

	public render() {
    const { maxLength, minLength } = this.props.navigationType;
    const numberLinks = this.props.links.length;

    // tslint:disable-next-line
    console.log(`numberLinks ${numberLinks} minLength ${minLength} maxLength ${maxLength}`);

    const minAlert = numberLinks - 1 < minLength && numberLinks !== 1;
    const maxAlert = numberLinks + 1 > maxLength;
    const tooltipAlert = (
      <Tooltip id={`tooltip-navigation-alert-${this.props.id}`}>
        {minAlert && <p>This navigation has the minimum number of links</p>}
        {maxAlert && <p>This navigation has the maximum number of links</p>}
      </Tooltip>
    );

    const minError = numberLinks < minLength;
    const maxError = numberLinks > maxLength;
    const tooltipError= (
      <Tooltip id={`tooltip-navigation-error-${this.props.id}`}>
        {minError && <p>This navigation is below the number of required links</p>}
        {maxError && <p>This navigation is above the number of allowed links</p>}
      </Tooltip>
    );

		return (
			<div className="navigation">

				<div className="navigation-header style4">
					<span onClick={this.onNavigationSlideClick} className="navigation-type-menu-toggle">
            Navigation
            <img
              src={descendSvg}
              alt="Open Navigation Type Menu"
              className={`${(this.state.navigationOpen) ? 'open' : 'closed'}`}
            />
          </span>
					{(this.props.links.length < maxLength && !this.state.navigationOpen) &&
            <a className="navigation-add-link pull-right" onClick={this.onClickNew}>+ item</a>
          }
				</div>
        <Collapse in={this.state.navigationOpen}>
          <div className="navigation-type-form">
            <p>Navigation Type</p>
            <Select
              className="navigation-type-select"
              multi={false}
              clearable={false}
              searchable={false}
              arrowRenderer={this.selectArrow}
              value={this.props.navigationTypeName}
              onChange={this.onChangeNavigationType}
              options={this.props.allNavigationTypes.map((navType) => {
                return {
                  key: navType.name,
                  label: navType.name,
                  value: navType.name,
                }
              })}
            />
          </div>
        </Collapse>
        <Collapse in={!this.state.navigationOpen}>
          <div>
    				<div className="navigation-link">
              {
                (this.props.links.length) ?
                <LinkList
                  links={this.props.links}
                  handleUpdate={this.props.handleLinkUpdate}
                  handleDelete={this.props.handleLinkDelete}
                  canDeleteLinks={!minAlert}
                />
                :
                <p>No links added to this navigation</p>
              }
    				</div>
            {
              ((minAlert || maxAlert) && !(minError || maxError)) && <OverlayTrigger placement="right" overlay={tooltipAlert}>
                <div className="navigation-alert">
                  <Glyphicon glyph="info-sign"/>
                </div>
              </OverlayTrigger>
            }
            {
              (minError || maxError) && <OverlayTrigger placement="right" overlay={tooltipError}>
                <div className="navigation-alert">
                  <Glyphicon glyph="exclamation-sign"/>
                </div>
              </OverlayTrigger>
            }
          </div>
        </Collapse>
			</div>
		);
	}
}
