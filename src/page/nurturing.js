import React, { Component } from 'react';
import LeadBoard from '../container/leadBoard';
import CourseList from '../container/courseList';
import ApiEndpoint from '../API/endpoints';
import restClient from '../API/restClient';
import '../css/Nurturing.css';
import { Menu, Dropdown, Icon, Button, Drawer } from 'antd';
import Form from '../container/leadForm';
const ButtonGroup = Button.Group;

class Nurturing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      leadList: [],
      courselist: [],
      stageList: [],
      categoryList: [],
      leadsCount: [],
      selectedCourse: null,
      selected: [],
      cities: [],
      selCity: null,
    };


  }

  componentDidMount() {
    let session = JSON.parse(sessionStorage.getItem("session"));
    restClient.request("get", ApiEndpoint.courseList, session ? { sort: "goal", coordinator: session.user._id } : null, { key: 'cources', expireAt: new Date() })
      .then((result) => { this.setState({ courselist: result.data }); },
        (error) => { this.setState({ error }); }
      )

    restClient.request("get", ApiEndpoint.stageList, null, { key: 'stages', expireAt: new Date() })
      .then((result) => { this.setState({ stageList: result.data }); },
        (error) => { this.setState({ error }); }
      )

    restClient.request("get", ApiEndpoint.leadsCount, { action: 'getLeadsAggregateCourse' }, { key: 'leadsCount', expireAt: new Date() })
      .then((result) => { this.setState({ leadsCount: result.data }); },
        (error) => { this.setState({ error }); }
      )

    restClient.request("get", ApiEndpoint.categoryList, null, { key: 'categoryList', expireAt: new Date() })
      .then((result) => { this.setState({ categoryList: result.data }); },
        (error) => { this.setState({ error }); }
      )

  }

  selectCourse = (selectedCourse) => {
    this.setState({ selectedCourse: selectedCourse });
    restClient.request("get", ApiEndpoint.leadList, { sort: "order", courses: selectedCourse._id }, { key: 'leads', expireAt: new Date() })
      .then((result) => { this.setState({ leadList: result.data }); },
        (error) => { this.setState({ error }); }
      )

  }

  getCities() {

    let tempCities = this.state.leadList;


    console.log(this.cities)
  }



  updateItems = (item) => {
    this.setState({ leadList: item });
  }

  cardSelect = (leadId) => {

    let idx = this.state.selected.findIndex(id => { return id === leadId })
    if (idx === -1)
      this.setState({ selected: [...this.state.selected, leadId] })
    else
      this.setState({ selected: [...this.state.selected.slice(0, idx), ...this.state.selected.slice(idx + 1)] })
  }

  showAddForm = () => {
    this.setState({
      showAddForm: true,
      isNew: true
    });
  }

  showEditForm = () => {
    this.setState({
      showAddForm: true,
      isNew: false
    });
  }

  hideAddForm = () => {
    this.setState({
      showAddForm: false
    });
  };

  onSave = (result) => {
    this.hideAddForm();
    this.selectCourse(this.state.selectedCourse);

  }

  render() {
    const { error, stageList, leadList, courselist, selCity, cities, selectedCourse, leadsCount, categoryList } = this.state;

    this.cities = leadList.map((course) => {
      let tempObj = course.contact;
      // console.log(tempObj.city)
      return tempObj.city;
    })
    // console.log(this.cities)



    const courseMenu = (
      <Menu onClick={(menu) => {
        let selected = courselist.filter((course) => { return course._id === menu.key });
        this.selectCourse(selected[0]);
      }} >
        {
          courselist.map((course) => {
            return <Menu.Item key={course._id} >
              {course.name}
            </Menu.Item>
          })
        }
      </Menu>
    );


    const citiesList = (
      <Menu onClick={(menu) => {
        let tempSelCity = this.cities.filter((course) => { return course === menu.key });
        console.log(this.tempSelCity)
        // this.selCity =tempSelCity;

      }} >
        {
          this.cities.map((course) => {
            return <Menu.Item key={course} >
              {course}
            </Menu.Item>
          })
        }
      </Menu>
    );

    let isMultiselected = this.state.selected.length > 0 ? true : false;
    let isSingleSelected = this.state.selected.length === 1 ? true : false;
    return (
      <div>
        <h3>nurturing</h3>
        <Drawer
          title="Add new candidate"
          width={720}
          onClose={this.hideAddForm}
          visible={this.state.showAddForm}
        >
          <Form leadData={!this.state.isNew ? leadList.find(item => { return item._id === this.state.selected[0] }) : null} courselist={courselist} stageList={stageList} categoryList={categoryList} selectedCourse={selectedCourse} onSave={this.onSave}   ></Form>
        </Drawer>
        <Dropdown overlay={courseMenu}>
          <div className="courseSelector" >   {selectedCourse ? selectedCourse.name : "select course"}      <Icon type="down" /> </div>
        </Dropdown>
        {selectedCourse ? <div><ButtonGroup className='commandbar' >
          <Button onClick={this.showAddForm} className='command' ><Icon type="plus" /> Add    </Button>
          <Button className='command' > <Icon type="export" /> Export </Button>
          {isSingleSelected ? <Button onClick={this.showEditForm} className='command' > <Icon type="edit" /> Edit </Button> : null}
          {isMultiselected ? <Button className='command' > <Icon type="delete" /> Delete </Button> : null}
          {isMultiselected ? <Button className='command' ><Icon type="solution" /> Run campaign </Button> : null}

          <Dropdown overlay={citiesList}>
            <div className="citySelector" >   {selCity ? selCity : "select course"}         <Icon type="down" /> </div>
          </Dropdown>

        </ButtonGroup>
          <LeadBoard stages={stageList} items={leadList} updateItems={this.updateItems} cardSelect={this.cardSelect} selected={this.state.selected} >
          </LeadBoard>
        </div> :
          <CourseList select={this.selectCourse} leadsCount={leadsCount} categoryList={categoryList} items={courselist} >
          </CourseList>}
      </div>
    );
  }
}

export default Nurturing;
