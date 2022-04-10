import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import {Router, Route, Link} from 'react-router-dom';
import Dashboard from './Dashboard';
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
              <div>
                <Redirect push to="/dashboard"/> 
                {/* <h3>you are logged in as {loginData.email}</h3> */}
                {/* <button className="mx-auto px-12 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full outline-2 hover:outline-yellow-600" onClick={() => {handleLogout()}}>Logout</button> */}
              </div>
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
