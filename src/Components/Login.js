import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData } from '../Service/Service';
import { MyContext } from '../MycontextProviders';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { updateLoggedUserData } = useContext(MyContext);
    const navigate = useNavigate();
    const [Name, setName] = useState('');
    const [password, setPassword] = useState('');

    const validate = () => {
        if (!Name || !password) {
            toast.error('Please enter both Username and Password');
            return false;
        }
        return true;
    };

    const handleLogin = () => {
        if (validate()) {
            try {
                debugger
                getData('GetAllCustomer').then(result => {
                    const users = result;
                    const allUsers = users.flat();
                    let isUserPresent = allUsers.find(user => user.name === Name && user.password === password);
                    if (isUserPresent) {
                        updateLoggedUserData(isUserPresent);
                        toast.success('Login Successfull...!');
                        localStorage.setItem('loginDetails', JSON.stringify(isUserPresent));
                        navigate("/Product");
                    } else {
                        toast.error('Login failed...!');
                    }
                })
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div>
            <div className='container w-50 x-auto mt-5'>
                <div className="card">
                    <div className="card-header text-center" style={{ backgroundColor: '#81c408' }}>
                        Login
                    </div>
                    <div className="card-body">
                        <div className='row'>
                            <div className='col-3 d-flex align-items-center justify-content-end'>
                                <label className='mb-0'>User Name :</label>
                            </div>
                            <div className='col-9'>
                                <input type="text" className='form-control' value={Name} onChange={(e) => setName(e.target.value)} />
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-3 d-flex align-items-center justify-content-end'>
                                <label className='mb-0'>Password :</label>
                            </div>
                            <div className='col-9'>
                                <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <div className='row '>
                            <div className='col-3'></div>
                            <div className='col-6 text-center'>
                                <button className='btn btn-md btn-primary m-2' onClick={handleLogin}>Login</button>
                                <button className='btn btn-md btn-success' onClick={navigateToRegister}>Register</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
