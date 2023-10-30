import {
  InputNumber,
  Empty,
  Row,
  Col,
  Divider,
  message,
  Radio,
  Form,
  Input,
  Button
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doUpdateCartAction,
  doRemoveCartAction,
} from "../../redux/order/orderSlice";

doUpdateCartAction;
const Payment = (props) => {
  const { setCurrentStep } = props;
  const orderCart = useSelector((state) => state.order.carts);
  const user = useSelector(state => state.account.user)
  const [totalPrice, setTotalPrice] = useState(0);

  const dispatch = useDispatch();
  console.log("user", user);

  const handleOnchangeInput = (value, book) => {
    if (!value || value < 1) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book, _id: book._id })
      );
    }
    //console.log('changed', value);
  };
  const handleRemoveCart = (id) => {
    dispatch(doRemoveCartAction({ _id: id }));
  };

  useEffect(() => {
    let sum = 0;
    orderCart.map((item) => {
      sum += item.detail.price * item.quantity;
    });
    setTotalPrice(sum);
  }, [orderCart]);

  const onFinish = () => {

  }

  return (
    <>
      <Row gutter={[20, 20]}>
        {orderCart?.length === 0 ? (
          <Col className="col-left" md={18} sm={24} xs={24}>
            <div className="col-empty">
              <Empty
                className="empty-item"
                description={<span>Không có sản phẩm nào trong giỏ hàng</span>}
              />
            </div>
          </Col>
        ) : (
          <Col className="col-left" md={16} sm={24} xs={24}>
            {orderCart?.map((book) => {
              return (
                <Col className="order-item">
                  <div className="order-image">
                    <img
                      src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${
                        book?.detail?.thumbnail
                      }`}
                      alt="imgOrder"
                    />
                  </div>

                  <div className="order-name">{book?.detail?.mainText}</div>
                  <div className="order-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(book?.detail?.price ?? 0)}
                  </div>
                  <div className="order-input">
                    <InputNumber
                      min={1}
                      value={book?.quantity}
                      onChange={(value) => handleOnchangeInput(value, book)}
                    />
                  </div>
                  <div className="order-total">
                    Tổng:
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(book?.detail?.price * book?.quantity ?? 0)}
                  </div>
                  <div
                    className="order-remove"
                    onClick={() => handleRemoveCart(book?.detail?._id)}
                  >
                    <DeleteTwoTone twoToneColor="#eb2f96" />
                  </div>
                </Col>
              );
            })}
          </Col>
        )}

        <Col className="col-right" md={8} sm={24} xs={24}>
          <Row className="wrapper-right-pay">
            <div className="content-right">
              <Form
                name="basic"
                onFinish={onFinish}
                autoComplete="off"
                style={{gap:'5px'}}
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Tên người nhận"
                  name="username"
                  initialValue={user?.fullName}
                  rules={[
                    { required: true, message: "Tên người nhận không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }} 
                  label="Số điện thoại"
                  initialValue={user?.phone}
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống!",
                    },
                  ]}
                >
                  <Input/>
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }} //whole column
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Địa chỉ không được để trống!",
                    },
                  ]}
                >
                  <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item 
                    label="Hình thức thanh toán"
                    labelCol={{ span: 24 }}
                >
                  <Radio
                    checked
                  >Thanh toán khi đặt hàng</Radio>
                </Form.Item>
                <Divider/>
                <Row style={{margin:'10px 0', gap:'15px'}}>
                    <Col>Tổng tiền</Col>
                    <Col>120000VND</Col>
                </Row>
                <Form.Item
                >
                  <Button type="primary" htmlType="submit" style={{width:'100%', height:'35px'}}>
                        Đặt hàng {`(${orderCart.length})`}
                  </Button>
                </Form.Item>
                
              </Form>
              
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Payment;
