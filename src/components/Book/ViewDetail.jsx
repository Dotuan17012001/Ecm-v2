import ImageGallery from "react-image-gallery";
import "./book.scss";
import { Button, InputNumber, Modal, Row, Col, Rate, Divider } from "antd";
import { useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { BsCartPlus } from "react-icons/bs";
import ModalGallery from "./ModalGallery";
import BookLoader from "./BookLoader";



const ViewDetail = (props) => {
  const  {images, detailBook} = props
  const refGallery = useRef(null);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  const onChange = (value) => {
    console.log("changed", value);
  };

  const handleOnClickImage = () => {
    //get current index onClick
    // alert(refGallery?.current?.getCurrentIndex());
    setIsOpenModalGallery(true);
    setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0);
    // refGallery?.current?.fullScreen()
  };

  return (
    <>
      <div style={{ background: "#efefef", padding: "20px 0" }}>
        <div
          className="view-detail-book"
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            minHeight: "calc(100vh - 150px)",
          }}
        >
          <div style={{ padding: "20px", background: "#fff", borderRadius: 5 }}>
            {detailBook && detailBook?._id ? 
            <Row gutter={[20, 20]}>
              <Col md={10} sm={0} xs={0}>
                <ImageGallery
                  ref={refGallery}
                  items={images}
                  showPlayButton={false}
                  showFullscreenButton={false}
                  slideOnThumbnailOver={true}
                  onClick={() => handleOnClickImage()}
                  renderLeftNav={() => <></>}
                  renderRightNav={() => <></>}
                />
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
                      <button>
                        <MinusOutlined />
                      </button>
                      <input defaultValue={1} />
                      <button>
                        <PlusOutlined />
                      </button>
                    </span>
                  </div>
                  <div className="buy">
                    <button className="cart">
                      <BsCartPlus className="icon-cart" />
                      <span>Thêm vào giỏ hàng</span>
                    </button>
                    <button className="now">Mua ngay</button>
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