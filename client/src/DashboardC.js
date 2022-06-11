import { Button } from 'bootstrap';
import React, { Component, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cart from './Cart';
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faShoppingCart, faArrowDown } from '@fortawesome/free-solid-svg-icons';

const CartDiv = styled.div`
    position: relative;
    display: block;
    width: 28px;
    height: 28px;
    height: auto;
    margin-left: auto;
    margin-right: 20px;
    overflow: hidden;
    .material-icons {
      position: relative;
      top: 4px;
      z-index: 1;
      font-size: 24px;
      color: white;
    }
    `
const CartSpan = styled.span`
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      font-size: 11px;
      border-radius: 50%;
      background: #d60b28;
      width: 16px;
      height: 16px;
      line-height:16px;
      display: block;
      text-align: center;
      color: white;
      font-family: 'Roboto', sans-serif;
      font-weight: bold;
    `
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
            setMenuCount[item.name] = 0;
        else
            setMenuCount[item.name] = setMenuCount[item.name] + 1;
        console.log(setMenuCount[item.name]);
    };

    const removeItem = (item) => {
        if (total > 0)
            setTotal(total - 1);
        console.log('removed: ' + item.name);
        if (setMenuCount[item.name] === undefined)
            setMenuCount[item.name] = 0;
        else if (setMenuCount[item.name] > 0)
            setMenuCount[item.name] = setMenuCount[item.name] - 1;
        console.log(setMenuCount[item.name]);
        item.stopPropagation();
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
                            <CartDiv>
                                <CartSpan>{total}</CartSpan>
                                <span className='mr-5 '><FontAwesomeIcon size='xl' color='white' icon={faShoppingCart} /></span>
                            </CartDiv>
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
                                            <div className='mx-auto w-2/3 h-24 bg-white border-2 backdrop-blur-0 m-4 rounded-md hover:bg-white px-10 py-2 hover:scale-105 transition ease-in-out duration-200' onClick={(event) => event.currentTarget == event.target && itemPick(item)}>
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
                                                <div className='p-0 mb-5 ml-2 text-xl float-right'> Q: {setMenuCount[item.name]} </div>
                                                <CartDiv onClick={() => { removeItem(item) }}>
                                                    <span><FontAwesomeIcon size='xl' color='red' icon={faArrowDown} /></span>
                                                </CartDiv>

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