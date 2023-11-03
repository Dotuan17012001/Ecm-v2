import CountUp from "react-countup";
import { Col, Row, Statistic, Card } from "antd";
import './dashboard.scss'
import { callGetDashboard } from "../../services/api";
import { useEffect, useState } from "react";

const AdminPage = () => {

  const formatter = (value) => <CountUp end={value} separator="," />
  const [dataDashBoard, setDataDashBoard] = useState(null)
  useEffect(()=>{
    fetchDataDashBoard()
  },[])

  const fetchDataDashBoard = async() => {
    const res = await callGetDashboard()
    console.log('dash',res);
    if(res && res.data){
        setDataDashBoard(res.data)
    }
  }
  return (
    <>
      <Row style={{padding:'30px'}}>
        <Col span={12}>
        <Card title="Total user"  style={{ width: 600 }}>
          <Statistic
           // title="Total Users"
            value={dataDashBoard?.countUser || 0}
            formatter={formatter}
          />
        </Card>
        </Col>
        <Col span={12}>
        <Card title="Total order" style={{ width: 600 }}>
          <Statistic
    
            value={dataDashBoard?.countOrder || 0}
            formatter={formatter}
          />
        </Card>
        </Col>
       
        
      </Row>
    </>
  );
};

export default AdminPage;
