import * as React from 'react';
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import {
	ControlLabel,
	Dropdown,
	FormControl,
	FormGroup,
  HelpBlock,
	MenuItem,
} from 'react-bootstrap';

import { ILinkPatch } from '../../types';

import arrowLeftSvg from '../../images/arrow-left.svg';
import editSvg from '../../images/edit.svg';
import optionsSvg from '../../images/options.svg';
import trashSvg from '../../images/trash.svg';
import './style.css';

interface IProps {
	id: string;
	title: string;
	navigation: string;
	linkUrl: string;
	imageUrl?: string;
	sort: number;
	canHaveImage: boolean;
  canDeleteLink: boolean;
  dragIndex: number;
	handleDelete(linkId: string): void;
  handleUpdate(link: ILinkPatch): void;
}

interface IState {
  imageUrl?: string;
	isEditing: boolean;
	linkUrl: string;
  needsUpdating: boolean;
	title: string;
}

export class Link extends React.Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		this.onClickEdit = this.onClickEdit.bind(this);
		this.onChangeEdit = this.onChangeEdit.bind(this);
    this.onBlurEdit = this.onBlurEdit.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
		this.state = {
			imageUrl: (this.props.canHaveImage) ? this.props.imageUrl : undefined,
			isEditing: false,
			linkUrl: this.props.linkUrl,
      needsUpdating: false,
			title: this.props.title,
		};
	}

  public shouldComponentUpdate(nextProps: IProps) {
    if (nextProps !== this.props && !nextProps.canHaveImage) {
      this.setState({
        imageUrl: undefined,
      });
    }
    return true;
  }


	public onClickEdit() {
		this.setState({
			isEditing: !this.state.isEditing,
		});
	}

	public onChangeEdit(event: any) {
    if (this.state[event.target.name] === event.target.value) {
      return;
    }

  	const changedInfo:any = {
      needsUpdating: true,
    };
  	changedInfo[event.target.name] = (event.target.name === 'title') ? event.target.value.substr(0,45) : event.target.value;
		this.setState(changedInfo);
	}

  public onBlurEdit(event: any) {
    if(!this.state.needsUpdating) {
      return;
    }
    this.setState({
      needsUpdating: false,
    });
		this.props.handleUpdate({
      id: this.props.id,
      imageUrl: this.state.imageUrl,
      linkUrl: this.state.linkUrl,
      title: this.state.title,
    });
	}

  public onClickDelete() {
    if (!this.props.canDeleteLink) {
      return;
    }
    this.props.handleDelete(this.props.id);
  }

  public getTitleValidation() {
    if (this.state.title !== null) {
      const length = this.state.title.length;
      if (length >= 45) {
        return 'error';
      }
    }
    return null;
  }


	public render() {
		return (
      <Draggable
        key={this.props.id}
        draggableId={this.props.id}
        index={this.props.dragIndex}
        isDragDisabled={this.state.isEditing}
      >
      	{(dragProvided: DraggableProvided, dragSnapshot: DraggableStateSnapshot) => {
      		return (
      			<div
      				ref={dragProvided.innerRef}
      				{...dragProvided.draggableProps}
      				{...dragProvided.dragHandleProps}
      				style={dragProvided.draggableProps.style}
      				className={(dragSnapshot.isDragging) ? 'drag-active' : ''}
      			>
        			<div className={`link ${(this.state.isEditing) ? 'editing' : ''}`}>
        				<div className={`link-display ${(this.state.isEditing) ? 'hidden' : ''}`}>
        					<span className="link-title style5">{this.state.title || '(not set)'}</span>
        					<Dropdown id={`link-submenu-${this.props.id}`} className="link-menu" pullRight={true}>
        					    <Dropdown.Toggle noCaret={true}>
        					      <img src={optionsSvg} alt="Link Menu"/>
        					    </Dropdown.Toggle>
        					    <Dropdown.Menu>
        							<MenuItem eventKey="1" className="style5" onClick={this.onClickEdit}>
        								<img src={editSvg} alt="Edit Link" />Edit
        							</MenuItem>
        							<MenuItem eventKey="2" className="style5" onClick={this.onClickDelete}>
                        {(this.props.canDeleteLink) ?
                        <span> <img src={trashSvg} alt="Remove Link" />Remove</span>
                          :
                          <span>Unable to remove</span>
                        }
        							</MenuItem>
        					    </Dropdown.Menu>
        					  </Dropdown>
        				</div>
        				<div className={`link-edit ${(!this.state.isEditing) ? 'hidden' : ''}`}>
        					<a className="link-edit-back" onClick={this.onClickEdit}>
        						<img src={arrowLeftSvg} alt="Back" />
        					</a>
        					<form className="link-edit-form"
        					 onBlur={this.onBlurEdit} onChange={this.onChangeEdit}>
        						<FormGroup
                      validationState={this.getTitleValidation()}
                    >
        							<ControlLabel>Link Title</ControlLabel>
        							<FormControl
        								name="title"
        								type="text"
        								defaultValue={this.state.title || undefined}
        							/>
                      <FormControl.Feedback />
                      <HelpBlock>Title has a max length of 45 characters.</HelpBlock>
        						</FormGroup>
        						<FormGroup>
        							<ControlLabel>Link URL</ControlLabel>
        							<FormControl
        								name="linkUrl"
        								type="text"
        								defaultValue={this.state.linkUrl || undefined}
        							/>
        						</FormGroup>
        						{this.props.canHaveImage && (
        							<FormGroup>
        								<ControlLabel>Link Image</ControlLabel>
        								<FormControl
        									name="imageUrl"
        									type="text"
        									defaultValue={this.state.imageUrl || undefined}
        								/>
        							</FormGroup>
        						)}
        					</form>
        				</div>
      			  </div>
            </div>
          )
        }}
      </Draggable>
		);
	}
}
