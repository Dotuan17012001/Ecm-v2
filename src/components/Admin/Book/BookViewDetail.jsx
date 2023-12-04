import { Button, Drawer, Descriptions, Badge, Divider, Modal, Upload, } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const BookViewDetail = (props) => {

  const {open, setOpen, dataViewDetail} = props;

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const [fileList, setFileList] = useState([]);
  
  const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  })


  const handlePreview = async (file) => {
   // console.log('file --->', file)
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || (file.preview));
    setPreviewOpen(true);
    setPreviewTitle(file?.name || file?.url.substring(file?.url.lastIndexOf('/') + 1));
    
  };

  const handleChange = ({ fileList: newFileList }) =>{
    console.log('check=>',newFileList)
    setFileList(newFileList);
  }
    
  useEffect(()=>{
    let imgThumbnail = {}, imgSlider = []
    if(dataViewDetail){
        if(dataViewDetail.thumbnail){
            imgThumbnail = {
                uid: uuidv4(),
                name: dataViewDetail.thumbnail,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${dataViewDetail.thumbnail}`
            }
        }
    }
    if(dataViewDetail.slider && dataViewDetail.slider.length > 0){
        dataViewDetail.slider.map((item)=>{
            imgSlider.push({
                uid: uuidv4(),
                name: item,
                status: 'done',
                url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`
            })
        })
    }
    setFileList([imgThumbnail, ...imgSlider])
  },[dataViewDetail])

  return (
    <>
      <Drawer
        title="Xem thông tin chi tiết"
        placement="right"
        size={'large'}
        onClose={()=>{
            setOpen(false);
        }}
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
                <Descriptions.Item label = {'Đã bán'}>
                    {dataViewDetail?.sold} 
                </Descriptions.Item>
                <Descriptions.Item label = {'Số lượng'}>
                    {dataViewDetail?.quantity} 
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
                <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                   <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>   
        </>
      </Drawer>
    </>
  );
};

export default BookViewDetail;
