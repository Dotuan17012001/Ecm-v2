import {
  Modal,
  Form,
  Input,
  Col,
  Row,
  InputNumber,
  Divider,
  Select,
  Upload,
  message
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { callFetchCategory } from "../../../services/api";

const BookCreateNew = (props) => {
  const { open, setOpen } = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingSlider, setLoadingSlider] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [dataCategory, setDataCategory] = useState([]);
  const [form] = useForm();

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  
  const fetchCategory = async () => {
    const res = await callFetchCategory();
    if (res && res?.data) {
      let listCategory = res.data.map((item) => {
        return { label: item, value: item };
      });
      //console.log('list cate=>',listCategory)
      setDataCategory(listCategory);
    }
  };
  
  useEffect(() => {
    fetchCategory();
  }, []);


  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setLoadingSlider(true) : setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        type ? setLoadingSlider(false) : setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = () => {};

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  const handleUploadFile = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 1000);
  };

  return (
    <>
      <Modal
        title="Thêm mới sách"
        open={open}
        onOk={() => form.submit}
        onCancel={() => setOpen(false)}
        okText="Thêm mới"
        cancelText="Hủy"
        confirmLoading={isSubmit}
        width={'50vw'}
        maskClosable = {false}
      >
        <Divider/>
        <Form form={form} name="basic" onFinish={onFinish} autoComplete="off">
          <Row gutter={15}>
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Tên sách"
                name="mainText"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input book name!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Tác giả"
                name="author"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input author!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Giá tiền"
                name="price"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input price!" }]}
              >
                <InputNumber
                  addonAfter={"VND"}
                  defaultValue={100}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Thể loại"
                name="category"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input category!" }]}
              >
                <Select
                  defaultValue={null}
                  showSearch
                  allowClear
                  options={dataCategory}
                />
              </Form.Item>
            </Col>
            <Col span={6} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Số lượng"
                name="quantity"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input quantity!" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Đã bán"
                name="sold"
                labelCol={{ span: 24 }}
                rules={[{ required: true, message: "Please input sold!" }]}
              >
                <InputNumber
                  min={0}
                  style={{ width: "100%" }}
                  defaultValue={0}
                />
              </Form.Item>
            </Col>

            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Ảnh Thumbnail"
                name="thumbnail"
                labelCol={{ span: 24 }}
              >
                <Upload
                  name="thumbnail"
                  listType="picture-card"
                  maxCount={1}
                  multiple={false}
                  onChange={handleChange}
                  customRequest={handleUploadFile}
                  beforeUpload={beforeUpload}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12} style={{ padding: "0 10px" }}>
              <Form.Item
                label="Ảnh Slider"
                name="slider"
                labelCol={{ span: 24 }}
              >
                <Upload
                  name="sliser"
                  listType="picture-card"
                  multiple
                  customRequest={handleUploadFile}
                  beforeUpload={beforeUpload}
                  onChange={(info) => handleChange(info, "slider")}
                >
                  <div>
                    {loadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default BookCreateNew;
