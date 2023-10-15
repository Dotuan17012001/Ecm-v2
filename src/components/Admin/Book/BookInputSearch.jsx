import { Col, Row, Input, Form, theme, Button } from "antd";
import "../layout.scss";
const BookInputSearch = (props) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const {handleQuerySearch} = props
  
  const formStyle = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (value) => {
    //console.log('check value =>>', value)
    //http://localhost:8080/api/v1/user?current=1&pageSize=2&fullName=/abc/i
    const {mainText ,author, category} = value
    let querySearch = ``;
    if(mainText){
      querySearch+=`&mainText=/${mainText}/i`
    }
    if(author){
      querySearch+=`&mainText=/${author}/i`
    }
    if(category){
      querySearch+=`&mainText=/${category}/i`
    }
    handleQuerySearch(querySearch)
  };

  return (
    <>
      <Form name="advanced_search" style={formStyle} form={form} onFinish={onFinish}>
        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`mainText`}
              label={"Tên sách"}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`author`}
              label={"Tác giả"}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              labelCol={{ span: 24 }}
              name={`category`}
              label={"Thể loại"}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right", marginTop: "15px" }}>
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button
              style={{ marginLeft: "15px" }}
              onClick={()=>form.resetFields()}
            >
              Clear
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default BookInputSearch;
