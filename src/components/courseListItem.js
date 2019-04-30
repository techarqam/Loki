import React, { Component } from 'react';
import { Row, Col, Button, Divider } from 'antd';

class CourseListItem extends Component {
  render() {

    const { item, select, leadsCount } = this.props;
    return (
      <div>
        <div className="row" >
          <div className="col-md-4">
            <div className="course-header"    >
              <h3>{item.name}</h3>
              <p>start on {new Date(item.startDate).toLocaleDateString('en-US')}</p>
            </div>
          </div>
          <div className="col-md-2">
            <div className="course-goal"   >
              <h3>{item.goal}</h3>
              <p>Goal</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="course-lead-category"   >
              {
                leadsCount && Object.keys(leadsCount).map(element => {
                  return <div>
                    <h6>{element}</h6>
                    <p>{leadsCount[element]}</p>
                  </div>
                })
              }
            </div>
            <div className="course-action row"   >
              <Button onClick={() => select(item)} > view all candidates </Button>
            </div>
          </div>

        </div>

      </div>
    );
  }
}

export default CourseListItem;
