import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { product } from './Model/product'
import productRoutes from './Handler/productsRoutes'
import usersRoutes from './Handler/usersRoutes'
import ordersRoutes from './Handler/ordersRoutes'
import cors from 'cors'


const app = express();
app.use(bodyParser.json())
const address:string ="0.0.0.0:3000" //process.env.PORT || 3000;

productRoutes(app)
usersRoutes(app)
ordersRoutes(app)


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
  

  app.listen(3000, () => {
    console.log(`Server running at ${address}`);
  });

  
/*
app.get('/products', (req , res) => {
    try {
        res.send('this is the INDEX route' )
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
*/