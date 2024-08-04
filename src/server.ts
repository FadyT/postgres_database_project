import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { product } from './Model/product';
import cors from 'cors';

/*
const bodyParser = require('body-parser');
const express = require('express');
const product  = require('../src/Model/product')
const cors = require('cors')
const app = express();
*/
//const address: string = "0.0.0.0:3000";
const app = express();
app.use(bodyParser.json())
const port = process.env.PORT || 3000;

/* Adding Cors to the website */
const corsOptions ={
    origin:"http://someotherdomain.com",
    optionSucessStatus:200
}
app.use(cors(corsOptions))

// routes
app.get('/', (req, res) => {
    res.send("What's up doc ?!");
  });
  

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });

app.get('/products', (req , res) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/product/:id', (req, res) => {
    try {
       res.send('this is the SHOW route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.post('/product', (req, res) => {
    const p: product = {
      id: req.body.id,  
      name: req.body.name,
      price: req.body.price
    }
    try {
       res.send('this is the CREATE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.put('/products/:id', (req: Request, res: Response) => {
    const p: product = {
      id: +req.params.id, 
      name: req.body.name,
      price: req.body.price
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.delete('/product/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})
