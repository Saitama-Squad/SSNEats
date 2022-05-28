import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Router, Route, Link} from 'react-router-dom';
import DashboardC from './DashboardC';
import DashboardS from './DashboardS';
import { Redirect } from 'react-router-dom';
import logo from "./assets/logo.jpeg";
import Font from 'react-font';
import { Text } from './Navbar';
import styled from 'styled-components';

export const Heading = styled.h1`
  font-size: 40px;
  font-weight: 500;
  color: white;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 30px;
`;
const Button = styled.button`
  width: 300px;
  height: 100px;
`;
function Login(props) 
{
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  console.log("this was sent: ", props.type)

  const handleFailure = (result) => {
    alert(result);
  };
 
  // this is being sent to backend

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };

  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <div>
      <Font family='Monoton'>
        <Heading>
            Login as {props.type}   
        </Heading>
      </Font>
      <img src={logo} alt="logo" width={300} height={300} className="m-auto mt-20"/>
      <Font family='Ultra'>
        <Text className='text-white text-center'>No more waits </Text>
      </Font>
        <div className="text-center mt-10">
          {
            loginData ? (
              props.type == "Shop-Owner" ?
                  <Redirect push to="/dashboardS"/> 
              :
                  <Redirect push to="/dashboardC"/>
            ) 
            :
            (<GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Log in with Google"
            onSuccess={handleLogin}
            onFailure={handleFailure}
            cookiePolicy={'single_host_origin'}
            render={renderProps => (
              <button onClick={renderProps.onClick}>
                 <h1
                    href="#"
                    className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md bg-black hover:bg-gray-100"
                  >
                    <div className="px-4 py-3">
                      <svg className="h-6 w-6" viewBox="0 0 40 40">
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#FFC107"
                        />
                        <path
                          d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                          fill="#FF3D00"
                        />
                        <path
                          d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                          fill="#4CAF50"
                        />
                        <path
                          d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                          fill="#1976D2"
                        />
                      </svg>
                    </div>
                    <h1 className="px-4 py-3 w-5/6 text-center text-white hover:text-gray-600 font-bold">
                      Sign in with Google
                    </h1>
                  </h1>
              </button>
            )}
            onClick={() => {
              console.log("click");
            }}
            />)
          }
        </div>
    </div>
  );
}

export default Login;
