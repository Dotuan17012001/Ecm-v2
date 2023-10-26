import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import ViewDetail from "../../components/Book/ViewDetail";
import { callGetDetailBook } from "../../services/api";
import './bookDetail.scss'


const BookPage = () => {
  const location = useLocation();
  let param = new URLSearchParams(location.search);
  const id = param?.get("id");

  const [detailBook, setDetailBook] = useState({})
  const [images, setImages] = useState([])

  useEffect(() => {
      fetchDetailBook()
  }, [id]);

  const fetchDetailBook = async() => {
    const res = await callGetDetailBook(id)
    if(res && res?.data){
       
        setTimeout(()=>{
          setDetailBook(res.data) //Make loading Effect
        },1000)
      
      let imagesRaw = []
      if(res?.data?.thumbnail){
        imagesRaw.push({
          original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${res.data.thumbnail}`,
          thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${res.data.thumbnail}`,
          originalClass: "original-image",
          thumbnailClass: "thumbnail-image"
        })
      }
      if(res?.data?.slider){
        res.data.slider.map((item)=>{
          imagesRaw.push({
            original: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
            thumbnail: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
            originalClass: "original-image",
            thumbnailClass: "thumbnail-image"
          })
        })
      }
      //console.log('checkIMG_RAW',imagesRaw)
      setTimeout(()=>{
        setImages(imagesRaw)  //Make loading Effect
      },1000)
    } 
  }

  return (
    <>
      <ViewDetail 
        images = {images} 
        detailBook ={detailBook}
      />
    </>
  );
};

export default BookPage;
