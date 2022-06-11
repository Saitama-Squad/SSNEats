const express = require('express');
const dotenv = require('dotenv');
const { OAuth2Client } = require('google-auth-library');
const mongoose = require('mongoose');
const MenuModel = require('./models/menu');
const OrderModel = require('./models/order');
dotenv.config();

mongoose.connect("mongodb+srv://soorya99:Soorya123@cluster0.6vtcq.mongodb.net/SSNEats?retryWrites=true&w=majority");

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors())

const users = [];

// update or insert
function upsert(array, item) {
    const i = array.findIndex((_item) => _item.email === item.email);
    if (i > -1)
        array[i] = item;
    else
        array.push(item);
}

app.post('/api/google-login', async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    upsert(users, { name, email, picture });
    res.status(201);
    res.json({ name, email, picture });
});


app.get("/getMenu", (req, res) => {
    console.log('getting Menu')
    MenuModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

app.post("/addItem", async (req, res) => {
    const item = req.body;
    const newItem = new MenuModel(item);
    await newItem.save();
    res.json(item);
});


app.post("/makeOrder", async (req, res) => {
    const item = req.body;
    const orderItem = new OrderModel(item);
    await orderItem.save();
    res.json(item);
});


app.get("/getOrder", (req, res) => {
    console.log('getting Menu')
    OrderModel.find({}, (err, result) => {
        if (err) {
            res.json(err);
        } else {
            res.json(result);
        }
    });
});

// app.upsert("/deliverOrder", (req, res) => {
//     console.log('deliver order');

// })

app.post("/deliverItem", (req, res) => {
    console.log(`Delivering Item ${req.body.oid}`);
    OrderModel.updateOne(
        { _id: req.body.oid },
        { delivered: true },
        (callback = (err, doc) => {
            if (err) { console.log(err); res.status(500) }
            else {
                console.log(doc)
                res.status(200).json({ statusText: "success" })
            }
        })
    );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is ready at http://localhost:${PORT}`);
});



// soorya99
// Soorya123