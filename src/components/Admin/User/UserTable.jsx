import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { callDeleteUser, getUserWithPaginate } from "../../../services/api";
import { SyncOutlined, DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import ViewUser from "./ViewUser";
import CreateNewUser from "./CreateNewUser";
import ImportDataUser from "./ImportDataUser";
import * as XLSX from "xlsx";
import UpdateUser from "./UpdateUser";
import "../layout.scss";

const UserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);
  const [listUser, setListUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");
  const [dataViewUser, setDataViewUser] = useState();
  const [dataUpdateUser, setDataUpdateUser] = useState();
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUploadFileModal, setOpenUploadFileModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  //Delete

  const handleDeleteUser = async (id) => {
    const res = await callDeleteUser(id);
    if (res && res.data) {
      message.success("Đã xóa thành công!");
      await fetchUserWithPaginate();
    } else {
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
      key: "id",
      sorter: true,
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              // console.log("record", record);
              setDataViewUser(record);
              setOpenViewModal(true);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa user"
              placement="leftTop"
              description="Bạn có chắc chắn muốn xóa user này ?"
              onConfirm={() => handleDeleteUser(record._id)}
              okText={"Xác nhận"}
              cancelText={"Hủy"}
            >
              <DeleteTwoTone
                twoToneColor="#eb2f96"
                style={{ cursor: "pointer" }}
              />
            </Popconfirm>

            <EditTwoTone
              twoToneColor="#3cc41a"
              style={{ cursor: "pointer", marginLeft: "20px" }}
              onClick={() => {
                //  console.log('edit user =>',record)
                setOpenUpdateModal(true);
                setDataUpdateUser(record);
              }}
            />
          </>
        );
      },
    },
  ];

  const fetchUserWithPaginate = async () => {
    setIsLoading(true);
    let query = `current=${currentPage}&pageSize=${pageSize}`;
    if (filter) {
      query += `${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await getUserWithPaginate(query);
    if (res && res?.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
    //console.log('resDataUser >>>', res)
  };

  useEffect(() => {
    fetchUserWithPaginate();
  }, [currentPage, pageSize, filter, sortQuery]);

  const onChange = (pagination, filters, sorter, extra) => {
    //  console.log('params', pagination.current);
    if (pagination && pagination.current !== currentPage) {
      setCurrentPage(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrentPage(1);
    }

    if (sorter && sorter.field) {
      console.log("sorter", sorter);
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }
  };

  const handleSearch = (queryFilter) => {
    setFilter(queryFilter);
  };

  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportDataUser.csv");
    }
  };

  return (
    <>
      <Row className="table-user">
        <Col span={24}>
          <InputSearch handleSearch={handleSearch} />
        </Col>
        <Col span={24}>
          <Table
            title={() => {
              return (
                <>
                  <div className="header-table">
                    <div className="title-table">Quản lý người dùng</div>
                    <div className="btn-table">
                      <Button type="primary" onClick={() => handleExportData()}>
                       Export
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpenUploadFileModal(true)}
                      >
                       
                        Import
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => setOpenCreateModal(true)}
                      >
                        Thêm mới
                      </Button>
                      <SyncOutlined
                        className="sync-icon"
                        onClick={() => {
                          setFilter("");
                          setSortQuery("");
                        }}
                      />
                    </div>
                  </div>
                </>
              );
            }}
           
            columns={columns}
            dataSource={listUser}
            onChange={onChange}
            loading={isLoading}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              pageSizeOptions: ["5", "10", "15", "20"],
              showSizeChanger: true,
              total: total,
              showTotal: (total, range) => {
                return (
                  <div>
                    {range[0]}- {range[1]} / Trên {total}
                  </div>
                );
              },
            }}
          />
        </Col>
      </Row>
      <ViewUser
        open={openViewModal}
        setOpen={setOpenViewModal}
        dataViewUser={dataViewUser}
        setDataViewUser={setDataViewUser}
      />

      <CreateNewUser
        open={openCreateModal}
        setOpen={setOpenCreateModal}
        fetchUserWithPaginate={fetchUserWithPaginate}
      />

      <ImportDataUser
        open={openUploadFileModal}
        setOpen={setOpenUploadFileModal}
        fetchUserWithPaginate={fetchUserWithPaginate}
      />

      <UpdateUser
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        dataUpdate={dataUpdateUser}
        fetchUserWithPaginate={fetchUserWithPaginate}
      />
    </>
  );
};

export default UserTable;
