import { Table, Row, Col, Button, Popconfirm, message, notification } from "antd";
import BookInputSearch from "./BookInputSearch";
import {
    RedoOutlined,
    DeleteTwoTone,
    EditTwoTone,
} from "@ant-design/icons";
import "../layout.scss";
import moment from "moment";
import { useEffect, useState } from "react";
import { callGetBookWithPaginate } from "../../../services/api";
import BookViewDetail from "./BookViewDetail";

const BookTable = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [listBook, setListBook] = useState([])
  const [total, setTotal] = useState(5)
  const [searchQuey, setSearchQuey] = useState('')
  const [sortQuey, setSortQuey] = useState("sort=-updatedAt")
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  
  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return(
          <a href="#"
            onClick={()=>{
              setOpenViewDetail(true);
              setDataViewDetail(record)
            }}
          >
            {record?._id}
          </a>
        )
      }
    },

    {
      title: "Tên sách",
      dataIndex: "mainText",
      sorter: true,
    },

    {
    
      title: "Thể loại",
      dataIndex: "category",
      sorter: true,
    },

    {
 
      title: "Tác giả",
      dataIndex: "author",
      sorter: true,
    },
    {
       
      title: "Giá tiền",
      dataIndex: "price",
      sorter: true,
    },

    {
      
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
      render: (text, record, index) => {
        return(
          <span >
            {moment(record?.updatedAt).format("DD-MMM-YYYY HH:mm:ss")}
          </span>
        )
      }
    },
    {
  
      title: "Action",
      dataIndex: "action",
      width: 100,
      render: (text, record, index) => {
        return (
        <>
          <DeleteTwoTone
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
          />
          <EditTwoTone
              twoToneColor="#3cc41a"
              style={{ cursor: "pointer", marginLeft: "20px" }}
            />
        </>)
      },
    },
  ];

  useEffect(()=>{
    fetchListBookWithPaginate()
  },[currentPage, pageSize, searchQuey, sortQuey])

  //console.log('check searchQuey -->',searchQuey)

  const fetchListBookWithPaginate = async () => {
    let query = `current=${currentPage}&pageSize=${pageSize}`
    if(searchQuey.length > 0){
      query = query + searchQuey
    }
    if(sortQuey.length > 0){
      query = query + sortQuey
    }
    setLoading(true)
    const res = await callGetBookWithPaginate(query)
    if(res && res.data){  
      setListBook(res.data.result)
      setTotal(res.data.meta.total)
      setLoading(false)
    }
  }

  const onChange = (pagination, filters, sorter, extra) => {
   //console.log("params", pagination, filters, sorter, extra);
    console.log("params",sorter);
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    let sortQ = (sorter.order === 'ascend' ? `&sort=${sorter.field}`:`&sort=-${sorter.field}`)
    setSortQuey(sortQ)
  };

  const handleQuerySearch = (searchQuery) => {
    setSearchQuey(searchQuery)
  }
 
  return (
    <>
      <Row className="table-user" >
        <Col span={24}>
            <BookInputSearch handleQuerySearch = {handleQuerySearch}/>
        </Col>
        <Col span={24}>
          <Table
            title={() => {
              return (
                <>
                <div className="header-table">
                    <div className="title-table">Quản lý người dùng</div>
                    <div className="btn-table">
                    <Button type="primary">Export</Button>
                    <Button type="primary">Thêm mới</Button>
                    <RedoOutlined className="sync-icon"
                        onClick={()=>{
                          setSearchQuey('');
                          setSortQuey("sort=-updatedAt")
                        }}
                    />
                    </div>
                </div>
                </>
              )
            }}
            loading = {loading}
            columns={columns}
            dataSource={listBook}
            onChange={onChange}
            pagination = {
                {
                    current: currentPage,
                    pageSize: pageSize,
                    pageSizeOptions:['5','10','15','20'],
                    showSizeChanger: true,
                    total: total,
                }
            }
          />
        </Col>
      </Row>
      <BookViewDetail
        open = {openViewDetail}
        setOpen = {setOpenViewDetail}
        dataViewDetail = {dataViewDetail}
        setDataViewDetail = {setDataViewDetail}
      />
    </>
  );
};

export default BookTable;
