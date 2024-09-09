import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../main.css';
import { MyContext } from '../MycontextProviders';
import { faUser, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { getData, getDataById, deleteData } from '../Service/Service';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setcartProductListByCust, setProductByCategory, setSelectedCategoryId } from '../Features/CartSlice.js';

const Navbar = () => {
  const dispatch = useDispatch();
  const cartProductListByCustomer = useSelector((state) => state.cartProduct.cartProductListByCust);

  const navigate = useNavigate();
  const { loggedUserData, updateLoggedUserData } = useContext(MyContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [cartProductList, setCartProductList] = useState([]);
  const [show, setShow] = useState(false);
  const [navbarVisible, setNavbarVisible] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [productByCategory, setproductByCategory] = useState([]);
  const customerId = loggedUserData.custId;

  const getAllCategory = () => {
    try {
      getData('GetAllCategory').then(result => {
        if (result !== undefined) {
          setAllCategory(result);
        } else {
          toast.error('Error in fetching Categories');
        }
      })
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleShowDropdown = () => {
    setShowDropdown(true);
  }

  const handleHideDropdown = () => {
    setShowDropdown(false);
  }

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  const getCartProductListByCustId = async (customerId) => {
    try {
      const result = await getDataById(`GetCartProductsByCustomerId?id=${customerId}`);
      if (result !== undefined) {
        dispatch(setcartProductListByCust(result));
      } else {
        toast.error('Error in fetching cart Products');
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (show) {
      getCartProductListByCustId(loggedUserData.custId);
    }
  }, [show, loggedUserData.custId]);

  const resetLoginData = () => {
    updateLoggedUserData('');
    localStorage.clear();
    navigate('/');
  }

  const naviagteToCheckOut = () => {
    navigate("/checkOut");
    
  };

  const getProductByCategory = (categoryId) => {
    try {
      getDataById(`GetAllProductsByCategoryId?id=${categoryId}`).then(result => {
        if (result !== undefined) {
          dispatch(setProductByCategory(result));
          dispatch(setSelectedCategoryId(categoryId));
        } else {
          toast.error('Error in fetching products by category');
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const deleteCartItem = (cartId) => {
    try {
      deleteData(`DeleteProductFromCartById?id=${cartId}`).then(result => {
        if (result) {
          toast.success('Cart Item deleted Successfully');
          getCartProductListByCustId(customerId);
        }
      })
    } catch (error) {
      console.error(error);
    }
  }

  const increaseQuantity = (cartItem) => {
    const updatedCartItem = { ...cartItem, quantity: cartItem.quantity + 1 };
    updateCartItem(updatedCartItem);
  };

  const decreaseQuantity = (cartItem) => {
    if (cartItem.quantity > 1) {
      const updatedCartItem = { ...cartItem, quantity: cartItem.quantity - 1 };
      updateCartItem(updatedCartItem);
    }
  };

  const updateCartItem = (updatedCartItem) => {
    const updatedCartList = cartProductListByCustomer.map((item) =>
      item.cartId === updatedCartItem.cartId ? updatedCartItem : item
    );
    dispatch(setcartProductListByCust(updatedCartList));
  };

  return (
    <div>
      {
        navbarVisible && loggedUserData && loggedUserData.name !== undefined && (
          <nav className="navbar navbar-expand-lg navbar-light nav-yellow border-bottom border-top p-0" style={{ backgroundColor: '#81c408' }}>
            <div className="container">
              <a className="navbar-brand fs-4 fw-bold " href="#">
                <span className="textBlur"><FontAwesomeIcon icon={faShoppingCart} style={{ color: 'red' }} />bigBasket</span>
              </a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0  text-center ">
                  <li className="nav-item dropdown position-relative d-inline-block"
                    onMouseLeave={handleHideDropdown}>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                      onMouseEnter={handleShowDropdown}
                      role="button"
                      aria-expanded={showDropdown ? 'true' : 'false'}
                    >
                      Categories
                    </a>
                    <ul style={{ maxHeight: '500px', maxWidth: '220px', overflowY: 'auto' }}
                      className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                      aria-labelledby="navbarDropdown"
                      onMouseEnter={handleShowDropdown}
                      onMouseLeave={handleHideDropdown}
                    >
                      {
                        allCategory.map((category, index) => (
                          <li key={index} className="dropdown-item"  >
                            <a href="#" style={{ textDecoration: 'none', color: 'black' }} onClick={() => getProductByCategory(category.categoryId)}>{category.categoryName}</a>
                            {index !== allCategory.length - 1 && <hr className="dropdown-divider" />}
                          </li>
                        ))
                      }
                    </ul>
                  </li>
                  <li className="nav-item dropdown position-relative d-inline-block" onMouseLeave={handleHide}>
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown3"
                      role="button"
                      data-bs-toggle="dropdown"
                      onMouseOver={handleShow}
                      aria-expanded={show ? 'true' : 'false'}
                    >
                      <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'black' }} />
                      <i className="fa fa-cart-shopping fs-5 me-1" style={{ color: '#202122' }}></i>
                    </a>
                    <ul
                      className={`dropdown-menu menuOnLeft rounded-0 mt-2 ${show ? 'show' : ''}`}
                      aria-labelledby="navbarDropdown"
                    >
                      {cartProductListByCustomer.map((cartItem, index) => (
                        <li key={index} className="p-2">
                          <div className="d-flex border-bottom justify-content-between align-items-center">
                            <img className="image-fluid" src={cartItem.productImageUrl} alt="" />
                            <div>
                              <a href="#" className="text-decoration-none text-black fw-semibold">
                                <p className="m-0 p-0">{cartItem.productShortName}</p>
                              </a>
                              <p>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => decreaseQuantity(cartItem)}
                                >
                                  -
                                </button>
                                <span>{cartItem.quantity}</span>
                                <button
                                  className="btn btn-sm btn-primary"
                                  onClick={() => increaseQuantity(cartItem)}
                                >
                                  +
                                </button>
                                * <i className="fa-solid fa-xmark" style={{ color: '#0d0d0d' }} ></i> ${cartItem.productPrice}
                              </p>
                            </div>
                            <button type="button" className="btn fs-5 closeBtn" onClick={() => deleteCartItem(cartItem.cartId)}>
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </li>
                      ))}
                      <li className="p-2">
                        <div className="d-flex justify-content-between">
                          <h6>SubTotal :</h6>
                          <h6>${cartProductListByCustomer.reduce((total, item) => total + item.productPrice * item.quantity, 0).toFixed(2)}</h6>
                        </div>
                        <div className="d-flex justify-content-evenly mt-2">
                          <button className="btn btn-dark rounded-0 px-3">View Cart</button>
                          <button className="btn btn-danger rounded-0 px-3" ><a className="text-decoration-none text-black" href="#" onClick={naviagteToCheckOut}>Checkout</a></button>
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown3" role="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <FontAwesomeIcon icon={faUser} style={{ color: 'black' }} />
                      <i className="fa fa-cart-shopping fs-5 me-1" style={{ color: '#202122' }} ></i>
                    </a>
                  </li>
                  <li>
                    <a className="nav-link" href="#" id="navbarDropdown3" role="button"
                      data-bs-toggle="dropdown" aria-expanded="false">
                      <button className='btn btn-md btn-outline-danger' onClick={resetLoginData}>LogOut </button>
                      <a className="navbar-brand fs-4 fw-bold " href="#">
                        &nbsp; &nbsp;<span className="textBlur" style={{ color: 'red' }}>{loggedUserData.name}</span>
                      </a>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>)
      }
    </div>
  );
};

export default Navbar;
