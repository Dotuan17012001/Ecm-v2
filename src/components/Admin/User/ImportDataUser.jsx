import { Upload,Table, Modal, message ,notification } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as XLSX from "xlsx";
import { createUserImportBulk } from "../../../services/api";
import templateFile from '../User/data/templateFile.xlsx?url'

const ImportDataUser = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { open, setOpen, fetchUserWithPaginate } = props;
  const [dataImport, setDataImport] = useState([]);
  //Modal

  const handleSubmit = async() => {
    setConfirmLoading(true);
    const data = dataImport.map(item => {
      item.password = '123456'
      return item;
    })
   
    const res = await createUserImportBulk(data)
    console.log('res =>>',res)
    if(res && res.data){
     // message.success(`Import data successfully with ${res.data.countError} and ${res.data.countSuccess}`)
     notification.success({
      message: `Upload thành công`,
      description:
      `Upload data successfully with ${res.data.countError} error and ${res.data.countSuccess} success`,
      duration: 3
     })
      setDataImport([])
      setConfirmLoading(false);
      setOpen(false);
      await fetchUserWithPaginate()
    }else{
      notification.error({
        message: "Có lỗi xảy ra",
        description:
            res.message,
        duration: 3
    })
    }
  };

  //Upload file
  const { Dragger } = Upload;

  //request
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const propsDragger = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log('file info >>>',info.file,info.fileList);
      }
      if (status === "done") {
        if(info.file, info.fileList.length > 0){
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: "array" });
            // find the name of your sheet in the workbook first
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  
            // convert to json format
            const jsonData = XLSX.utils.sheet_to_json(worksheet,{
              header: ["fullName", "email", "phone"],
              range: 1
            });
            //console.log("check json", jsonData);
            if(jsonData && jsonData.length > 0){
              setDataImport(jsonData);
            }
          };
        }

      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title="Import data user"
        open={open}
        onOk={handleSubmit}
        confirmLoading={confirmLoading}
        onCancel={()=>{
          setOpen(false);
          setDataImport([])
        }}
        width={"50vw"}
        okText={"Import data"}
        okButtonProps={{
          disabled: dataImport.length < 1
        }}
        //dont close when click outside
        maskClosable={false}
      >
        <Dragger {...propsDragger}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.Only accept .csv, .xls, .xlsx or 
            <a onClick={e => e.stopPropagation()} href={templateFile} download>Download Sample File</a>
          </p>
        </Dragger>
        <div style={{ margin: "20px 0", marginLeft: "5px" }}>
          Dữ liệu upload :
        </div>
        <Table
          columns={[
            { title: "Tên hiển thị", dataIndex: "fullName", key: "name" },
            { title: "Email", dataIndex: "email", key: "email" },
            {
              title: "Số điện thoại",
              dataIndex: "phone",
              key: "phone",
            },
          ]}
          dataSource={dataImport}
        />
        ;
      </Modal>
    </>
  );
};

export default ImportDataUser;
