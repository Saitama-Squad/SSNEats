import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Router, Route, Link} from 'react-router-dom';
import DashboardC from './DashboardC';
import DashboardS from './DashboardS';
import { Redirect } from 'react-router-dom';


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
    <div className="bg-blue-400">
      <div className="bg-gray-50 max-w-md mx-auto h-screen">
        <div className="pt-28 font-sans text-3xl text-center font-semibold">
            Login as {props.type}   
        </div>
        
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
            onClick={() => {
              console.log("click");
            }}
            />)
          }
        
        </div>
      </div>
    </div>
  );
}

export default Login;
