import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './loginValidation'; 
import axios from 'axios'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: '',
    password:'',
  })
  const navigate = useNavigate();
  const [errors, setErrors] = useState({})


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit =(event)=>{
    event.preventDefault();
    setErrors(Validation(values));

    if (errors.email === "" && errors.password === "") {
      axios.post('http://localhost:8081/signup/login', values)
        .then(res => {
          // Assuming response contains user data like name, email, and id
          const userData = res.data;
  
          // Storing user data in local storage
          localStorage.setItem('userData', JSON.stringify(userData));
          console.log(res);
          navigate('/nav/home');
        })
        .catch(err => console.log(err));
    }
    
   

  }

  

  const handleInput = (event)=>{
    setValues(prev => ({...prev, [event.target.name]:event.target.value}))

  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300 ">
      <div className="bg-gray-50 p-8 rounded shadow-md w-80">
      <h2 className='text-center font-bold text-[25px]'>LOGIN </h2>
        <form className="flex flex-col" action="" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block  font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name='email'
              id="email"
              placeholder="Enter Email..."
              onChange={handleInput}
              className="border border-slate-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500"  
            />
             {errors.email && <span className='text-red-600'>{errors.email}</span>}
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name='password'
                id="password"
                placeholder="Enter Password..."
                onChange={handleInput}
                className="border border-gray-300 rounded-md py-2 px-3 w-full focus:outline-none focus:border-indigo-500 pr-10"
               />
               {errors.password && <span className='text-red-600'>{errors.password}</span>}

              <button
                type="button"
                className="absolute top-0 right-0 mt-2 mr-3 focus:outline-none"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.071 12.021c.136-.454.429-.853.853-1.177a2 2 0 10-2.536-3.071 6 6 0 00-8.486 0 2 2 0 10-2.536 3.071c.424.324.717.723.853 1.177M12 15a3 3 0 100-6 3 3 0 000 6z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.75 8a4.95 4.95 0 00-1.638-.756A4.99 4.99 0 1012 17a4.99 4.99 0 003.388-1.324M8.048 8.244A8.041 8.041 0 014.799 9a8 8 0 105.135-4.118M12 12a2 2 0 100-4 2 2 0 000 4z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button type='submit' className="bg-indigo-500  text-white py-2 px-4 rounded focus:outline-none focus:bg-indigo-500 ">
            Log in
          </button>
          <Link
            to="/register"
            className="block text-center mt-4 border border-gray-300 py-2 px-4 rounded-md shadow-sm hover:bg-gray-100"
          >
            Register here
          </Link>
          {/* <Link
            to="/forgot-password"
            className="block text-center mt-2 text-gray-500 hover:underline"
          >
            Forgot Password?
          </Link> */}
        </form>
      </div>
    </div>
  );
 }

export default Login;
