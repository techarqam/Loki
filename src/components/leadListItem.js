import React, { Component } from 'react';
import { ItemTypes } from '../constants/typeConstants';
import { DragSource, DropTarget } from 'react-dnd';
const classNames = require('classnames');

const cardSource = {
  beginDrag(props) {
    return props.item;
  }
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


const cardTarget = {
  drop(props, monitor, component) {

    const item = monitor.getItem();

    // You can do something with it
    props.cardDroped(item._id, props.item._id);

    // You can also do nothing and return a drop result,
    // which will be available as monitor.getDropResult()
    // in the drag source's endDrag() method
    return { moved: true };
  }
};

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    dropedItem: monitor.getItem(),

  };
}

class LeadListItem extends Component {
  render() {
    const { item, isDragging, connectDragSource, connectDropTarget, isOver, cardSelect, selected } = this.props;
    const { firstName, lastName,city,gender } = item.contact;
    let isSelected = selected.findIndex((select) => { return select === item._id }) !== -1;
    let cardClass = classNames({
      'candidate-card': true,
      'selected-card': isSelected,
      'isOver-card': isOver,
      'dragged-card': isDragging
    });

    return (
      connectDropTarget(connectDragSource(
        <div onClick={() => { cardSelect(item._id) }} className={cardClass}  >
          <h5> {firstName} </h5>
          <p> {lastName} </p>
          <p> {city} </p>
          <p> {gender} </p>

        </div>
      )
      ));
  }
}
export default DropTarget(ItemTypes.CARD, cardTarget, dropCollect)(
  DragSource(ItemTypes.CARD, cardSource, dragCollect)(LeadListItem)
);
