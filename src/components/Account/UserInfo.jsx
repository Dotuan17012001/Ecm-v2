import { Button, Form, Avatar, Row, Col, message, Upload, Input, Tag, notification } from "antd";
import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { callUploadImageAvatar, callUpdateInfoUser } from "../../services/api";
import { useState } from "react";
import {doUpdateUserInfoAction } from "../../redux/account/accountSlice";
import './userInfo.scss'
const UserInfo = () => {
 
  const [form] = Form.useForm();
  const user = useSelector(state => state.account.user)
  

  //console.log('user=>',user);

  const [userAvatar, setUserAvatar] = useState('')
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useDispatch()

  const handleUploadAvatar = async({file, onSuccess, onError}) => {
        const res = await callUploadImageAvatar(file)
        if(res && res.data){
            //console.log('check',res);
            setUserAvatar(res.data.fileUploaded)

            onSuccess('ok')
        }else{
            onError("Có lỗi khi upload file")
        }
  }

  const propsItem = {
    maxCount: 1,
    multiple:false,
    showUploadList: false,
    customRequest: handleUploadAvatar,
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onFinish = async(values) => {
        
        setIsSubmit(true)
        const {id, fullName, phone} = values
        console.log('values=>',values);
        const res = await callUpdateInfoUser(id, phone , fullName, userAvatar) 

        if(res && res.data){
            dispatch(doUpdateUserInfoAction({avatar:userAvatar, phone, fullName}))
            message.success("Cập nhật thông tin thành công")
          
            localStorage.removeItem('access_token')
            
        }else{
            notification.error({
                message:"Có lỗi xảy ra",
                description:res.message,
            })
        }
        setIsSubmit(false)

  };

  return (
    <>
      <div className="user-info">
        <Row>
          <Col md={11}>
            <div
              className="upload-img"
              style={{ display: "flex", flexDirection: "column", gap: "25px" }}
            >
              <div className="img-upload">
                <Avatar 
                    size={120} 
                    icon={<AntDesignOutlined />} 
                    src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${ userAvatar || user?.avatar}`}
                />
              </div>
              <div className="btn-upload">
                <Upload {...propsItem} >
                  <Button icon={<UploadOutlined />}>Đổi Avatar</Button>
                </Upload>
              </div>
            </div>
          </Col>
          <Col md={13}>
            <Form
              form={form}
              onFinish={onFinish}
            >
  

              <Form.Item
                labelCol={{ span: 24 }}
                label="ID"
                initialValue={user?.id}
                name="id"
                hidden
              >
                <Input  disabled = {true}/>
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Email"
                initialValue={user?.email}
                name="email"
              >
                <Input  disabled = {true}/>
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên tài khoản"
                name="fullName"
                initialValue={user?.fullName}
                rules={[
                  {
                    required: true,
                    message: "Tên không được để trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="Số điện thoại"
                initialValue={user?.phone}
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
              <Form.Item
              >
                <button 
                    onClick={() => form.submit()} 
                    style={{}}
                    disabled = {isSubmit}
                >
                    Cập nhật
                </button>
        
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default UserInfo;
