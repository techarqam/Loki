import React from 'react';
import ApiEndpoint from '../API/endpoints';
import restClient from '../API/restClient';
import {
  Form, Input, Tooltip, Icon, Select, Button, Tag, Slider
} from 'antd';
import ContactForm from './contactForm'
const { Option } = Select;
const { TextArea } = Input;
class CandidateForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    tags: [],
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { firstName, lastName, title, email, gender, dob, mobile, city, zipCode, addressLine1, addressLine2 } = values;
        const { leadId, notes, courses, stage, score } = values;
        const { tags } = this.state;

        let contact = { firstName, lastName, title, email, gender, dob, mobile, city, zipCode, addressLine1, addressLine2 };
        let postPoject = { leadId, notes, tags, courses, stage, score, contact };
        if (this.props.leadData) {
          contact['_id'] = this.props.leadData.contact._id;
          postPoject['_id'] = this.props.leadData._id;
        }

        restClient.request(this.props.leadData ? "post" : "put", ApiEndpoint.leadList, { body: postPoject, query: { 'update': 1 } }, null)
          .then((result) => { this.onSave(result) },
            (error) => { this.setState({ error }); }
          );

      }
    });
  }

  onSave = (result) => {
    this.props.onSave(result.data);
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tags, inputVisible, inputValue } = this.state;
    const { courselist, stageList, selectedCourse, categoryList, leadData } = this.props;

    let courseOption = courselist.map((item) => {
      return <Option value={item._id}>{item.name}</Option>
    })

    let stageOption = stageList.map((item) => {
      return <Option value={item._id}>{item.name}</Option>
    })
    let mark = 0;
    let increment = 100 / (categoryList.length - 1);
    let categoryMark = {}
    categoryList.map((item) => {
      categoryMark[mark] = item.name;
      mark = mark + increment;
    })

    const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 36 },
        sm: { span: 16 },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit} >
        <Form.Item
          label="Id"
        >
          {getFieldDecorator('leadId', { initialValue: leadData ? leadData.leadId : null })(
            <Input />
          )}
        </Form.Item>

        <Form.Item
          label="courses"
        >
          {getFieldDecorator('courses', {
            initialValue: leadData ? leadData.courses.map((item) => { return item._id }) : [selectedCourse._id],
            rules: [
              { required: true, message: 'Please select course', type: 'array' },
            ],
          })(
            <Select
              mode="multiple"
              showSearch
              style={{ width: 200 }}
              placeholder="Select course intersted in"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {courseOption}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Stage"
        >
          {getFieldDecorator('stage', { initialValue: leadData ? leadData.stage._id : stageList[0]._id })(
            <Select
              style={{ width: 200 }}
              placeholder="Select stage"
              optionFilterProp="children"
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {stageOption}
            </Select>
          )}
        </Form.Item>
        <Form.Item
          label="Score"
        >
          {getFieldDecorator('score', { initialValue: leadData ? leadData.score : 0 })(
            <Slider style={{ width: 300 }} marks={categoryMark}
            />
          )}
        </Form.Item>

        <Form.Item
          label="Tags"
        >
          {getFieldDecorator('tags', { initialValue: leadData ? leadData.tags : [] })(
            <div>
              {tags.map((tag, index) => {
                const isLongTag = tag.length > 20;
                const tagElem = (
                  <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
                    {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                  </Tag>
                );
                return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
              })}
              {inputVisible && (
                <Input
                  ref={this.saveInputRef}
                  type="text"
                  size="large"
                  value={inputValue}
                  onChange={this.handleInputChange}
                  onBlur={this.handleInputConfirm}
                  onPressEnter={this.handleInputConfirm}
                />
              )}
              {!inputVisible && (
                <Tag
                  onClick={this.showInput}
                  style={{ background: '#fff', borderStyle: 'dashed' }}
                >
                  <Icon type="plus" /> New Tag
           </Tag>
              )}
            </div>
          )}
        </Form.Item>

        <Form.Item
          label="Notes"
        >
          {getFieldDecorator('notes', { initialValue: leadData ? leadData.notes : null })(
            <TextArea style={{ width: 400 }} placeholder="Notes regarding candidate" autosize={{ minRows: 2, maxRows: 6 }} />
          )}
        </Form.Item>
        <ContactForm getFieldDecorator={getFieldDecorator} contactData={leadData ? leadData.contact : null} ></ContactForm>
        <Form.Item
          wrapperCol={{ span: 12, offset: 5 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>


    );
  }
}

const WrappedCandidateForm = Form.create({ name: 'register' })(CandidateForm);

export default WrappedCandidateForm;

