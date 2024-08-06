import express, { Request, Response } from 'express'
import { product, productStore } from '../Model/product'
import jwt from 'jsonwebtoken'

const store = new productStore()

const index = async (_req: Request, res: Response) => {
  const product = await store.index()
  res.json(product)
}

const show = async (req: Request, res: Response) => {
    console.log("received request for id :::: " + req.params.id);
   const product = await store.show(req.params.id)
   res.json(product)
}


const verifyAuthToken = (req: Request , res : Response , next:any ) =>{
    try{
        const authHeader = req.headers.authorization
        const token = authHeader?.split(' ')[1]
        const decoded = jwt.verify(`${token}`, `${process.env.TOKEN_SECRET}`)
        next()
    }catch{
        res.status(401);
    }
}
const create = async (req: Request, res: Response) => {
    try {
        const product: product = {
            name: req.body.name,
            price: req.body.price,
        }

        const newproduct = await store.create(product)
        res.json(newproduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}


const productRoutes = (app: express.Application) => {
  app.get('/product', index)
  app.get('/product/:id', show)
  app.post('/product',verifyAuthToken, create)
}

export default productRoutes