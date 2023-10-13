import { useState } from "react";
import {
  Modal,Form, Input, message, notification,
} from "antd";
import { createNewUser} from "../../../services/api";


const CreateNewUser = (props) => {
  const { open, setOpen, fetchUserWithPaginate } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm()

  const onFinish = async (value) => {
    setConfirmLoading(true);
    const {fullName, password, email, phone} = value
    const res = await createNewUser(fullName, password, email, phone)
    if(res && res.data){
      setConfirmLoading(false);
      message.success("Create new user successfully");
      form.resetFields();
      setOpen(false);
      await fetchUserWithPaginate();
    }else{
      setConfirmLoading(false);
      notification.error({
        message: 'ERROR',
        description:
         res.message,
         duration: 3
      });
    }
   // console.log("create new user >>>", res);
  }
  return (
    <>
     
      <Modal
        title="Create New User"
        open={open}
        onOk={() => form.submit()}
        onCancel={()=>{setOpen(false); form.resetFields()}}
        okText = {'Tạo mới'}
        cancelText = {'Hủy'}
        confirmLoading={confirmLoading}
      >
        <>
          <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              labelCol={{ span: 24 }} 
              label="Họ tên"
              name="fullName"
              rules={[
                { required: true, message: "Họ tên không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }} 
              label="Mật khẩu"
              name="password"
              rules={[
                { required: true, message: "Mật khẩu không được để trống!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} 
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Số điện thoại không được để trống!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default CreateNewUser;
