import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";

function QR(props) {

    const location = useLocation()
    console.log(location.state.orderno);

    return (
        <QRCode value={location.state.orderno} />
    )
}


export default QR