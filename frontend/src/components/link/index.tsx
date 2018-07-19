import * as React from 'react';
import {
	ControlLabel,
	Dropdown,
	FormControl,
	FormGroup,
	MenuItem,
} from 'react-bootstrap';

import arrowLeftSvg from '../../images/arrow-left.svg';
import editSvg from '../../images/edit.svg';
import optionsSvg from '../../images/options.svg';
import trashSvg from '../../images/trash.svg';

import './style.css';

interface IProps {
	id: string;
	title?: string | undefined;
	navigationName: string;
	linkUrl?: string | undefined;
	imageUrl?: string | undefined;
	order: number;
	canHaveImage: boolean;
	handleDelete(): void;
	handleSave(): void;
}

interface IState {
	isEditing: boolean;
	title?: string | undefined;
	linkUrl?: string | undefined;
	imageUrl?: string | undefined;
}

export class Link extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.handleEdit = this.handleEdit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.state = {
			imageUrl: this.props.imageUrl,
			isEditing: false,
			linkUrl: this.props.linkUrl,
			title: this.props.title,
		};
	}


	public handleEdit() {
		this.setState({
			isEditing: !this.state.isEditing,
		});
	}

	public handleChange(event: any) {
		const changedInfo:any = [];
		changedInfo[event.target.name] = event.target.value;
		// tslint:disable-next-line
		console.log(changedInfo);
		this.setState(changedInfo);
		this.props.handleSave();
	}

	public render() {
		return (
			<div className="link">
				<div className={`link-display ${(this.state.isEditing) ? 'hidden' : ''}`}>
					<span className="link_title style3">{this.state.title}</span>
					<Dropdown id={`link-submenu-${this.props.id}`} className="link-menu" pullRight={true}>
					    <Dropdown.Toggle noCaret={true}>
					      <img src={optionsSvg} alt="Link Menu"/>
					    </Dropdown.Toggle>
					    <Dropdown.Menu>
							<MenuItem eventKey="1" className="style5" onClick={this.handleEdit}>
								<img src={editSvg} alt="Edit Link" />Edit
							</MenuItem>
							<MenuItem eventKey="2" className="style5" onClick={this.props.handleDelete}>
								<img src={trashSvg} alt="Remove Link" />Remove
							</MenuItem>
					    </Dropdown.Menu>
					  </Dropdown>
				</div>
				<div className={`link-edit ${(this.state.isEditing) ? '' : 'hidden'}`}>
					<a className="link-edit-back" onClick={this.handleEdit}>
						<img src={arrowLeftSvg} alt="Back" />
					</a>
					<form className="link-edit-form"
					 onChange={this.handleChange}>
						<FormGroup>
							<ControlLabel>Link Title</ControlLabel>
							<FormControl
								name="title"
								type="text"
								value={this.state.title}
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Link URL</ControlLabel>
							<FormControl
								name="linkUrl"
								type="text"
								value={this.state.linkUrl}
							/>
						</FormGroup>
						{this.props.canHaveImage && (
							<FormGroup>
								<ControlLabel>Link Image</ControlLabel>
								<FormControl
									name="imageUrl"
									type="text"
									value={this.state.imageUrl}
								/>
							</FormGroup>
						)}
					</form>
				</div>
			</div>
		);
	}
}
