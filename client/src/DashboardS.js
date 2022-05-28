import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import { render } from 'react-dom';
import { GoogleLogin } from 'react-google-login';
import { Router, Route, Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import axios from 'axios';

function DashboardS(props) {

    const sendItem = () => {
        console.log(name, price, category, vegetarian);
        axios.post('http://localhost:5000/addItem/', {
            'name': name,
            'price': price,
            'category': category,
            'vegetarian': vegetarian
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error)
            })

        setName('');
        setPrice(0);
        setCategory('');
        setVegetarian(1);
        alert("Item added");
    }

    const [orderList, setOrderList] = useState([]);
    const [display, setDisplay] = useState(false);

    const showOrder = () => {
        console.log('showing order');
        axios.get('http://localhost:5000/getOrder')
            .then(response => {
                setOrderList(response.data);
                console.log(orderList);
            })
            .catch(error => {
                console.log(error);
            })

        setDisplay(true);
    }

    const Deliver = (orderid, orderno) => {
        console.log('delivered');
        console.log(orderid, orderno);
        axios.post('http://localhost:5000/deliverItem', { oid: orderid, ono: orderno }).then(res => { console.log(res) }).catch(err => { console.log(err) })
    }

    // const [loginData, setLoginData] = useState(null);
    console.log(props);
    const [loginData, setLoginData] = useState(null);

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setLoginData(null);
        props.history.push('/')
    };

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState("");
    const [vegetarian, setVegetarian] = useState(1);

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
                            <button className="mt-3 px-12 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full outline-2 hover:outline-yellow-600" onClick={() => { handleLogout() }}>Logout</button>
                            <h3 className="">{(JSON.parse(localStorage.getItem('loginData')).email)}</h3>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0"  >
                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Item Name
                            </div>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Item" onChange={(e) => setName(e.target.value)} value={name}></input>
                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Price
                            </div>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="00" onChange={(e) => setPrice(e.target.value)} value={price}></input>

                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Category
                            </div>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Starters" onChange={(e) => setCategory(e.target.value)} value={category}></input>

                            <div className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                                Vegetarian
                            </div>
                            <select onChange={(e) => setVegetarian(parseInt(e.target.value))}>
                                <option value='1' >Vegetarian</option>
                                <option value='0'>Non-Vegetarian</option>
                            </select>
                            <br></br>
                            <button className="text-center w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5 mx-auto" onClick={() => sendItem()}>
                                Add Items
                            </button>
                        </div>

                        <div className='mx-auto w-0 mt-5'>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showOrder()}>
                                Show Orders
                            </button>
                        </div>

                        {
                            display ? (
                                <div>
                                    {
                                        orderList.map((order) => {
                                            //console.log(order);

                                            if (order["delivered"] == false) {
                                                return (
                                                    <div className='mx-auto w-1/2'>
                                                        <div className='bg-amber-300 border-2 backdrop-blur-0 m-4 rounded-md hover:bg-amber-500 p-1 hover:scale-105 transition ease-in-out duration-200'>
                                                            <button className='float-right bg-red-500 text-white font-bold rounded m-3 p-1 hover:scale-105 hover:bg-green-200 hover:text-black' onClick={() => Deliver(order["_id"], order["orderno"])}>
                                                                Deliver Order
                                                            </button>
                                                            <div className='text-xl'>{order["orderno"]}</div>

                                                            {order["items"].map((item) => {
                                                                return (
                                                                    <div>
                                                                        <div>{item["name"]} -   {item["count"]}</div>
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>


                                                )
                                            }

                                        })
                                    }
                                </div>
                            ) :
                                <h2>Nope</h2>
                        }
                    </div >
                ) :
                    (
                        <div>
                            {/* <Redirect push to="/dashboard"/>  */}
                            <p>Not logged in</p>
                            {/* <Redirect push to="/"/>  */}
                        </div>
                    )
            }
        </div >
    )
}

export default DashboardS