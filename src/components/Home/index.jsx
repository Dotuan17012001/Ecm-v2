import { Col, Row, Form, Checkbox, Divider, InputNumber, Button, Rate, Tabs,  Spin } from 'antd';
import { FilterTwoTone, ReloadOutlined } from '@ant-design/icons';
import './home.scss'
import { useEffect, useState } from 'react';
import { getBookCategory, getListBookWithPaginate } from '../../services/api';
import { Pagination } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [form] = Form.useForm()

    const [isLoading, setIsLoading] = useState(false)
    const [listCategory, setListCategory] = useState([])
    const [listBook, setListBook] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(2)
    const [sortQuery, setSortQuery] = useState('&sort=-sold')
    const [filter, setFilter] = useState('')

   const navigate = useNavigate()

    const items = [
        {
            key: '&sort=-sold',
            label: 'Phổ biến',
            children: <></>
        },
        {
            key: '&sort=-updatedAt',
            label: 'Hàng mới',
            children: <></>
        },
        {
            key: '&sort=price',
            label: 'Giá thấp đến cao',
            children: <></>
        },
        {
            key: '&sort=-price',
            label: 'Giá cao đến thấp',
            children: <></>
        },
    ]

    const handleChangeFilter = (changedValues, values) => {
        //console.log('handle changedValues, values =>', changedValues, values)
        if(changedValues.category){
            const listCateFilter = values.category
            if(listCateFilter && listCateFilter.length > 0){
                const dataFilter = listCateFilter.join(',') 
                setFilter(`&category=${dataFilter}`)
            }else{
                setFilter('')
            }
        }
    }
    
    useEffect(() => {
        const fetchBookCategory = async() => {
            const res = await getBookCategory()
            if(res && res.data){
                const listCate = res.data.map(item => {
                    return {label:item, value:item}
                })
                setListCategory(listCate)
            }
        }
        fetchBookCategory()
    }, []);

    useEffect(() => {
        const fetchListBook = async () => {
            setIsLoading(true)
            let query = `current=${currentPage}&pageSize=${pageSize}`

            if(filter){
                query+=filter
            }

            if(sortQuery){
                query+=sortQuery
            }

            if(query){
               const res = await getListBookWithPaginate(query)
               //console.log('checkListBook',res)
               if(res && res?.data){
                    setListBook(res.data.result)
                    setCurrentPage(+res.data.meta.current)
                    setPageSize(+res.data.meta.pageSize)
                    setTotal(res.data.meta.total)
                    setIsLoading(false)
               }
            }
        }
        fetchListBook()
        
    }, [pageSize, currentPage, sortQuery, filter]);


    const handleOnChangePage = (curr, size) => {
       //console.log(curr, size);
        if(curr!== currentPage){
            setCurrentPage(curr)
           
        }
        if(size !== pageSize){
            setPageSize(size)
            setCurrentPage(1)
        }
    };

    const onChangeKey = (key) => {
        if(key){
            setSortQuery(key)
        }
    }

    const onFinish = (values) => {
        console.log('value', values)
        if(values?.range?.from >= 0 && values?.range?.to >= 0){
            let rangeFilter = `&price>=${values.range.from}&price<=${values.range.to}`
            if(values?.category?.length){
                const listCate = values.category.join(',');
                rangeFilter += `&category=${listCate}`
            }
            setFilter(rangeFilter)
        }
        
    }

    const toNonAccentVietnamese = (str) => {
        str = str.replace(/A|Á|À|Ã|Ạ|Â|Ấ|Ầ|Ẫ|Ậ|Ă|Ắ|Ằ|Ẵ|Ặ/g, "A");
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/E|É|È|Ẽ|Ẹ|Ê|Ế|Ề|Ễ|Ệ/, "E");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/I|Í|Ì|Ĩ|Ị/g, "I");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/O|Ó|Ò|Õ|Ọ|Ô|Ố|Ồ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ỡ|Ợ/g, "O");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/U|Ú|Ù|Ũ|Ụ|Ư|Ứ|Ừ|Ữ|Ự/g, "U");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, "Y");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/Đ/g, "D");
        str = str.replace(/đ/g, "d");
        // Some system encode vietnamese combining accent as individual utf-8 characters
        str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // Huyền sắc hỏi ngã nặng 
        str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // Â, Ê, Ă, Ơ, Ư
        return str;
  }

  const convertSlug = (str) => {
    str =  toNonAccentVietnamese(str)
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();
  
    // remove accents, swap ñ for n, etc
    var from = "ÁÄÂÀÃÅČÇĆĎÉĚËÈÊẼĔȆĞÍÌÎÏİŇÑÓÖÒÔÕØŘŔŠŞŤÚŮÜÙÛÝŸŽáäâàãåčçćďéěëèêẽĕȇğíìîïıňñóöòôõøðřŕšşťúůüùûýÿžþÞĐđßÆa·/_,:;";
    var to   = "AAAAAACCCDEEEEEEEEGIIIIINNOOOOOORRSSTUUUUUYYZaaaaaacccdeeeeeeeegiiiiinnooooooorrsstuuuuuyyzbBDdBAa------";  
    for (var i = 0, l = from.length; i < l; i++) {
      str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }
  
    str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
             .replace(/\s+/g, '-') // collapse whitespace and replace by -
             .replace(/-+/g, '-'); // collapse dashes
  
    return str;
  };

  const handleOnClickBook = (book) => {
    const slug = convertSlug(book.mainText);
    navigate(`/book/${slug}/?id=${book._id}`)
  }
  console.log('listBook=>', listBook);
    return (
        <>
        <div className="body-container">
           <div className="home-container">
                <Row gutter={[20, 20]}>
                    <Col md={4} sm={0} xs={0} className='col-left'>
                        <div className="wrapper-left">
                            <div className='filter-header'>
                                <span>
                                    <FilterTwoTone />
                                    Bộ lọc tìm kiếm
                                </span>
                                <ReloadOutlined onClick={() => {form.resetFields(), setFilter('')}}/>
                            </div>
                            <Divider/>
                            <Form 
                                form={form}
                                onValuesChange={(changedValues, values)=>handleChangeFilter(changedValues, values)}
                                onFinish={onFinish}
                            >
                                <Form.Item
                                    name={"category"}
                                    label = 'Danh mục sản phẩm'
                                    labelCol={{span:24}}
                                >
                                    <Checkbox.Group>
                                        <Row >
                                            {listCategory?.map((category, index) => {
                                                return (
                                                    <Col span={24} key={`index-${index}`} style={{padding:'7px 0'}}>
                                                        <Checkbox value={`${category.value}`}>
                                                        {`${category.label}`}
                                                        </Checkbox>
                                                    </Col>
                                                )
                                            })}
                                            
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
                                            onClick={() => form.submit()}
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
                        </div>
                    </Col>
                    <Col md={20} xs={24} className='col-right'>
                        <Spin spinning={isLoading} tip={'Loading...'}>
                             <div className='wrapper-right'>
                                <Row>
                                    <Tabs defaultActiveKey='1' items={items} onChange={onChangeKey}/>
                                </Row>
                                <Row>
                                    <div className="customize-row">
                                        {listBook?.map((book, index) => {
                                            return (
                                                <div className="column" key={`index-${index}`} onClick={()=>handleOnClickBook(book)}>
                                                <div className="wrapper">
                                                    <div className="thumbnail">
                                                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${book.thumbnail}`} alt="thumbnail book" />
                                                    </div>
                                                    <div className="bottom-content">
                                                        <div className="text">{book.mainText}</div>
                                                        <div className="price">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(`${book.price}`)}
                                                        </div>
                                                        <div className="rating">
                                                            <Rate value={5} disabled style={{ color: '#ffce3d', fontSize: 10 }} />
                                                            <span>{`Đã bán ${book.sold}`}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            )
                                        })}
                    
                                    </div>
                                </Row>
                             </div>
                        <div style={{marginTop: 30}}></div>
                       <Divider/>
                       <Row style={{ display: "flex", justifyContent: "center" }}>
                       <Pagination
                            showSizeChanger
                            onChange={(curr, size) => handleOnChangePage(curr, size)}
                            pageSize={pageSize}
                            current={currentPage}
                            total={total}
                            responsive
                        />
                       </Row>
                    </Spin>
                    </Col>
                </Row>
           </div>
        </div>
        </>
    )
}

export default Home;