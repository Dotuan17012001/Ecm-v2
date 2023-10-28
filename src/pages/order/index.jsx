import { Button, InputNumber, Modal, Row, Col, Divider, message } from "antd";
import {DeleteTwoTone} from '@ant-design/icons';
import './order.scss'
import { useDispatch, useSelector } from "react-redux";
import { doUpdateCartAction, doRemoveCartAction } from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";


const OrderPage = () => {

    const orderCart = useSelector(state => state.order.carts)
    const [totalPrice, setTotalPrice] = useState(0)
    const dispatch = useDispatch()
    console.log('orderCart', orderCart);

    const handleOnchangeInput = (value, book) => {
        if(!value || value < 1) return;
        if(!isNaN(value)){
            dispatch(doUpdateCartAction({quantity:value, detail:book, _id:book._id}))
        }
        //console.log('changed', value);
    };
    const handleRemoveCart = (id) => {
        dispatch(doRemoveCartAction({_id:id}))
    }

    useEffect(()=>{
        let sum = 0;
        orderCart.map(item => {
            sum += item.detail.price * item.quantity
        })
        setTotalPrice(sum)
    },[orderCart])

    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <Row gutter={[20, 20]}>
                        <Col className='col-left' md={18} sm={24}  xs={24}>
                            {orderCart?.map(book => {
                                
                                return (
                                <Col className="order-item">
                                    <div className="order-image">
                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book?.detail?.thumbnail}`} alt="imgOrder" />
                                    </div>
                                    
                                        <div className="order-name">{book?.detail?.mainText}</div>
                                        <div className="order-price">
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(book?.detail?.price ?? 0)}
                                        </div>
                                        <div className="order-input">
                                            <InputNumber min={1} value={book?.quantity} onChange={(value) => handleOnchangeInput(value, book)} />
                                        </div>
                                        <div className="order-total">Tổng: 
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(book?.detail?.price * book?.quantity ?? 0)}
                                        </div>
                                        <div className="order-remove" onClick={()=>handleRemoveCart(book?.detail?._id)}>
                                            <DeleteTwoTone twoToneColor="#eb2f96"/>
                                        </div>
                                    
                                </Col>
                                )
                            })}
                           
                        </Col>
                        
                        <Col className='col-right' md={6} sm={24} xs={24}>
                            <Row className="wrapper-right">
                                <div className="content-right">
                                    <Row className="ct-bill" style={{justifyContent:'space-between'}}>
                                        <Col>Tam tinh</Col>
                                        <Col>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalPrice ?? 0)}
                                        </Col>
                                    </Row>
                                        <Divider/>
                                    <Row className="ct-bill" style={{justifyContent:'space-between'}}>
                                        <Col>Tong tien</Col>                               
                                        <Col>
                                        {new Intl.NumberFormat("vi-VN", {
                                            style: "currency",
                                            currency: "VND",
                                        }).format(totalPrice ?? 0)}
                                        </Col>
                                    </Row>
                                        <Divider/>
                                    <div className="btn-buy">
                                        <button>Mua hàng</button>      
                                    </div>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default OrderPage