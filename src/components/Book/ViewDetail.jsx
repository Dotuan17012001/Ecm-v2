import ImageGallery from "react-image-gallery";
import "./book.scss";
import {  Row, Col, Rate, Divider, message } from "antd";
import { useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./ModalGallery";
import BookLoader from "./BookLoader";
import { useDispatch, useSelector } from "react-redux";
import { doAddBookAction } from "../../redux/order/orderSlice";
import { useNavigate } from "react-router-dom";

const ViewDetail = (props) => {

  const  {images, detailBook} = props
  const refGallery = useRef(null);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentQuantity, setCurrentQuantity] = useState(1);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const order = useSelector(state => state.order.carts)
  
 // console.log('order=>', order);
  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  const handleAddToCart = (quantity, detailBook) => {
    dispatch(doAddBookAction({quantity, _id:detailBook._id, detail:detailBook}))
    
  }


  const handleChangeButton = (type) => {
      if(type === 'MINUS'){
        if(currentQuantity - 1 <= 0){
          return
        }else{
          setCurrentQuantity( currentQuantity - 1)
        }
      }
      if(type === 'PLUS'){
        if(currentQuantity === +detailBook.quantity){
          return
        }else{
          setCurrentQuantity(currentQuantity + 1)
        }
      }
  }

  const handleChangeInput = (value) => {
    console.log('detailBook.quantity=>',detailBook.quantity);
      if(!isNaN(value)){
        if(+value > 0 && +value <= detailBook.quantity){
          setCurrentQuantity(+value)
        }
      }
  }


  return (
    <>
      <div style={{ background: "#efefef", padding: "20px 0", }}>
        <div className="view-detail-book">
          <div style={{ padding: "20px", background: "#fff", borderRadius: 5,  height:'580px' }}>
            {detailBook && detailBook?._id ? 
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <div className="img-gallery">
                <ImageGallery
                  className = 'img-ga'
                  ref={refGallery}
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  slideOnThumbnailOver={true}
                  onClick={() => handleOnClickImage()}
                  renderLeftNav={() => <></>}
                  renderRightNav={() => <></>}
                />
                </div>
              </Col>
              <Col md={14} sm={24} xs={24}>
                <Col md={0} sm={24} xs={24}>
                  <ImageGallery
                  //just active when responsive
                    ref={refGallery}
                    items={images}
                    showPlayButton={false} //hide play button
                    showFullscreenButton={false} //hide fullscreen button
                    renderLeftNav={() => <></>} //left arrow === <> </>
                    renderRightNav={() => <></>} //right arrow === <> </>
                    showThumbnails={false}
                  />
                </Col>
                <Col span={24}>
                  <div className="author">
                    Tác giả: <a href="#">{detailBook?.author}</a>{" "}
                  </div>
                  <div className="title">
                      {detailBook?.mainText}
                  </div>
                  <div className="rating">
                    <Rate
                      value={5}
                      disabled
                      style={{ color: "#ffce3d", fontSize: 12 }}
                    />
                    <span className="sold">
                      <Divider type="vertical" />
                      {detailBook?.sold}
                    </span>
                  </div>
                  <div className="price">
                    <span className="currency">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(detailBook?.price)}
                    </span>
                  </div>
                  <div className="delivery">
                    <div>
                      <span className="left">Vận chuyển</span>
                      <span className="right">Miễn phí vận chuyển</span>
                    </div>
                  </div>
                  <div className="quantity">
                    <span className="left">Số lượng</span>
                    <span className="right">
                      <button onClick={()=>handleChangeButton('MINUS')}>
                        <MinusOutlined />
                      </button>
                      <input 
                        type="text"
                        value={currentQuantity}
                        onChange = {(event) => handleChangeInput(event.target.value)}
                      />
                      <button  onClick={()=>handleChangeButton('PLUS')}>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button className="cart" onClick={() => handleAddToCart(currentQuantity,detailBook)}>
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now"
                      onClick={() => {
                        handleAddToCart(currentQuantity,detailBook)
                        navigate('/order')
                      }}
                    >Mua ngay</button>
                  </div>
                </Col>
              </Col>
            </Row>
            :
            <BookLoader/>
            }
          
          </div>
        </div>
        <ModalGallery
          isOpen={isOpenModalGallery}
          setIsOpen={setIsOpenModalGallery}
          currentIndex={currentIndex}
          items={images}
          title={"hardcode"}
        />
      </div>
    </>
  );
};

export default ViewDetail;
