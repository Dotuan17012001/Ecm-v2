import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Skeleton, Modal, Row, Col, Rate, Divider } from "antd";
import { useEffect, useRef, useState } from "react";

const BookLoader = () => {
    return ( 
        <>
            <Row gutter={[20,20]}>
                <Col md={10} sm={0} xs={0}>
                    <Skeleton.Input 
                        active = {true} 
                        style = {{width:'100%', height:'350px'}}
                        block = {true}
                    />
                    <div style={{display:'flex', justifyContent:'center', gap:'10px', marginTop:'20px'}}>
                    <Skeleton.Image active={true} />
                    <Skeleton.Image active={true} />
                    <Skeleton.Image active={true} />
                    </div>
                </Col>
                <Col md={14} sm={24}>
                    <Skeleton 
                        active={true}
                    />
                    <br />
                    <Skeleton 
                        active={true}
                        paragraph ={{rows:2}}
                    />
                    <br />
                    <div style={{display:'flex', gap:20, marginTop:60}}>
                    <Skeleton.Button active={true} style={{width:100}}/>
                    <Skeleton.Button active={true} style={{width:100}}/>
                    </div>
                </Col>
            </Row>
        </>
     );
}
 
export default BookLoader;