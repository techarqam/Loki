import React, { Component } from 'react';
import ApiEndpoint from '../API/endpoints';
import restClient from '../API/restClient';
import { Icon, Tabs, Timeline, Button, Input, Form } from 'antd';
import '../css/Setting.css';

const TabPane = Tabs.TabPane;

class profileCard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            currentUser: { contact: {} },
            activity: [],
            editMode: false,
            editProfile: { contact: {} },
            resetPass: this.props.location.search === "?resetpass"
        };
        this.edit = this.edit.bind(this);
        this.editInputChange = this.editInputChange.bind(this);
    }

    async edit() {
        await this.setState({ editMode: !this.state.editMode });

        if (!this.state.editMode) {
            restClient.request("post", ApiEndpoint.user, { body: { user: this.state.editProfile } }, { key: 'user', expireAt: new Date() })
                .then((result) => { this.setState({ currentUser: result.data.user, editProfile: result.data.user }); },
                    (error) => { this.setState({ error }); }
                );
        }
    }

    editInputChange(e, key) {
        let copy = { ...this.state.editProfile };
        copy.contact = { ...this.state.editProfile.contact }
        if (this.state.editProfile[key]) {
            copy[key] = e.target.value;
        }
        else {
            copy.contact[key] = e.target.value;
        }
        this.setState({ editProfile: copy });
    }

    getEditControl(key, showKey, icon) {
        return <Input
            className="editControl"
            placeholder={`Enter your ${key}`}
            value={this.state.editProfile[key] ? this.state.editProfile[key] : this.state.editProfile.contact[key]}
            prefix={icon ? <Icon type={icon} style={{ color: 'rgba(0,0,0,.25)' }} /> : <Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { this.editInputChange(e, key) }}
        />

    }

    componentDidMount() {
        let session = JSON.parse(sessionStorage.getItem("session"));

        restClient.request("get", ApiEndpoint.user, null, { key: 'user', expireAt: new Date() })
            .then((result) => { this.setState({ currentUser: result.data.user, editProfile: result.data.user }); },
                (error) => { this.setState({ error }); }
            );

        restClient.request("get", ApiEndpoint.activity, { user: session.user._id }, { key: 'user', expireAt: new Date() })
            .then((result) => { this.setState({ activity: result.data }); },
                (error) => { this.setState({ error }); }
            )
    }

    render() {
        let activity = this.state.activity.map(element => {
            return <Timeline.Item id={element._id} >{element.content}</Timeline.Item>
        });
        return (
            <div className="container">
                <form >
                    <div className="row">
                        <div className="col">
                            <div className="setting-head">
                                <h5>
                                    {`${this.state.currentUser.contact.firstName} ${this.state.currentUser.contact.lastName}`}
                                </h5>
                                <h6>
                                    {this.state.currentUser.contact.title}
                                </h6>

                                <Tabs defaultActiveKey="1" onChange={this.callback}>
                                    <TabPane tab="Information" key="1">
                                        <div className="tab-content setting-tab" id="myTabContent">
                                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                                <div className="row">
                                                    <div className="col">
                                                        <label>User Id</label>
                                                    </div>
                                                    <div className="col">
                                                        {
                                                            this.state.editMode ? this.getEditControl("username", false, "user") : <p>{this.state.currentUser.username} </p>
                                                        }


                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Name</label>
                                                    </div>
                                                    <div className="col ">
                                                        {
                                                            this.state.editMode ? (<div> {this.getEditControl("firstName", true)} {this.getEditControl("lastName", true)} </div>) : <p> {`${this.state.currentUser.contact.firstName} ${this.state.currentUser.contact.lastName}`}</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Email</label>
                                                    </div>
                                                    <div className="col ">
                                                        {
                                                            this.state.editMode ? this.getEditControl("email", false, "mail") : <p>{this.state.currentUser.contact.email} </p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Phone</label>
                                                    </div>
                                                    <div className="col ">
                                                        {
                                                            this.state.editMode ? this.getEditControl("mobile", false, "phone") : <p>{this.state.currentUser.contact.mobile} </p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <label>Address</label>
                                                    </div>
                                                    <div className="col">

                                                        {
                                                            this.state.editMode ? (
                                                                <div>
                                                                    {this.getEditControl("addressLine2", true)}
                                                                    {this.getEditControl("addressLine1", true)}
                                                                    {this.getEditControl("city", true)}
                                                                    {this.getEditControl("zipCode", true)}
                                                                </div>) : <p>{`${this.state.currentUser.contact.addressLine2}, 
                                                    ${this.state.currentUser.contact.addressLine1},
                                                    ${this.state.currentUser.contact.city},
                                                    ${this.state.currentUser.contact.zipCode}
                                                    `}</p>
                                                        }
                                                    </div>
                                                </div>

                                            </div>

                                        </div>
                                    </TabPane>
                                    <TabPane tab="Roles and responsibility" key="2">

                                        <div className="tab-content row col">

                                            {
                                                this.state.editMode ? this.getEditControl("extra") : <p>{`${this.state.currentUser.contact.extra} `}</p>
                                            }
                                        </div>

                                    </TabPane>
                                    <TabPane tab="Activity" key="3">
                                        <div className="tab-content row col">
                                            <Timeline>
                                                {
                                                    activity
                                                }
                                            </Timeline>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <Button onClick={() => this.edit()} type="primary" > {!this.state.editMode ? "edit" : "save"}</Button>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

export default profileCard;
