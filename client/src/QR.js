import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from "react-qr-code";
import { useEffect } from 'react/cjs/react.production.min';

function QR(props) {

    const location = useLocation()
    console.log(location.state.orderno);
    useEffect(() => {
        const canvas = document.querySelector('.QR > svg');
        this.downloadRef.href = canvas.toDataURL();
        this.downloadRef.download = this.state.values.deviceId + "-QR.png";
    })
    return (
        <div className="QR"><QRCode value={location.state.orderno} /></div>
    )
}


export default QR