import React, {useState} from 'react'
import Login from './Login';
import {BrowserRouter as Router, Switch , Route, Link } from 'react-router-dom';
import { Button } from 'bootstrap';
import Navbar from "./Navbar";
import Dashboard from './Dashboard';

function Home() {

    const [ctype, setcType] = useState("")
    
    return (
      <Router>
            <Switch>
              <Route path="/" exact>
                <Navbar/>
              </Route>

              <Route exact path="/user">
                <Login type="Customer"/>
              </Route>

              <Route exact path="/shop">
                <Login type="Shop-Owner"/>
              </Route>

              <Route exact path="/dashboard" component={Dashboard}/>
            </Switch>          
      </Router>  
      );
}

export default Home;