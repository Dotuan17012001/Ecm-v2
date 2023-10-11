import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Button, Space } from 'antd';
import InputSearch from './InputSearch';
import { getUserWithPaginate } from '../../../services/api';
import { SyncOutlined, DeleteTwoTone} from '@ant-design/icons';
import '../layout.scss'
import ViewUser from './ViewUser';
import CreateNewUser from './CreateNewUser';
const UserTable = () => {
    const [currentPage, setCurrentPage]= useState(1)
    const [pageSize, setPageSize]= useState(5)
    const [total, setTotal] = useState(0)
    const [listUser, setListUser] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [filter, setFilter] = useState('')
    const [sortQuery, setSortQuery] = useState('')
    const [dataViewUser, setDataViewUser] = useState()

    const [open, setOpen] = useState(false);

    const [openCreateModal, setOpenCreateModal] = useState(false);

    
    const onClose = () => {
      setOpen(false);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id',
            key: 'id',
            sorter: true,
            render: (text, record, index) => {
                return (
                        <a href="#" onClick={()=>{
                            console.log('record', record)
                            setDataViewUser(record)
                            setOpen(true)
                        }}>
                            {record._id}
                        </a>
                )
            }
        },
        {
            title: 'Tên hiển thị',
            dataIndex: 'fullName',
            key: 'name',
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
            key: 'phone',
            sorter: true
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record, index) => {
                return (
                    <>
                         <DeleteTwoTone  twoToneColor="#eb2f96" style={{cursor:'pointer'}}/>
                    </>
                )
            }
        },
    ];

    const  fetchUserWithPaginate = async() => {
        setIsLoading(true)
        let query = `current=${currentPage}&pageSize=${pageSize}` 
        if(filter){
            query+= `${filter}`
        }
        if(sortQuery){
            query+= `&${sortQuery}`
        }

        const res = await getUserWithPaginate(query)
        if(res && res?.data ){
            setListUser(res.data.result);
            setTotal(res.data.meta.total)
        }
        setIsLoading(false)
        //console.log('resDataUser >>>', res)
    }

    useEffect(()=>{
        fetchUserWithPaginate()
    },[currentPage, pageSize, filter, sortQuery])

    
    const onChange = (pagination, filters, sorter, extra) => {
      //  console.log('params', pagination.current);
       if(pagination && pagination.current !== currentPage){
            setCurrentPage(pagination.current)
       }

        if(pagination && pagination.pageSize !== pageSize){
            setPageSize(pagination.pageSize)
            setCurrentPage(1)
        }

        if(sorter && sorter.field){
            console.log('sorter',sorter)
            const q = sorter.order === 'ascend' ? `sort=${sorter.field}`:`sort=-${sorter.field}`
            setSortQuery(q)
        }
        
    };

    const handleSearch = (queryFilter) => {
        setFilter(queryFilter)
    }

    return (
        <>
            <Row className='table-user'>
                <Col span={24}>
                    <InputSearch 
                        handleSearch = {handleSearch}
                    />
                </Col>
                <Col span={24}>
                    <div className='header-table'>
                        <Button type="primary"> Export </Button>
                        <Button type="primary"> Import </Button>
                        <Button type="primary" onClick={()=>setOpenCreateModal(true)}
                        > 
                            Thêm mới 
                        </Button>
                        <SyncOutlined className='sync-icon' onClick={()=>{
                            setFilter('')
                            setSortQuery('')
                        }}/>                      
                    </div>
                    <Table
                        className='def'
                        columns={columns}
                        dataSource={listUser}
                        onChange={onChange}
                        loading ={isLoading}
                        pagination={{
                           current: currentPage,
                           pageSize: pageSize,
                           pageSizeOptions : ['5', '10','15','20'],
                           showSizeChanger:true,
                           total: total,
                           showTotal: (total, range) => {return <div>{range[0]}- {range[1]} / Trên {total}</div>}
                          }}
                    />
                </Col>
            </Row>
            <ViewUser
                open = {open}
                onClose = {onClose}
                dataViewUser = {dataViewUser}
                setDataViewUser = {setDataViewUser}
            />

            <CreateNewUser
                open = {openCreateModal}
                setOpen = {setOpenCreateModal}
                fetchUserWithPaginate = {fetchUserWithPaginate}
            />

        </>
    )
}


export default UserTable;