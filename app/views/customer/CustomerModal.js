/**
 * Created by eatong on 17-3-23.
 */
import React, {PropTypes, Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Modal, Form, Input, Row, Col, DatePicker} from 'antd';
import moment from 'moment';
const FormItem = Form.Item;
const baseLayout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

@inject('customer') @observer
class CustomerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  checkNumber = (event) => {
    this.props.customer.getCustomerByNumber({number: event.target.value});
  };

  saveCustomer = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.consumeDate = values.consumeDate.format('YYYY-MM-DD');
        this.props.onSave && this.props.onSave(Object.assign(values, this.props.customer.member));
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    const customer = this.props.customer;
    return (
      <Modal title="新增会员"
             visible={this.props.visible}
             onOk={this.saveCustomer}
             onCancel={this.props.toggleModal}>
        <Form layout='horizontal'>

          <Row>
            <Col span={12}>
              <FormItem label='会员号' {...baseLayout}>
                {getFieldDecorator('number', {
                  rules: [
                    {required: true, message: '请输入会员号!'},
                  ],
                })(
                  <Input onPressEnter={this.checkNumber}/>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>

            <Col span={12}>
              <FormItem label='姓名' {...baseLayout}>
                {customer.member.telephone ? customer.member.name : getFieldDecorator('name', {
                    rules: [
                      {required: true, message: '请输入姓名!'},
                    ],
                  })(
                    <Input />
                  )}
              </FormItem>
            </Col>
            <Col span={12}>

              <FormItem label='联系电话' {...baseLayout}>
                {customer.member.telephone ? customer.member.telephone : getFieldDecorator('telephone', {
                    rules: [
                      {required: true, message: '请输入电话!'},
                    ],
                  })(
                    <Input />
                  )}
              </FormItem>
            </Col>

          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="隐形（右）"{...baseLayout}>
                {getFieldDecorator('conRight')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="隐形（左）"{...baseLayout}>
                {getFieldDecorator('conLeft')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="球镜（右）"{...baseLayout}>
                {getFieldDecorator('qjRight')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="球镜（左）"{...baseLayout}>
                {getFieldDecorator('qjLeft')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="柱镜（右）"{...baseLayout}>
                {getFieldDecorator('zjRight')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="柱镜（左）"{...baseLayout}>
                {getFieldDecorator('zjLeft')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="轴位（右）"{...baseLayout}>
                {getFieldDecorator('zwRight')(
                  <Input />
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="轴位（左）"{...baseLayout}>
                {getFieldDecorator('zwLeft')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <FormItem label="瞳距"{...baseLayout}>
                {getFieldDecorator('tj')(
                  <Input />
                )}
              </FormItem>
            </Col>
          </Row>
          <FormItem label="其他信息" labelCol={{span: 4}} wrapperCol={{span: 20}}>
            {getFieldDecorator('otherInfo')(
              <Input type="textarea"/>
            )}
          </FormItem>
          <Row>
            <Col span={12}>
              <FormItem label="消费金额"{...baseLayout}>
                {getFieldDecorator('amount', {
                  rules: [
                    {required: true, message: '请输入消费金额!'},
                  ],
                })(
                  <Input type="number"/>
                )}
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="消费日期"{...baseLayout}>
                {getFieldDecorator('consumeDate', {initialValue: moment()})(
                  <DatePicker />
                )}
              </FormItem>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  }
}

CustomerModal = Form.create()(CustomerModal);
CustomerModal.propTypes = {};
export default CustomerModal;
