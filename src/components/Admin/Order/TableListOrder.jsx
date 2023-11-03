import { Table, Row, Col, Button, Popconfirm, message, notification } from "antd";
import './tableOrder.scss'
import { callGetListOrderWithPaginate } from "../../../services/api";
import { useEffect, useState } from "react";
import moment from "moment/moment";
const TableListOrder = () => {

  const [listOrder, setListOrder] = useState([])

  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [totalPage, setTotalPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)


  const [filter, setFilter] = useState('')
  const [sorter, setSorter] = useState('')

    const columns = [
        {
          title: 'Id',
          dataIndex: '_id',
          sorter:true,
          render: (text, record, index)=>{
              return (
                <a>
                  <span>{record?._id}</span>
                </a>
              )
          }
         
        },
        {
          title: 'Giá tiền',
          dataIndex: 'totalPrice',
          sorter:true
         
        },
        {
          title: 'Tên',
          dataIndex: 'name',
          sorter:true
        },
        {
          title: 'Địa chỉ',
          dataIndex: 'address',
          sorter:true
        },
        {
          title: 'Số điện thoại',
          dataIndex: 'phone',
          sorter:true
        },
        {
          title: 'Ngày cập nhật',
          dataIndex: 'updatedAt',
          sorter:true,
          render: (text, record, index)=>{
            return (   
                <span>{moment(record.updatedAt).format("YYYY-MM-DD HH:mm:ss")}</span>
            )
        },
          
        },
      ];
    
      useEffect(() => {
        fetchListOrderWithPaginate()
      },[currentPage, pageSize, sorter])
  
 
      const onChange = (pagination, filters, sorter, extra) => {
        if(currentPage !== +pagination.current){
          setCurrentPage(+pagination.current)
        }
        if(pageSize !== pagination.pageSize){
          setCurrentPage(1)
          setPageSize(pagination.pageSize)
        }
       
        if(sorter && sorter.field){
          let sortQuery = sorter?.order === 'ascend' ? `&sort=${sorter?.field}`:`&sort=-${sorter.field}`
          setSorter(sortQuery)
        }
      };


    const fetchListOrderWithPaginate = async () => {
      let query = `current=${currentPage}&pageSize=${pageSize}`;
      if(sorter){
        query+= sorter
      }

      const res = await callGetListOrderWithPaginate(query);
      if(res && res?.data){
        setListOrder(res.data.result)
        setTotalPage(res.data.meta.total)
      }
    }
    return ( 
        <>
            <Row className="table-order">
                <Col span={24}>
                    <Table 
                      columns={columns}
                      dataSource={listOrder} 
                      onChange={onChange} 
                      pagination = {
                        {
                          current:currentPage,
                          pageSize:pageSize,
                          showSizeChanger: true,
                          pageSizeOptions: ['5','10', '20', '30'],
                          total:totalPage
                        }
                      }

                      title={()=>{
                        return (
                          <>
                            <div className="header-table">
                                <div className="title-table">Quản lý đơn đặt hàng</div>
                            </div>
                          </>
                        )
                      }}
                    />
                </Col>
            </Row>
        </>
     );
}
 
export default TableListOrder;