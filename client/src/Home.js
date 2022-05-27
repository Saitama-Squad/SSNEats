import React, { useState } from 'react'
import Login from './Login';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import Navbar from "./Navbar";
import DashboardC from './DashboardC';
import DashboardS from './DashboardS';
import Cart from './Cart';
import QR from './QR';

function Home() {

  const [ctype, setcType] = useState("")

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Navbar />
        </Route>

        <Route exact path="/user">
          <Login type="Customer" />
        </Route>

        <Route exact path="/shop">
          <Login type="Shop-Owner" />
        </Route>

        <Route exact path="/dashboardC" component={DashboardC} />

        <Route exact path="/dashboardS" component={DashboardS} />

        <Route exact path="/cart" component={Cart} />

        <Route exact path="/qr" component={QR} />

      </Switch>
    </Router>
  );
}

export default Home;