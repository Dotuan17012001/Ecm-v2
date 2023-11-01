import { Button, Form, Row, Col, message, Input, notification } from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { callChangePassword } from "../../services/api";

const ChangePassword = () => {

  const [form] = Form.useForm();
  const user = useSelector((state) => state.account.user);
  const [isSubmit, setIsSubmit] = useState(false)

  const onFinish = async(values) => {
    console.log('check', values)
    const {email, oldpass, newpass} = values
    const res = await callChangePassword(email, oldpass, newpass)
    console.log('res',res)
    if(res && res.data){
      message.success("Thay đổi mật khẩu thành công")
      form.resetFields()
    }else{
      notification.error({
        message:'Có lỗi xảy ra',
        description: res.message
      })
    }
  };
  
  return (
    <>
      <Row>
        <Col md={14}>
          <Form form={form} onFinish={onFinish}>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              initialValue={user?.email}
              name="email"
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu hiện tại"
              name="oldpass"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu mới"
              name="newpass"
              rules={[
                {
                  required: true,
                  message: "Mật khẩu không được để trống!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
            >
              <button 
                  onClick={() => form.submit()} 
                  style={{}}
                 // disabled = {isSubmit}
              >
                    Cập nhật
                </button>
            </Form.Item>

              

          </Form>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
