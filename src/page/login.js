import React from 'react';
import '../css/Login.css';
import { toast } from 'react-toastify';
import ApiEndpoint from '../API/endpoints';
import restClient from '../API/restClient';
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const { userName, password } = values;
        this.loginClick(userName, password);
      }
    });
  }

  loginClick(username, password) {
    restClient.request("post", ApiEndpoint.login, { body: { user: { username: username, password: password } } }, null)
      .then(
        (result) => {
          let userdata = result.data;
          sessionStorage.setItem("session", JSON.stringify(userdata));
          toast.success("login succesfull", {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
          });
          this.props.loginClick();
        },
        (result) => {
          let title = result.response.data.error.title;
          let message = result.response.data.error.message;
          this.setState({ serverError: true, formErrors: { server: message } });
          toast.error("login failed " + title, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 1000
          });
        }
      );

  }


  render() {
    const { getFieldDecorator } = this.props.form;

    return <div className="container-flow">
      <h3>login</h3>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="/">Forgot password</a>
          <Button onClick={this.handleSubmit} type="primary" >
            Log in
          </Button>

        </Form.Item>
      </Form>
    </div>



  }
}
const WrappedNormalLoginForm = Form.create({ name: 'loginForm' })(Login);
export default WrappedNormalLoginForm;

