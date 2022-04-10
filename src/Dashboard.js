import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import {render} from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import {Router, Route, Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AsyncLocalStorage from '@createnextapp/async-local-storage'

function Dashboard(props) {

    // const [loginData, setLoginData] = useState(null);
    // console.log(props);
    const [loginData, setLoginData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
        props.history.push('/')
    };

    useEffect(() => {
        let login = localStorage.getItem('loginData')
        setLoginData(JSON.parse(login))
        // console.log(loginData)
    }, [])

    return (
        <div>
            {
                loginData ? (
                    <div>
                    <div className='flex flex-col items-end justify-center'>
                        <button className="mt-3 px-12 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full outline-2 hover:outline-yellow-600" onClick={() => {handleLogout()}}>Logout</button>
                        <h3 className="">{(JSON.parse(localStorage.getItem('loginData')).email)}</h3>
                        </div>
                    </div>
                ) :
                (
                    <div>
                        {/* <Redirect push to="/dashboard"/>  */}
                        <p>Not logged in</p>  
                        {/* <Redirect push to="/"/>  */}
                    </div>
                )
            }


        </div>        
    )

}

export default Dashboard