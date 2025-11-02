import { useEffect, useState } from "react";
import {loginWithEmail} from '../services/user';
import { login } from "../slices/userSlice";
import { UseDispatch, useDispatch } from "react-redux";
import { errorAlert, successAlert } from "../utils/alerts";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../utils/validations";

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        console.log("handleSubmit", e.target.email.value, e.target.password.value)

        const email = e.target.email.value
        const password = e.target.password.value

        if(emailValidation(email)==false)
        {
            errorAlert("Enter a valid Email.");
            return;
        }
        
        if(password==="")
        {
            errorAlert("Enter your password.");
            return;
        }

        const response = await loginWithEmail(email, password);
        
        if(response && response.status)
        {

            dispatch(login({"jwt":response.data.accessToken, "role":response.data.user.role, "isLoggedin":true}));
            successAlert("Logged in Successfully.")
            navigate("/applications");
            
            const userData = {
                jwt: response.data.accessToken,
                role: response.data.user.role,
                isLoggedin: true
            };
            localStorage.setItem('user', JSON.stringify(userData));

        }
        else if(response && response.status == false && response.error)
        {
            errorAlert(response.error);
        }
        else
        {
            errorAlert("Error Logging in")
        }
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="p-8 rounded-lg shadow-lg w-full max-w-md login-signup-form">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 rounded text-white border border-gray-600 focus:border-blue-500 focus:outline-none"
                            required
                        />
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-6 mt-4 rounded hover:bg-blue-700 transition duration-200"
                        >
                            Login
                        </button>
                    </div>

                    <div className="text-center">
                        <p>Don't have an account? <a href="/signup" className="text-blue-500 hover:text-blue-400">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;