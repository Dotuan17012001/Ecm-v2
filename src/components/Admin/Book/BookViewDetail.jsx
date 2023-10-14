import { Button, Drawer, Descriptions, Badge, Divider, Modal, Upload} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";


const BookViewDetail = (props) => {
  const {open, setOpen, dataViewDetail} = props;
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    
  ]);
  
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    console.log('file --->', file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
    setPreviewTitle(file?.name || file?.url.substring(file?.url.lastIndexOf('/') + 1));
    
  };

  const handleChange = ({ fileList: newFileList }) =>
    setFileList(newFileList);
  
  return (
    <>
      <Drawer
        title="Xem thông tin chi tiết"
        placement="right"
        size={'large'}
        onClose={()=>setOpen(false)}
        open={open}
      >
        <>
            <Descriptions 
                title="Thông tin sách" bordered column={2}
            >
                <Descriptions.Item label = {'ID'}>
                   {dataViewDetail?._id}
                </Descriptions.Item>
                <Descriptions.Item label = {'Tên sách'}>
                   {dataViewDetail?.mainText}
                </Descriptions.Item>
                <Descriptions.Item label = {'Tác giả'}>
                    {dataViewDetail?.author}
                </Descriptions.Item>
                <Descriptions.Item label = {'Giá tiền'}>
                    {dataViewDetail?.price} đ
                </Descriptions.Item>
                <Descriptions.Item label = {'Thể loại'} span={12}> 
                   <Badge status="processing" /> {' '}
                   {dataViewDetail?.category}
                </Descriptions.Item>
                <Descriptions.Item label = {'Created At'}>
                    {moment(dataViewDetail?.createdAt).format('YYYY-MMMM-DD HH:mm:ss')}
                </Descriptions.Item>
                <Descriptions.Item label = {'Updated At'}>
                     {moment(dataViewDetail?.updatedAt).format('YYYY-MMMM-DD HH:mm:ss')}
                </Descriptions.Item>
            </Descriptions>
                <Divider>Ảnh của sách</Divider>
                <Upload
                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    showUploadList = {
                        {showRemoveIcon:false}
                    }
                >
        
                </Upload>
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
                
        </>
      
      </Drawer>
    </>
  );
};

export default BookViewDetail;
