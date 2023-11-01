import { Space, Table, Tag,Row, Col } from 'antd';
import { getHistoryOrder } from "../../services/api";
import { useEffect, useState } from "react";
import './history.scss'
import moment from 'moment';
import ReactJson from 'react-json-view'

const HistoryOrder = () => {
    const [dataHistory , setDataHistory] =  useState([])
    useEffect(()=>{
        fetchGetHistory()
    },[])

    const fetchGetHistory = async() =>{
        const res = await getHistoryOrder()
        //console.log('check use=>>>',res.data)
        if(res && res.data){
            setDataHistory(res.data)
        }

    }

    const columns = [
        {
          title: 'STT',
          dataIndex: 'index',
          key: 'name',
          with: '10px',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Thời gian',
          dataIndex: 'time',
          key: 'time',
        },
        {
          title: 'Tổng số tiền (VND)',
          dataIndex: 'totalPrice',
          key: 'totalPrice',
        },
        {
          title: 'Trạng thái',
          key: 'tags',
          dataIndex: 'tags',
          
        },
        {
          title: 'Chi tiết',
          key: 'detail',
          dataIndex: 'detail',
          
        },
      ];

      const data = dataHistory?.map((his, index) => {
   
        return {
                key: 'index',
                index: index+1,
                time: moment(his?.createdAt).format("YYYY-MM-DD HH:mm:ss"),
                totalPrice: `${his?.totalPrice}`,
                tags:  <Tag color="success">Thành công</Tag>,
                detail: <ReactJson 
                          src={his?.detail} 
                          name ='Xem chi tiết' 
                          collapsed={true} 
                          enableClipboard = {false}
                          displayDataTypes = {false}
                          displayObjectSize = {false}
                        />
        }
      })

    return ( 
        <>
            
            <div className="table-history">
                
                <Col span = {24} className='row-his'>
                <div>Table History Order</div>
                    <Table 

                        columns={columns} 
                        dataSource={data} 
                        pagination={false} 
                    />
                </Col>
            </div>
        </>
     );
}
 
export default HistoryOrder;