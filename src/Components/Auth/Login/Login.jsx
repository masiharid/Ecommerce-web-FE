import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { env } from '../../../config';

function Login() {
    let navigation = useNavigate();

    // Alert function
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    // Login Method
    let login = useFormik({
        initialValues: {
            Email: "",
            Password: ""
        },
        validate: (value) => {
            let errors = {};
            // Password validation
            if (value.Password.length <= 8) {
                errors.Password = "Password must be at least 8 characters";
            }
            return errors;
        },
        onSubmit: async (Login) => {
            try {
                let response = await axios.post(`${env.api}/Login`, Login);
                let user = response.data;
                if (user.token) {
                    Toast.fire({ icon: 'success', title: 'Signed in successfully' });
                    navigation('/Home', { state: { name: user.Username } });
                } else {
                    Toast.fire({ icon: 'warning', title: `${user.Message}` });
                }
            } catch (error) {
                Toast.fire({ icon: 'error', title: `${error.response.data.Message}` });
            }
        }
    });

    return (
        <div className="content fadeInDown">
            <div id="formContent">
                {/* Tabs Titles */}
                <h2 className='text-black'>Welcome</h2>

                {/* Login Form */}
                <form onSubmit={login.handleSubmit}>
                    <input type="text" id="login" className="fadeIn second" placeholder="Email" value={login.values.Email} onChange={login.handleChange} name="Email" required />
                    <input type="password" id="password" className="fadeIn third" placeholder="Password" value={login.values.Password} onChange={login.handleChange} name="Password" required />
                    <span className="text-warning">{login.errors.Password}</span>
                    <input type="submit" className="fadeIn fourth btn" id='butt' />
                </form>

                {/* Remind Password */}
                <div id="formFooter">
                    <a className="underlineHover" id='link' href="Recovery">Forgot Password?&nbsp;&nbsp;&nbsp;<span className="text-black">or</span>&nbsp;&nbsp;&nbsp;</a>
                    <a className="underlineHover" id='click' href="Register">Create new Account</a>
                </div>
                <div className="text-center">
                    <strong>For Testing</strong>
                    <br />
                    <h6>Email: masihakhanum08@gmail.com</h6>
                    <h6>Pass: Mas@1234</h6>
                </div>
            </div>
        </div>
    );
}

export default Login;