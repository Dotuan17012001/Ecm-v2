import React, { useEffect, useState } from 'react';
import { Table, Row, Col } from 'antd';
import InputSearch from './InputSearch';
import { getUserWithPaginate } from '../../../services/api';
import '../layout.scss'
const UserTable = () => {
    const [currentPage, setCurrentPage]= useState(1)
    const [pageSize, setPageSize]= useState(5)
    const [total, setTotal] = useState(0)
    const [listUser, setListUser] = useState([])
    const  fetchUserWithPaginate = async() => {
        const res = await getUserWithPaginate(currentPage, pageSize)
        if(res && res?.data && res.statusCode === 200){
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }
        console.log('resDataUser >>>', res)
    }

    useEffect(()=>{
        fetchUserWithPaginate()
    },[currentPage, pageSize])

 

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            sorter: true
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            sorter: true,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: true
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            render: (text, record, index) => {
                return (
                    <>
                        <button>Delete</button>
                    </>
                )
            }
        },
    ];
    
    const onChange = (pagination, filters, sorter, extra) => {
        //console.log('params', pagination);
        if(pagination && pagination.current !== currentPage){

            setCurrentPage(pagination.current)
        }
        if(pagination && pagination.pageSize !== pageSize){

            setPageSize(pagination.pageSize)
            setCurrentPage(1)
        }
        
    };

    return (
        <>
            <Row className='table-user'>
                <Col span={24}>
                    <InputSearch />
                </Col>
                <Col span={24}>
                    <Table
                        className='def'
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        pagination={{
                           current: currentPage,
                           pageSize: pageSize,
                           pageSizeOptions : ['5', '10','15','20'],
                           showSizeChanger:true,
                           total: total
                          }}
                    />
                </Col>
            </Row>
        </>
    )
}


export default UserTable;