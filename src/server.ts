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

export default app;