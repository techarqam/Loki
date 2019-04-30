import React, { Component } from 'react';
import ApiEndpoint from '../API/endpoints';
import restClient from '../API/restClient';
import { Icon, Button, Input, Form } from 'antd';
import { toast } from 'react-toastify';

class resetPassword extends Component {

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        error: {}
    };

    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let user = {
                    userName: values.username,
                    newPassword: values.password
                };
                restClient.request("post", ApiEndpoint.resetPassword, { user: user, }, null)
                    .then((result) => {
                        toast.success("password reset", {
                            position: toast.POSITION.TOP_CENTER,
                            autoClose: 1000
                        });
                    },
                        (error) => {
                            this.setState({ error });
                            toast.error("password reset failed " + error.title, {
                                position: toast.POSITION.TOP_CENTER,
                                autoClose: 1000
                            });
                        }
                    )

            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    render() {
        let session = JSON.parse(sessionStorage.getItem("session"));

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 16 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 16,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        return <div >
            <Form onSubmit={this.handleSubmit} className="login-form">
                {
                    session ? <div> </div> : <Form.Item {...formItemLayout} label="Username" >
                        {getFieldDecorator('username', {})(<Input type="username" prefix={<Icon type="user" />} />)}
                    </Form.Item>
                }

                <Form.Item {...formItemLayout}
                    label="Password"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: 'Please input your password!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </Form.Item>
                <Form.Item {...formItemLayout}
                    label="Confirm"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: 'Please confirm your password!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" onBlur={this.handleConfirmBlur} />
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout} >

                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Reset Password
                  </Button>

                </Form.Item>
            </Form>

        </div>
    }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(resetPassword);

export default WrappedRegistrationForm;
