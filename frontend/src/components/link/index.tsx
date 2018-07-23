import * as React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';

import { ILinkComponent, ILinkPatch } from '../../types';
import { Link } from './linkSingle';

interface IProps {
  canDeleteLinks: boolean;
	links: ILinkComponent[];
  id: string;
  handleDelete(linkId: string): void;
  handleReSort(link: ILinkPatch): void;
  handleUpdate(link: ILinkPatch): void;
}

interface IState {
  links: ILinkComponent[];
}

export class LinkList extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);

    this.state = {
      links: this.props.links,
    }
  }
  public shouldComponentUpdate(nextProps: IProps) {
    if (this.props.links !== nextProps.links) {
      this.setState({
        links: nextProps.links,
      });
    }
    return true;
  }

  public reorder(list: ILinkComponent[], start: number, end: number) {
    const result = [
      ...list,
    ];
    const [ removed ] = result.splice(start, 1);
    result.splice(end, 0, removed);
    return result;
  }

  public onDragEnd(res: DropResult) {
    if(!res.destination || res.destination.index === res.source.index) {
      return;
    }

    const links = this.reorder(this.state.links, res.source.index, res.destination.index + 1);
    this.setState({
      links,
    });
    this.props.handleReSort({
      id: res.draggableId,
      sort: (res.destination.index !== 0) ? res.destination.index + 1 : 1,
    });

  }

  public render(){
	  return (
      <div className="link-lists">
    		<DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={`droppable-${this.props.id}`}>
            {(dropProvided: DroppableProvided, dropSnapshot: DroppableStateSnapshot) => {
              return (
                <div
                  ref={dropProvided.innerRef}
                  className={(dropSnapshot.isDraggingOver) ? 'drop-active' : ''}
                >
        			   {this.state.links.map((link, index) => {
        				    return (
                      <Link
                        dragIndex={index}
                        key={link.id}
                        {...link}
                        canDeleteLink={this.props.canDeleteLinks}
                      	handleDelete={this.props.handleDelete}
                        handleUpdate={this.props.handleUpdate}
            					/>
        			      );
        			    })}
                </div>
              );
            }}
          </Droppable>
    		</DragDropContext>
      </div>
  	);
  }
}
