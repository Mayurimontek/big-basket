import React, { useContext, useEffect, useState } from 'react';
import { getData, postData,getDataById } from '../Service/Service.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { MyContext } from '../MycontextProviders';
import { setCartProductList } from '../Features/CartSlice.js';
import { useDispatch, useSelector } from 'react-redux';

const Product = () => {
    
    const dispatch =useDispatch();
    const selectedCategoryId = useSelector((state) => state.selectedCategoryId);
    const cartProductList = useSelector((state)=>state.cart.cartProductList);
    const cartProductListByCategory = useSelector((state)=>state.productByCategory.cartProductListByCategory);
    const {loggedUserData ,updateLoggedUserData} = useContext(MyContext);
    useEffect(() => {
        getAllProducts();
    }, []);
    const [cartItemsobj, setcartItemsobj] = useState({
        "cartId": 0,
        "custId": '',
        "productId": 0,
        "quantity": 0,
        "addedDate": ""
    })
    const getAllProducts = async () => {
        try {
            getData('GetAllProducts').then(result => {
                if (result != undefined) {
                    dispatch(setCartProductList(result))
                }
                else {
                    alert('Error in fetching product list');
                }
            })
        } catch (error) {
            alert(error);
        }

    }
    const addToCart = (productId) => {
        
        try {
            const updatedCartItemsobj = {
                ...cartItemsobj,
                custId: loggedUserData.custId,
                productId: productId,
                quantity: 1,
                addedDate: new Date()
            };
    
            setcartItemsobj(updatedCartItemsobj);
            postData('AddToCart', updatedCartItemsobj).then(result => {
                
                if (result != undefined) {
                    toast.success(result.message);
                } else {
                    toast.alert(result.message);
                }
            });
        } catch (error) {
            alert(error);
        }
    }
    
    
    
    return (
        <div>
            <div className='container py-5'>
                <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px;" }}>
                    <h1 className="display-4">Bestseller Products</h1>
                    <p>Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which
                        looks reasonable.</p>
                </div>
                <div className='row'>
                <div className='row'>
                    {selectedCategoryId ? (
                        cartProductListByCategory.length > 0 ? (cartProductListByCategory.map((product, index) => {
                            return (
                                <div className='col-md-3 mb-4' key={index}>
                                    <div className="card" style={{ width: '100%' }}>
                                        <img className="card-img-top img-fluid" src={product.productImageUrl} alt="Card image cap" />
                                        <div className="card-body">
                                            <h5 className="card-title">{product.productName}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text"><span className="text-danger fw-semibold me-2">${product.productPrice}</span><del> $55.25</del>
                                                <span className="text-success ms-2">{product.deliveryTimeSpan}</span>
                                            </p>
                                            <div className="row">
                                                <div className="col-6">

                                                </div>
                                                <div className="col-6">
                                                    <p className="text-end pb-0 mb-0"><button onClick={() => addToCart(product.productId)}
                                                        className="btn  text-end btn-sm btn-success p-2">
                                                        <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'black' }} />
                                                    </button></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })) :(
                            <div className="col text-center">
                            <h3>No products available in this category</h3>
                        </div>
                        )
                        
                    ) : (cartProductList.length > 0 ? ( cartProductList.map((product, index) => {
                        return (
                            <div className='col-md-3 mb-4' key={index}>
                                <div className="card" style={{ width: '100%' }}>
                                    <img className="card-img-top img-fluid" src={product.productImageUrl} alt="Card image cap" />
                                    <div className="card-body">
                                        <h5 className="card-title">{product.productName}</h5>
                                        <p className="card-text">{product.description}</p>
                                        <p className="card-text"><span className="text-danger fw-semibold me-2">${product.productPrice}</span><del> $55.25</del>
                                            <span className="text-success ms-2">{product.deliveryTimeSpan}</span>
                                        </p>
                                        <div className="row">
                                            <div className="col-6">

                                            </div>
                                            <div className="col-6">
                                                <p className="text-end pb-0 mb-0"><button onClick={() => addToCart(product.productId)}
                                                    className="btn  text-end btn-sm btn-success p-2">
                                                    <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'black' }} />
                                                </button></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })):(
                        <div className="col text-center">
                        <h1>Loading...</h1>
                    </div>
                    )
                       
                    )}
                </div>
                </div>
            </div>
            
        </div>
    );
};

export default Product;
