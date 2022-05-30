import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import { Link } from 'react-router-dom';
//import QRCode from "react-qr-code";
import QRCode from 'qrcode.react';
import { useState } from 'react';

function Cart() {

    const location = useLocation()

    //list of the items
    console.log(location.state.item);

    //count of each items
    console.log(location.state.count);

    const orderlist = [];

    var price = 0;
    var orderno = "";

    const makeOrder = () => {
        console.log("Making payment now");
        //console.log(orderlist);
        orderno = String(parseInt(new Date().getTime() / 100));  //i am aware that 1000 ms = 1sec
        orderno = orderno.slice(-5);  //stores deci second also, to handle same second orders
        console.log("order no: ", orderno);   //this needs to be in the qr code

        axios.post('http://localhost:5000/makeOrder/', {
            'items': orderlist,
            'ordertime': parseInt(new Date().getTime() / 1000),  //this is in second after 1970
            'orderno': parseInt(orderno),
            'delivered': false
        })
            .then(response => {
                console.log(response);
                window.alert('Order placed successfully!');
                var hidden = document.createElement('a')
                console.log(orderno)
                hidden.href = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderno}`
                hidden.download = true
                hidden.click()
            })
            .catch(error => {
                console.log(error)
            })

        //generate and download qr code

    }

    return (
        <div>
            <div className='font-sans text-5xl p-5 font-semibold mb-10 text-blue-700'>
                Cart
                <FontAwesomeIcon icon={faCartShopping} />
            </div>

            <div className='flex flex-row mx-auto font-sans text-2xl transition-all bg-slate-400 rounded-lg w-10/12 m-2'>
                <div className='basis-2/4 p-5 justify-center'>
                    ITEM
                </div>
                <div className='basis-1/4 p-5 justify-center'>
                </div>
                <div className='basis-1/4 p-5 justify-center'>
                    PRICE
                </div>
                <hr></hr>
            </div>
            {
                location.state.item.map((value, index) => {
                    const quant = location.state.count[index];

                    if (quant) {
                        value.count = quant;
                        const newobj = JSON.stringify(value);
                        // console.log(newobj);

                        orderlist.push(value);

                        price += value["price"] * quant;
                        return (
                            <div className='flex flex-row mx-auto font-sans text-xl hover:text-2xl transition-all hover:bg-green-100 rounded-lg w-10/12'>
                                <div className='basis-2/4 p-5 justify-center'>
                                    {
                                        value["vegetarian"] ?
                                            <div className='inline text-green-700'>
                                                <FontAwesomeIcon icon={faSquare} />
                                            </div>
                                            :
                                            <div className='inline text-red-700'>
                                                <FontAwesomeIcon icon={faSquare} />
                                            </div>
                                    }

                                    &nbsp;
                                    {value["name"]}
                                </div>
                                <div className='basis-1/4 p-5 justify-center'>
                                    {value["price"]} x {quant}
                                </div>
                                <div className='basis-1/4 p-5 justify-center'>
                                    {parseInt(value["price"]) * quant}
                                </div>
                                <hr></hr>
                            </div>

                            // console.log(value["name"], quant);
                        )
                    }
                })
            }

            <hr className='m-5'></hr>

            <div className='flex flex-row mx-auto font-sans text-2xl hover:text-3xl transition-all hover:bg-green-300 w-10/12 rounded-lg'>
                <div className='basis-3/4 p-5'>
                    Total:
                </div>
                <div className='basis-1/4 p-5'>
                    {price}
                </div>
            </div>

            <div className='text-center m-8'>
                <button className="rounded-full border-4 text-lg border-rose-500 p-4 hover:bg-green-500 hover:text-white hover:border-green-800 hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-200 hover:font-semibold" onClick={() => makeOrder()}>Confirm and Pay</button>
            </div>

        </div>
    )
}

export default Cart