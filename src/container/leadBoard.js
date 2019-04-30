import React, { Component } from 'react';
import LeadColumn from '../components/leadColumn';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { List } from 'antd';

class LeadBoard extends Component {


  cardDroped = (sourceId, targateId) => {
    let itemscopy = [...this.props.items];
    let sourceIdx = itemscopy.findIndex((e) => { return e._id === sourceId });
    let targetIdx = itemscopy.findIndex((e) => { return e._id === targateId });
    itemscopy[sourceIdx].stage = itemscopy[targetIdx].stage;
    let copiedIteam = { ...itemscopy[sourceIdx] }
    itemscopy.splice(sourceIdx, 1);
    itemscopy.splice(targetIdx, 0, copiedIteam);
    this.props.updateItems(itemscopy);
  }



  render() {
    const { items, stages, selected, cardSelect } = this.props;
    return (
      <div className='leadboard' >
        <List
          size="large"
          grid={{
            gutter: 10, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
          }}
          bordered={false}
          dataSource={stages}
          renderItem={stage => (<List.Item>
            <LeadColumn selected={selected} cardSelect={cardSelect} cardDroped={this.cardDroped} stage={stage} items={items && items.filter(e => { return (e.stage._id === stage._id) })} ></LeadColumn>
          </List.Item>)}
        >
        </List>
      </div>
    );
  }
}
export default DragDropContext(HTML5Backend)(LeadBoard) 
