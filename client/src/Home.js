import React, { useState } from "react";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Button } from "bootstrap";
import Navbar from "./Navbar";
import DashboardC from "./DashboardC";
import DashboardS from "./DashboardS";
import Cart from "./Cart";
import QR from "./QR";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import PaymentPage from "./PaymentPage";

function Home() {
  const [ctype, setcType] = useState("");
  const [orderlist, setOrderlist] = useState([]);
  const [price, setPrice] = useState(0);
  const [orderno, setOrderno] = useState("");

  const particlesInit = async (main) => {
    console.log(main);
    await loadFull(main);
  };
  const particlesLoaded = (container) => {
    console.log(container);
  };
  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            collisions: {
              enable: true,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 3,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
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

          <Route exact path="/cart">
            <Cart
              orderlist={orderlist}
              price={price}
              orderno={orderno}
              setOrderlist={setOrderlist}
              setPrice={setPrice}
              setOrderno={setOrderno}
            />
          </Route>

          <Route exact path="/payment">
            <PaymentPage orderlist={orderlist} orderno={orderno} price={price} />
          </Route>

          <Route exact path="/qr" component={QR} />
        </Switch>
      </Router>
    </>
  );
}

export default Home;
