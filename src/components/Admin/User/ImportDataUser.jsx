import { message, Upload, Space, Table, Tag, Modal  } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";
import * as XLSX from "xlsx";
const ImportDataUser = (props) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { open, setOpen } = props;
  const [dataImport, setDataImport] = useState([])
  //Modal
  const handleOk = () => {
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  //Upload file
  const { Dragger } = Upload;
  const dummyRequest = ({file, onSuccess}) => {
      setTimeout(()=>{
        onSuccess("ok")
      },1000)
  }
  const propsDragger = {
    name: "file",
    multiple: false,
    maxCount: 1,
   // action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
    accept: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel',
    customRequest:dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        //console.log('file ìno',info.file,info.fileList);
        const file = info.fileList[0].originFileObj
        let reader = new FileReader();

    reader.onload = function(e) {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, {type: 'array'});
        // find the name of your sheet in the workbook first
        let worksheet = workbook.Sheets['Sheet1'];

        // convert to json format
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log('check json',jsonData)
        setDataImport(jsonData)
    };
    reader.readAsArrayBuffer(file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
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
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={'50vw'}
        okText ={'Import data'}
        okButtonProps={
          {disable: true}
        }
        //dont close when click outside
        maskClosable = {false}
      >
        
        <Dragger {...propsDragger}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
        <div style={{ margin:'20px 0', marginLeft:'5px'}}>Dữ liệu upload :</div>
        <Table 
           columns={[
            {title: 'Tên hiển thị',dataIndex: 'Tên hiển thị',key: 'name'},
            {title: 'Email',dataIndex: 'Email',key: 'email',},
            {title: 'Số điện thoại', dataIndex: 'Số điện thoại',key: 'phone'}
           ]}
           dataSource={dataImport}
           
           />;
  
      </Modal>
    </>
  );
};

export default ImportDataUser;
