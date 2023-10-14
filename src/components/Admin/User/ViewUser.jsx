import { Drawer, Descriptions, Badge } from 'antd';
import { useEffect, useState } from 'react';
import moment from 'moment'

const ViewUser = (props) => {
  const {open, dataViewUser, setOpen} = props
  
 // console.log(dataViewUser)
  return (
    <>
        <Drawer
        title="View detail user"
        width={'100vh'}
        onClose={()=>setOpen(false)}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
           
           <Descriptions title="User Info" bordered column ={2}>
            <Descriptions.Item label='Id'>
                  {dataViewUser?._id}
            </Descriptions.Item>
            <Descriptions.Item label='Username' >
                  {dataViewUser?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label='Email' >
                  {dataViewUser?.email}
            </Descriptions.Item>
            <Descriptions.Item label='Phone' >
                  {dataViewUser?.phone}
            </Descriptions.Item>
            <Descriptions.Item label='Role' span={12}>
                 <Badge status="processing" />  
                 {dataViewUser?.role}
            </Descriptions.Item>
            <Descriptions.Item label='Create at' >
                        {moment(dataViewUser?.createdAt).format("DD-MMM-YYYY HH:mm:ss")}
            </Descriptions.Item>
            <Descriptions.Item label='Update at'>
                        {moment(dataViewUser?.updatedAt).format("DD-MMM-YYYY HH:mm:ss")} 
            </Descriptions.Item>
           </Descriptions>   
      </Drawer>
    </>
  );
};

export default ViewUser;
