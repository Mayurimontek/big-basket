import React, { useState } from 'react';
import { postData } from '../Service/Service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Registration = () => {
    const navigate = useNavigate();
    const [registerObj, setregisterObj] = useState({
        "custId": 0,
        "name": "",
        "mobileNo": "",
        "password": ""
    });
    const resetObject =()=>{
        setregisterObj(
            {"custId": 0,
        "name": "",
        "mobileNo": "",
        "password": ""})
    }
   
    const handleChange=(e)=>{
        setregisterObj({...registerObj,[e.target.name]:e.target.value})
    }
    const register =()=>{
        try {
            
            postData('RegisterCustomer',registerObj).then(result=>{
                if(result!=undefined){
                    toast.success('Registration successfull...!');
                    resetObject();
                    navigate("/");
                }
                else{
                    toast.alert('Registration failed...!');
                }
            });
        } catch (error) {
            alert(error);
        }
       
    }
    const navigatetoLogin =()=>{
        navigate("/login");
    }
    return (
        <div>
            <div className='container w-50 x-auto'>
                <div className="card">
                    <div className="card-header text-center" style={{ backgroundColor: '#81c408' }}>
                        Register
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-3 d-flex align-items-center justify-content-end'>
                                <label className='mb-0'> Name :</label>
                            </div>
                            <div className='col-9'>
                                <input type="text" className='form-control' name="name" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 d-flex align-items-center justify-content-end'>
                                <label className='mb-0'>Mobile :</label>
                            </div>
                            <div className='col-9'>
                                <input type="text" className='form-control' name="mobileNo" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 d-flex align-items-center justify-content-end'>
                                <label className='mb-0'>Password :</label>
                            </div>
                            <div className='col-9'>
                                <input type="text" className='form-control' name="password" onChange={handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <div className='row '>
                            <div className='col-3'></div>
                            <div className='col-6 text-center'>

                                <button className='btn btn-md btn-primary' onClick={register} >Register</button>
                                <button className='btn btn-md btn-danger m-2' onClick={navigatetoLogin}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;