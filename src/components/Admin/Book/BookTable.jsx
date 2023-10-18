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
import { callGetBookWithPaginate, callDeleteBook } from "../../../services/api";
import BookViewDetail from "./BookViewDetail";
import BookCreateNew from "./BookCreateNew";
import BookUpdateModal from "./BookUpdateModal";

const BookTable = () => {
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [listBook, setListBook] = useState([])
  const [total, setTotal] = useState(5)
  const [searchQuey, setSearchQuey] = useState('')
  const [sortQuey, setSortQuey] = useState("&sort=-updatedAt")
  const [openViewDetail, setOpenViewDetail] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [dataViewDetail, setDataViewDetail] = useState({});
  const [dataUpdate, setDataUpdate] = useState({});
  


  const handleDeleteBook = async(id) => {
    
      const res = await callDeleteBook(id)
      console.log('res=>>',res)
      if(res){
          message.success("Xóa thành công")
          await fetchListBookWithPaginate()
      }else{
        notification.error({
          message: "Có lỗi xảy ra",
          description: res.message,
          duration: 3,
        });
      }
    
  
  };


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
        <Popconfirm
        placement="rightBottom"
        title="Xác nhận xóa sách"
        description="Bạn có chắc chắn muốn xóa?"
        onConfirm={() => handleDeleteBook(record._id)}
        
      >
          <DeleteTwoTone
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
          />
      </Popconfirm>
          
          <EditTwoTone
              twoToneColor="#3cc41a"
              style={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={()=>{
                setOpenUpdateModal(true)
                setDataUpdate(record)
              }}
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
    console.log("params", pagination, sorter);
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
   
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      
      setCurrentPage(1);
    }
    if (sorter && sorter.field){
      let sortQ = (sorter?.order === 'ascend' ? `&sort=${sorter?.field}`:`&sort=-${sorter.field}`)
      setSortQuey(sortQ)
    }
  };

  const handleQuerySearch = (searchQuery) => {
    setSearchQuey(searchQuery)
  }

  //console.log('dataUpdate=>',dataUpdate)
 
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
                    <div className="title-table">Quản lý sách</div>
                    <div className="btn-table">
                    <Button type="primary">Export</Button>
                    <Button type="primary"
                      onClick={()=>setOpenCreateModal(true)}
                    >
                      Thêm mới
                    </Button>
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
      />
      <BookCreateNew
        open = {openCreateModal}
        setOpen = {setOpenCreateModal}
        fetchListBook = {fetchListBookWithPaginate}
      />
      <BookUpdateModal
        open = {openUpdateModal}
        setOpen = {setOpenUpdateModal}
        fetchListBook = {fetchListBookWithPaginate}
        dataUpdate = {dataUpdate}
        setDataUpdate = {setDataUpdate}
      />
    </>
  );
};

export default BookTable;
