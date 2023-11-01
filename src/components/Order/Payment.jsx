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
  Button,
  notification,
} from "antd";
import { DeleteTwoTone, LoadingOutlined } from "@ant-design/icons";
import "./payment.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doUpdateCartAction,
  doRemoveCartAction,
  doReplaceOrderAction
} from "../../redux/order/orderSlice";
import { callCreateOrder } from "../../services/api";

const Payment = (props) => {
  const { setCurrentStep } = props;
  const orderCart = useSelector((state) => state.order.carts);
  const user = useSelector((state) => state.account.user);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmit, setIsSubmit] = useState(false);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //console.log("orderCart", orderCart);

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

  const onFinish = async (value) => {
    setIsSubmit(true);
    console.log('value=>',value);
    const detailOrder = orderCart.map((cart)=>{
      return {    
        bookName: cart.detail.mainText,
        quantity: cart.quantity,
        _id: cart._id 
      }
    })
    const data = {
      name: value.name,
      address: value.address,
      phone: value.phone,
      totalPrice: totalPrice,
      detail:detailOrder
    }
    const res = await callCreateOrder(data)
    if(res && res.data){
      message.success('Đặt hàng thành công')
      dispatch(doReplaceOrderAction())
      setCurrentStep(2)
    }else{
      notification.error({
        message:'Đã có lỗi xảy ra',
        description:res.message
      })
    }
    setIsSubmit(false)

  };

  return (
    <>
      <Row gutter={[20, 20]}>
        {orderCart?.length === 0 ? (
          <Col className="col-left" md={16} sm={24} xs={24}>
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
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Tên người nhận"
                  name="name"
                  initialValue={user?.fullName}
                  rules={[
                    {
                      required: true,
                      message: "Tên người nhận không được để trống!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Số điện thoại"
                  initialValue={user?.phone}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Số điện thoại không được để trống!",
                    },
                  ]}
                >
                  <Input />
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
                  <Input.TextArea rows={4} />
                </Form.Item>
              </Form>

              <div className="info">
                <div className="method">
                  <div>Hình thức thanh toán</div>
                  <Radio checked>Thanh toán khi đặt hàng</Radio>
                </div>
              </div>
              <Divider style={{ margin: "5px 0" }} />
              <div className="total-price">
                <div>Tổng tiền</div>
                <div>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(totalPrice ?? 0)}
                </div>
              </div>
              <div className="btn-buy">
                <button 
                  onClick={() => form.submit()}
                  disabled = {isSubmit}
                >
                  {isSubmit === true && <LoadingOutlined/>}
                    Thanh toán {`(${orderCart.length})`}
                </button>
              </div>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Payment;
