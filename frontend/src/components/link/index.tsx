import * as React from 'react';
import { Dropdown, MenuItem } from 'react-bootstrap';

import editSvg from '../../images/edit.svg';
import optionsSvg from '../../images/options.svg';
import trashSvg from '../../images/trash.svg';

import './style.css';

interface Iprops {
	id: string;
	title: string;
	navigation_name: string;
	link_url: string;
	image_url?: string;
	order: number;
}

interface Istate {
	isEditing: boolean;
	isMenuShown: boolean;
}

export class Link extends React.Component<Iprops, Istate> {
	constructor(props: Iprops) {
		super(props);

		this.state = {
			isEditing: false,
			isMenuShown: false,
		};
	}

	public render() {
		return (
			<div className="link">
				<span className="link_title style3">{this.props.title}</span>
				<Dropdown id={`link-submenu-${this.props.id}`} className="link-menu" pullRight={true}>
				    <Dropdown.Toggle noCaret={true}>
				      <img src={optionsSvg} alt="Link Menu"/>
				    </Dropdown.Toggle>
				    <Dropdown.Menu>
						<MenuItem eventKey="1" className="style5">
							<img src={editSvg} alt="Edit Link" />Edit
						</MenuItem>
						<MenuItem eventKey="2" className="style5">
							<img src={trashSvg} alt="Remove Link" />Remove
						</MenuItem>
				    </Dropdown.Menu>
				  </Dropdown>
			</div>
		);
	}
}
