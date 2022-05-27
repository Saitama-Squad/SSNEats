import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AsyncLocalStorage from '@createnextapp/async-local-storage';
import axios from 'axios';
import Cart from './Cart';
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function DashboardC(props) {

    // const [loginData, setLoginData] = useState(null);
    //console.log(props);
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

    const [menuList, setMenuList] = useState([]);
    const [menuCount, setMenuCount] = useState({});
    const [category, setCategory] = useState("All");
    const [total, setTotal] = useState(0);

    const showMenu = () => {
        console.log("getting data from backend");
        axios.get('http://localhost:5000/getMenu')
            .then(response => {
                setMenuList(response.data);
            })
            .catch(error => {
                console.log(error);
            })

        console.log(menuList);
    };

    const itemPick = (item) => {
        setTotal(total + 1);
        console.log('picked: ' + item.name);
        if (setMenuCount[item.name] === undefined)
            setMenuCount[item.name] = 1;
        else
            setMenuCount[item.name] = 1 + setMenuCount[item.name];
        //console.log(setMenuCount[item.name]);
    };

    const openCart = () => {
        console.log("hello");
        <Cart />
    }

    return (
        <div>
            {
                loginData ? (
                    <div>
                        <button className="mt-3 ml-3 px-12 py-2 bg-yellow-500 text-white hover:bg-yellow-600 rounded-full outline-2 hover:outline-yellow-600" onClick={() => { handleLogout() }}>Logout</button>
                        <h3 className="ml-3">{(JSON.parse(localStorage.getItem('loginData')).email)}</h3>

                        <Link to={{
                            pathname: "/cart",
                            state: {
                                item: menuList,
                                count: Object.values(setMenuCount)
                            }
                        }} >
                            <div className="w-32 ...">
                                <button className="m-3 bg-red-500 text-white hover:bg-red-700 rounded-full outline-2 hover:outline-yellow-600 absolute top-0 right-0 h-16 w-16 ..." >cart: {total}</button>
                            </div>
                        </Link>

                        <div className='mx-auto w-fit mt-4'>
                            <button className="w-32 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => showMenu()}>
                                Show Menu
                            </button>
                        </div>
                        <div className='mx-auto w-fit mt-4'>
                            Category:
                            <select onChange={(e) => setCategory(e.target.value)}>
                                <option value="All" >All</option>
                                <option value="Drinks">Drinks</option>
                                <option value="Main Course">Main Course</option>
                                <option value="Starters">Starters</option>
                                <option value="Snacks">Snacks and Chaat</option>
                            </select>
                        </div>
                        <div className='mt-8'>
                            {
                                menuList.map((item) => {
                                    if (setMenuCount[item.name] === undefined) {
                                        setMenuCount[item.name] = 0;
                                        console.log(item);
                                    }

                                    if (item.category == category || category == "All") {
                                        return (
                                            <div className='mx-auto w-2/5 h-24 bg-amber-300 border-2 backdrop-blur-0 m-4 rounded-md hover:bg-amber-500 p-1 hover:scale-105 transition ease-in-out duration-200' onClick={() => { itemPick(item) }}>
                                                <div className='text-xl float-right'> {item.price}.00</div>
                                                < div className='text-xl inline' > {item.name} </div>
                                                {
                                                    item.vegetarian ?
                                                        <div className='inline text-green-700'>
                                                            <FontAwesomeIcon icon={faSquare} />
                                                        </div>
                                                        :
                                                        <div className='inline text-red-700'>
                                                            <FontAwesomeIcon icon={faSquare} />
                                                        </div>
                                                }
                                                <div className='text-zinc-800 italic'>{item.category}</div>
                                                <div className='mb-0 p-0 text-xl float-right'> Q: {setMenuCount[item.name]} </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
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

export default DashboardC