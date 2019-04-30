import React from 'react';
import {
  Form, Input, Tooltip, Icon, Select, Button, DatePicker, Divider
} from 'antd';
const { Option } = Select;

class ContactForm extends React.Component {
  render() {
    const { getFieldDecorator, contactData } = this.props;
    return (
      <div  >
        <Divider>personal info</Divider>
        <Form.Item
          label={(
            <span>
              Title&nbsp;
            </span>
          )}
        >
          {getFieldDecorator('title', { initialValue: contactData ? contactData.title : null })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="First name"
        >
          {getFieldDecorator('firstName', { initialValue: contactData ? contactData.firstName : null }, {
            rules: [{
              required: true, message: 'Please input first name!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Last name"
        >
          {getFieldDecorator('lastName', { initialValue: contactData ? contactData.lastName : null })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Gender"
        >
          {getFieldDecorator('gender', { initialValue: contactData ? contactData.gender : null })(
            <Select style={{ width: 200 }} placeholder="Please select gender">
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="other">other</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Date of birth"
        >
          {getFieldDecorator('dob')(
            <DatePicker />
          )}
        </Form.Item>

        <Divider>contact info</Divider>
        <Form.Item
          label="Mobile"
        >
          {getFieldDecorator('mobile', { initialValue: contactData ? contactData.mobile : null }, {
            rules: [{ required: true, message: 'Please input  mobile number!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="E-mail"
        >
          {getFieldDecorator('email', { initialValue: contactData ? contactData.email : null }, {
            rules: [{
              type: 'email', message: 'The input is not valid E-mail!',
            }, {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Divider>Address</Divider>
        <Form.Item
          label="Country"
        >
          {getFieldDecorator('country', { initialValue: contactData ? contactData.country : null }, {
            rules: [{
              required: true, message: 'Please input country!',
            }],
          })(
            <Input style={{ width: 200 }} />
          )}
        </Form.Item>
        <Form.Item
          label="City"
        >
          {getFieldDecorator('city', { initialValue: contactData ? contactData.city : null }, {
            rules: [{
              required: true, message: 'Please input city!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Zipcode"
        >
          {getFieldDecorator('zipcode', { initialValue: contactData ? contactData.zipcode : null }, {
            rules: [{
              required: true, message: 'Please input zipcode!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Address line 1"
        >
          {getFieldDecorator('addressLine1', { initialValue: contactData ? contactData.addressLine1 : null })(
            <Input style={{ width: 400 }} />
          )}
        </Form.Item>
        <Form.Item
          label="Address line 2"
        >
          {getFieldDecorator('addressLine2', { initialValue: contactData ? contactData.addressLine2 : null })(
            <Input style={{ width: 400 }} />
          )}
        </Form.Item>
      </div>
    );
  }
}
export default ContactForm;

