import React, { Component } from 'react'
import {Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div>
        <div className="bg-blue-400">
            <div className="bg-gray-50 max-w-md mx-auto h-screen">
            
            <div className="pt-28 mb-10 font-sans text-3xl text-center font-semibold">
              Continue as
            </div>

            <Link to="/shop">
            <img src="https://img.freepik.com/free-vector/cartoon-style-cafe-front-shop-view_134830-697.jpg" className="mx-auto h-48 w-76"/>
            </Link>

            <Link to="/user">
            <img src="https://www.flippingheck.com/wp-content/uploads/2019/11/feat-15-apps-students.jpg" className="mx-auto h-48 w-76 mt-14"/>
            </Link>
            </div>
        </div>
        </div>
    )   
}

export default Navbar;