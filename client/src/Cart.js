import React from "react";
import { useLocation } from "react-router-dom";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Cart({ orderlist, price, orderno, setOrderlist, setPrice, setOrderno }) {
  const location = useLocation();

  //list of the items
  console.log(location.state.item);
  //count of each items
  console.log(location.state.count);
  const history = useHistory();

  let currentOrderlist = [];

  let currentPrice = 0;

  const makeOrder = async () => {
    console.log("Making payment now");
    //console.log(orderlist);
    let currentOrderno = String(parseInt(new Date().getTime() / 100)).slice(-5); //i am aware that 1000 ms = 1sec
    currentOrderno = currentOrderno.slice(-5); //stores deci second also, to handle same second orders
    console.log("order no: ", currentOrderno); //this needs to be in the qr code

    await axios.post("http://localhost:5000/makeOrder/", {
      items: currentOrderlist,
      ordertime: parseInt(new Date().getTime() / 1000), //this is in second after 1970
      orderno: parseInt(currentOrderno),
      delivered: false,
    });
    setOrderno(currentOrderno);
    setOrderlist(currentOrderlist);
    setPrice(currentPrice);
    history.push("/payment");

    //generate and download qr code
  };

  return (
    <div>
      <div className="font-sans text-5xl p-5 font-semibold mb-10 text-blue-700">
        Cart
        <FontAwesomeIcon icon={faCartShopping} />
      </div>

      <div className="flex flex-row mx-auto font-sans text-2xl transition-all bg-slate-400 rounded-lg w-10/12 m-2">
        <div className="basis-2/4 p-5 justify-center">ITEM</div>
        <div className="basis-1/4 p-5 justify-center"></div>
        <div className="basis-1/4 p-5 justify-center">PRICE</div>
        <hr></hr>
      </div>
      {location.state.item.map((value, index) => {
        const quant = location.state.count[index];

        if (quant) {
          value.count = quant;
          const newobj = JSON.stringify(value);
          // console.log(newobj);

          currentOrderlist.push(value);

          currentPrice += value["price"] * quant;
          return (
            <div className="flex flex-row mx-auto font-sans text-xl hover:text-2xl transition-all hover:bg-green-100 text-white hover:text-black rounded-lg w-10/12">
              <div className="basis-2/4 p-5 justify-center">
                {value["vegetarian"] ? (
                  <div className="inline text-green-700">
                    <FontAwesomeIcon icon={faSquare} />
                  </div>
                ) : (
                  <div className="inline text-red-700">
                    <FontAwesomeIcon icon={faSquare} />
                  </div>
                )}
                &nbsp;
                {value["name"]}
              </div>
              <div className="basis-1/4 p-5 justify-center">
                {value["price"]} x {quant}
              </div>
              <div className="basis-1/4 p-5 justify-center">{parseInt(value["price"]) * quant}</div>
              <hr></hr>
            </div>

            // console.log(value["name"], quant);
          );
        }
      })}

      <hr className="m-5"></hr>

      <div className="flex flex-row mx-auto font-sans text-2xl hover:text-3xl transition-all hover:bg-green-300 w-10/12 rounded-lg text-white hover:text-black">
        <div className="basis-3/4 p-5">Total:</div>
        <div className="basis-1/4 p-5">{currentPrice}</div>
      </div>

      <div className="text-center m-8">
        <button
          className="rounded-full border-4 text-lg border-rose-500 p-4 hover:bg-green-500 text-white hover:border-green-800 hover:-translate-y-1 hover:scale-110 transition ease-in-out duration-200 hover:font-semibold"
          onClick={() => makeOrder()}
        >
          Confirm and Pay
        </button>
      </div>
    </div>
  );
}

export default Cart;
