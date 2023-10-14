import React, { useState } from 'react';
import { Button, Col, Form, Input, Row, theme } from 'antd';


const InputSearch = (props) => {
    const {handleSearch} = props
    const { token } = theme.useToken();
    const [form] = Form.useForm();

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const onFinish = async (values) => {
        //console.log('Received values of form: ', values);
        //current=${currentPage}&pageSize=${pageSize}&fullName=/${fullName}/i&email=/${email}/i&phone=/${phone}/i
        const {fullName, email, phone} = values
        let query = ``;
        if(fullName){
            query += `&fullName=/${fullName}/i`
        }
        if(email){
            query += `&email=/${email}/i`
        }
        if(phone){
            query += `&phone=/${phone}/i`
        }
        if(query){
            handleSearch(query)
        }
      //  console.log('check query >>>', query)
    };

    return (
        <Form form={form} name="advanced_search" style={formStyle} onFinish={onFinish}>
            <Row gutter={24}>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} 
                        name={`fullName`}
                        label={`Name`}
                    >
                        <Input  />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} 
                        name={`email`}
                        label={`Email`}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        labelCol={{ span: 24 }} 
                        name={`phone`}
                        label={`Số điện thoại`}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                    <Button type="primary" htmlType="submit">
                        Search
                    </Button>
                    <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                            form.resetFields();
                        }}
                    >
                        Clear
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};


export default InputSearch;