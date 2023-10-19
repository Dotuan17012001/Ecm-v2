import { Col, Row, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs } from 'antd';
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import './home.scss'
import { useForm } from 'antd/es/form/Form';

const Home = () => {
    const [form] = useForm()
    const items = [
        {
            key: '1',
            label: 'Phổ biến',
            children: <></>
        },
        {
            key: '2',
            label: 'Hàng mới',
            children: <></>
        },
        {
            key: '3',
            label: 'Giá thấp đến cao',
            children: <></>
        },
        {
            key: '4',
            label: 'Giá cao đến thấp',
            children: <></>
        },
    ]
    return (
        <>
           <div className="home-container">
                <Row gutter={[20, 20]}>
                    <Col span={4} className='col-left'>
                        <div className='filter-header'>
                            <span>
                                 <FilterTwoTone />
                                 Bộ lọc tìm kiếm
                            </span>
                            <ReloadOutlined onClick={()=>form.resetFields()}/>
                        </div>
                        <Form form={form}>
                            <Form.Item
                                name={"Category"}
                                label = 'Danh mục sản phẩm'
                                labelCol={{span:24}}
                            >
                                <Checkbox.Group>
                                    <Row >
                                        <Col span={24}>
                                            <Checkbox value={"A"}>
                                                A
                                            </Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value={"B"}>
                                                B
                                            </Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value={"C"}>
                                                C
                                            </Checkbox>
                                        </Col>
                                        
                                        <Col span={24}>
                                            <Checkbox value={"D"}>
                                                D
                                            </Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value={"E"}>
                                                E
                                            </Checkbox>
                                        </Col>
                                        <Col span={24}>
                                            <Checkbox value={"F"}>
                                                F
                                            </Checkbox>
                                        </Col>
                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                            <Divider/>
                            <Form.Item
                                label = 'Khoảng giá'
                                labelCol={{span:24}}
                            >
                                <div className="price-range">
                                    <Form.Item name={["range","from"]}>
                                        <InputNumber
                                            name='from'
                                            min={0}
                                            placeholder='đ TỪ'
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                    <span></span>
                                    <Form.Item name={["range","to"]}>
                                        <InputNumber
                                            name='to'
                                            min={0}
                                            placeholder='đ ĐẾN'
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        />
                                    </Form.Item>
                                </div>
                                <div>
                                    <Button type='primary'
                                        onClick={()=>form.submit()}
                                        style={{width:'100%'}}
                                    >Áp dụng</Button>
                                </div>
                            </Form.Item>
                            <Divider/>
                            <Form.Item
                                label={'Đánh giá'}
                                labelCol={{span:24}}
                            >
                            <div>
                                <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text"></span>
                            </div>
                            <div>
                                <Rate value={4} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={3} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={2} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            <div>
                                <Rate value={1} disabled style={{ color: '#ffce3d', fontSize: 15 }} />
                                <span className="ant-rate-text">trở lên</span>
                            </div>
                            </Form.Item>
                        </Form>
                    </Col>
                    <Col span={20} className='col-right'>
                        <Row>
                            <Tabs defaultActiveKey='1' items={items}/>
                        </Row>
                        <Row>
                            <div className="customize-row">
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="wrapper">
                                        <div className="thumbnail">
                                            <img src="http://localhost:8080/images/book/3-931186dd6dcd231da1032c8220332fea.jpg" alt="thumbnail book" />
                                        </div>
                                        <div className="text">Tư Duy Về Tiền Bạc - Những Lựa Chọn Tài Chính Đúng Đắn Và Sáng Suốt Hơn</div>
                                        <div className="price">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(70000)}
                                        </div>
                                        <div className="rating">
                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                            <span>Đã bán 1k</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Row>
                    </Col>
                </Row>
           </div>
        </>
    )
}

export default Home;