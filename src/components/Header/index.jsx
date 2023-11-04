import React, { useState } from 'react';
import { FaReact } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi';
import { VscSearchFuzzy } from 'react-icons/vsc';
import { Divider, Badge, Drawer, message, Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar, Popover,} from 'antd';
import { useNavigate } from 'react-router';
import { callLogout } from '../../services/api';
import './header.scss';
import { doLogoutAction } from '../../redux/account/accountSlice';
import { Link } from 'react-router-dom';
import ManageUser from '../Account/ManageUser';
//http://localhost:8080/images/avatar/21232f297a57a5a743894a0e4a801fc3.png

const Header = (props) => {
    const {searchTerm, setSearchTerm} = props
    const [openDrawer, setOpenDrawer] = useState(false);
    const isAuthenticated = useSelector(state => state.account.isAuthenticated);
    const user = useSelector(state => state.account.user);
    const carts = useSelector( state => state.order.carts)
    //console.log('checkCarts >>>', carts)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            dispatch(doLogoutAction());
            message.success('Đăng xuất thành công');
            navigate('/')
        }
    }

    const items = [
        {
            label: <label style={{ cursor: 'pointer' }} onClick={()=>setIsModalOpen(true)}>
                        Quản lý tài khoản
                    </label>,
            key: 'account',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => handleLogout()}
            >Đăng xuất</label>,
            key: 'logout',
        },
        {
            label: <label
                style={{ cursor: 'pointer' }}
                onClick={() => navigate('/history')}
            >Lịch sử đặt hàng</label>,
            key: 'history',
        },

    ];

    const text = <span>Sản phẩm mới thêm</span>;
    const content = (
      <div className='cart-wrapper'>
        {carts?.length > 0 ? carts?.map(item => {
            return (
                <>        
                <Row style={{gap:5, marginBottom:'7px'}}>
                    <Col>
                    <div className='cart-image'>
                        <img src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${item?.detail?.thumbnail}`} alt="#cartImg"/>
                    </div>
                    </Col>
                    <Col>{item?.detail?.mainText}</Col>
                    <Col style={{color:'red'}}>
                        {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                        }).format(item?.detail?.price)}
                    </Col>
                </Row>
                </>
            )
        }) : <>Chưa có sản phẩm trong giỏ hàng</>}   

        <div className='btn-view-cart'>
            <button
                onClick={()=>navigate('/order')}
            >Xem giỏ hàng</button>
        </div>

      </div>

    );

    
    if(user.role === 'ADMIN'){
        items.unshift({
            label: <label style={{ cursor: 'pointer' }}>
                <Link to='/admin'>Trang quản trị</Link>
            </label>,
            key: 'admin',
        })
    }
    return (
        <>
            <div className='header-container'>
                <header className="page-header">
                    <div className="page-header__top">
                        <div className="page-header__toggle" onClick={() => {
                            setOpenDrawer(true)
                        }}>☰</div>
                        <div className='page-header__logo'>
                            <span className='logo' onClick={()=>navigate('/')}>
                                <FaReact className='rotate icon-react' />
                                    <span className='text-logo'>TiPee Shop</span> 
                                <VscSearchFuzzy className='icon-search' />
                            </span>
                            <input
                                className="input-search" type={'text'}
                                placeholder="Bạn tìm gì hôm nay"
                                value={searchTerm}
                                onChange={(e)=>setSearchTerm(e.target.value)}
                            />
                        </div>

                    </div>
                    <nav className="page-header__bottom">
                        <ul id="navigation" className="navigation">
                            <li className="navigation__item">
                            <Popover 
                                placement="bottomRight"
                                title={text}
                                content={content}
                                arrow = {true}
                            >
                                <Badge
                                    count={carts?.length ? carts.length : 0}
                                    size={"small"}
                                    showZero
                                >
                                    <FiShoppingCart className='icon-cart'/>
                                </Badge>
                            </Popover>
                            </li>
                            <li className="navigation__item mobile"><Divider type='vertical' /></li>
                            <li className="navigation__item mobile">
                                {!isAuthenticated ?
                                    <span onClick={() => navigate('/login')}> Tài Khoản</span>
                                    :
                                    <Dropdown menu={{ items }} trigger={['click']}>
                                        <a onClick={(e) => e.preventDefault()}>
                                            <Space>
                                            <Avatar src={<img src={`http://localhost:8080/images/avatar/${user.avatar}`} alt="avatar" />} />
                                               <span style={{color:'black'}}>
                                                   Welcome {user?.fullName} 
                                               </span>
                                                <DownOutlined />

                                            </Space>
                                        </a>
                                    </Dropdown>
                                }
                            </li>
                        </ul>
                    </nav>
                </header>
            </div>
            <Drawer
                title="Menu chức năng"
                placement="left"
                onClose={() => setOpenDrawer(false)}
                open={openDrawer}
            >
                <p>Quản lý tài khoản</p>
                <Divider />

                <p>Đăng xuất</p>
                <Divider />
            </Drawer>

            <ManageUser 
                open = {isModalOpen}
                setOpen = {setIsModalOpen}
            />
        </>
    )
};

export default Header;
