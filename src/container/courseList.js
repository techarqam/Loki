import React, { Component } from 'react';
import CourseListItem from '../components/courseListItem';
import { List } from 'antd';
import '../css/CourseList.css';

class courseList extends Component {

  componentDidMount() {

  }

  render() {
    const { items, select, leadsCount, categoryList } = this.props;


    let increment = 100 / (categoryList.length - 1);
    let leadScoreMap = {};


    leadsCount.map(item => {
      let courseId = item._id;
      let score = item.score;
      let categoryMark = {};
      if (score)
        categoryList.map((l) => {
          categoryMark[l.name] = score.filter(i => { return (i >= l.order * increment && i < (l.order + 1) * increment) }).length;

        })
      leadScoreMap[courseId] = categoryMark;
    })


    return (
      <List
        size="large"
        header={<div> </div>}
        footer={<div> </div>}
        bordered={false}
        dataSource={items}
        renderItem={item => (<List.Item> <CourseListItem leadsCount={leadScoreMap[item._id]} select={select} item={item} ></CourseListItem> </List.Item>)}
      />
    );
  }
}

export default courseList;
