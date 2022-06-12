import React, { useState } from "react";

const PaymentPage = ({ orderno, orderlist, price }) => {
  const [paymentMethod, setPaymentMethod] = useState("");

  const renderButtons = () => {
    return (
      <div className="buttons flex items-center justify-center">
        <button
          className="border px-8 py-4 text-2xl mb-8 "
          onClick={() => setPaymentMethod("Debit")}
        >
          Debit Card
        </button>
        <button
          className="border px-8 py-4 text-2xl mb-8 ml-20"
          onClick={() => setPaymentMethod("UPI")}
        >
          UPI
        </button>
      </div>
    );
  };

  const formSubmit = (e) => {
    e.preventDefault();
    window.alert("Order placed successfully!");
    var hidden = document.createElement("a");
    console.log(orderno);
    hidden.href = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${orderno}`;
    hidden.download = true;
    hidden.click();
  };

  const renderForms = () => {
    return paymentMethod === "UPI" ? (
      <form className="flex flex-col items-center justify-center w-full" onSubmit={formSubmit}>
        <div className="flex flex-col items-center w-full">
          <div className="mb-1">Enter UPI Id</div>
          <input type="text" className="w-1/3 text-black" />
        </div>
        <button type="submit" className=" border px-8 py-4 text-xl my-8">
          Pay
        </button>
      </form>
    ) : (
      <form className="flex flex-col items-center justify-center w-full" onSubmit={formSubmit}>
        <div className="flex flex-col items-center w-full">
          <div className="mb-1">Enter Card Number</div>
          <input type="number" className="w-1/3 text-black" />
        </div>
        <div className="flex flex-col items-center w-full mt-10">
          <div className="mb-1">Enter Name on Card</div>
          <input type="text" className="w-1/3 text-black" />
        </div>
        <div className="flex flex-col items-center w-full mt-10">
          <div className="mb-1">Enter CVV</div>
          <input type="number" className="w-1/3 text-black" />
        </div>
        <button type="submit" className=" border px-8 py-4 text-xl my-8">
          Pay
        </button>
      </form>
    );
  };

  return (
    <div className="text-white w-full h-full">
      <div className="text-3xl text-center my-10">Total Amount to be paid: {price}</div>
      {renderButtons()}
      {paymentMethod === "" ? <></> : renderForms()}
    </div>
  );
};

export default PaymentPage;
