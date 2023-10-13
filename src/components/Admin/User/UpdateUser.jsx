import { useEffect, useState } from "react";
import { Modal, Form, Input, message, notification, } from "antd";
import { callUpdateUser } from "../../../services/api";

const UpdateUser = (props) => {
  const { open, setOpen, dataUpdate, fetchUserWithPaginate } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  
  useEffect(() => {
       form.setFieldsValue(dataUpdate)
  }, [dataUpdate]);
  const onFinish = async (value) => {
    const {_id, fullName, phone} = value
    setConfirmLoading(true);
    const res = await callUpdateUser(_id, fullName, phone)
    if(res && res.data){
      setConfirmLoading(false);
      message.success("Update user successfully!!!")
     // console.log('check update =>>', res)
      setOpen(false)
      await fetchUserWithPaginate()
    }else{
      notification.error({
        message:'Có lỗi xảy ra!',
        description: res.message,
        duration:3
      })
    }
  };

  //console.log("props update =>>>", dataUpdate);
  return (
    <>
      <Modal
        title="Update User"
        forceRender
        open={open}
        onOk={() => form.submit()}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
        okText={"Thay đổi"}
        cancelText={"Hủy"}
        confirmLoading={confirmLoading}
      >
        <>
          <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
            <Form.Item
              labelCol={{ span: 24 }}
              label="ID"
              name="_id"
              hidden = {true}
              rules={[
                {
                  required: true,
                  message: "Vui long nhap id!",
                },
              ]}
            >
              <Input defaultValue={dataUpdate?._id} />
            </Form.Item>

            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên hiển thị"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Tên hiển thị không được để trống!",
                },
              ]}
            >
              <Input defaultValue={dataUpdate?.fullName} />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }} //whole column
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không được để trống!" },
              ]}
            >
              <Input defaultValue={dataUpdate?.email} disabled={true} />
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
              <Input defaultValue={dataUpdate?.phone} />
            </Form.Item>
          </Form>
        </>
      </Modal>
    </>
  );
};

export default UpdateUser;
