import { Button } from "bootstrap";
import React, { Component, useState, useEffect } from "react";
import { render } from "react-dom";
import { GoogleLogin } from "react-google-login";
import { Router, Route, Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import AsyncLocalStorage from "@createnextapp/async-local-storage";
import axios from "axios";
import { Input } from "antd";

function DashboardS(props) {
  const sendItem = () => {
    console.log(name, price, category, vegetarian);
    axios
      .post("http://localhost:5000/addItem/", {
        name: name,
        price: price,
        category: category,
        vegetarian: vegetarian,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setName("");
    setPrice(0);
    setCategory("");
    setVegetarian(1);
    alert("Item added");
  };

  const [orderList, setOrderList] = useState([]);
  const [display, setDisplay] = useState(false);

  const showOrder = () => {
    console.log("showing order");
    axios
      .get("http://localhost:5000/getOrder")
      .then((response) => {
        setOrderList(response.data);
        console.log(orderList);
      })
      .catch((error) => {
        console.log(error);
      });

    setDisplay(true);
  };

  const Deliver = (orderid, orderno) => {
    console.log("delivered");
    console.log(orderid, orderno);
    axios
      .post("http://localhost:5000/deliverItem", { oid: orderid, ono: orderno })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [loginData, setLoginData] = useState(null);
  console.log(props);
  const [loginData, setLoginData] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    props.history.push("/");
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [vegetarian, setVegetarian] = useState(1);

  useEffect(() => {
    let login = localStorage.getItem("loginData");
    setLoginData(JSON.parse(login));
    // console.log(loginData)
  }, []);

  return (
    <div>
      {loginData ? (
        <div>
          <div class="m-auto w-full max-w-xl mt-20">
            <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h1 className="text-center font-bold text-2xl">Add Item</h1>
              <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="itemname"
                >
                  Item Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="grid-first-name"
                  type="text"
                  placeholder="Item"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="price"
                >
                  Price
                </label>
                <input
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="grid-first-name"
                  type="number"
                  placeholder="00"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>
              <div class="mb-6">
                <label
                  class="block text-gray-700 text-sm font-bold mb-2"
                  for="category"
                >
                  Category
                </label>
                <input
                  class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="grid-first-name"
                  type="text"
                  placeholder="Starters"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
                ></input>
              </div>
              <div
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Veg /Non Veg
              </div>
              <select onChange={(e) => setVegetarian(parseInt(e.target.value))}>
                <option value="1">Vegetarian</option>
                <option value="0">Non-Vegetarian</option>
              </select>
              <br />
              <br />
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => sendItem()}
                >
                  Add Items
                </button>
              </div>
            </form>
          </div>
          <div className="mx-auto w-0 mt-5">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => showOrder()}
            >
              Show Orders
            </button>
          </div>

          {display ? (
            <div>
              {orderList.map((order) => {
                //console.log(order);

                if (order["delivered"] == false) {
                  return (
                    <div className="mx-auto w-1/2">
                      <div className="bg-amber-300 border-2 backdrop-blur-0 m-4 rounded-md hover:bg-amber-500 p-1 hover:scale-105 transition ease-in-out duration-200">
                        <button
                          className="float-right bg-red-500 text-white font-bold rounded m-3 p-1 hover:scale-105 hover:bg-green-200 hover:text-black"
                          onClick={() =>
                            Deliver(order["_id"], order["orderno"])
                          }
                        >
                          Deliver Order
                        </button>
                        <div className="text-xl">{order["orderno"]}</div>

                        {order["items"].map((item) => {
                          return (
                            <div>
                              <div>
                                {item["name"]} - {item["count"]}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          ) : (
              null
          )}
        </div>
      ) : (
        <div>
          {/* <Redirect push to="/dashboard"/>  */}
          <p>Not logged in</p>
          {/* <Redirect push to="/"/>  */}
        </div>
      )}
    </div>
  );
}

export default DashboardS;
