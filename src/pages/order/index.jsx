import {InputNumber, Empty, Row, Col, Divider, message, Steps,  Button, Result } from "antd";
import {DeleteTwoTone, SmileOutlined} from '@ant-design/icons';
import './order.scss'
import { useDispatch, useSelector } from "react-redux";
import { doUpdateCartAction, doRemoveCartAction } from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import ViewOrder from "../../components/Order/ViewOrder";
import Payment from "../../components/Order/Payment";
import { useNavigate } from "react-router-dom";


const OrderPage = () => {

    const [currentStep, setCurrentStep] = useState(0)
    const navigate = useNavigate()
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="steps-item">
                        <Steps
                            current={currentStep}
                            size="small"
                            items={[
                            {
                                title: 'Đơn hàng',    
                            },
                            {
                                title: 'Đặt hàng',
                            },
                            {
                                title: 'Thanh toán',        
                            },
                            ]}
                        />
                    </div>
                   {
                    currentStep === 0 && 
                    <ViewOrder setCurrentStep={setCurrentStep}/>
                    }
                    {currentStep === 1 && 
                     <Payment setCurrentStep={setCurrentStep}/>
                    }
                    {currentStep === 2 && 
                        <Result
                            icon={<SmileOutlined />}
                            title="Đặt hàng thành công!"
                            extra={<Button type="primary" onClick={()=>navigate('/')}>Xem lịch sử</Button>}
                        />
                    }
                </div>
            </div>
        </>
    )
}

export default OrderPage