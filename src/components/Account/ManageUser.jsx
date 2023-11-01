import React, { useState } from 'react';
import { Button, Modal, Tabs } from 'antd';
import UserInfo from './UserInfo';
import ChangePassword from './ChangePassword';

const ManageUser = (props) => {
 
  const {open, setOpen} = props
 
  const items = [
    {
      key: 'info',
      label: 'Cập nhật thông tin',
      children: <UserInfo/>
    },
    {
      key: 'changePass',
      label: 'Đổi mật khẩu',
      children: <ChangePassword/>
    },
    
  ];

    return ( 
        <>
        <Modal 
            title="Quản lý tài khoản" 
            open={open} 
            footer = {null}
            onCancel={()=>setOpen(false)}
            width={780}
            okText = 'Cập nhật'
            maskClosable = {false}
        >
            <Tabs defaultActiveKey="info" items={items} />
            
        </Modal>
        </>
     );
}
 
export default ManageUser;