import React, { Component } from 'react';
import LeadListItem from './leadListItem';
import { List } from 'antd';

class LeadColumn extends Component {

  render() {
    const { items, stage, cardSelect,displayLead, cardDroped, selected } = this.props;

    return (
      <List
        size="large"
        header={<h4>{stage.name}</h4>}
        bordered={false}
        dataSource={items}
        renderItem={item => (<List.Item>  <LeadListItem selected={selected} displayLead={displayLead} cardSelect={cardSelect} cardDroped={cardDroped} item={item} ></LeadListItem> </List.Item>)}
      >
      </List>
    );
  }
}
export default LeadColumn;
