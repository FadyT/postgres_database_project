import express, { Request, Response } from 'express'
import { order, OrdersList } from '../Model/order'

const ordersList = new OrdersList()

const index = async (_req: Request, res: Response) => {
  const order = await ordersList.index()
  res.json(order)
}

const show = async (req: Request, res: Response) => {
    console.log("received request for id :::: " + req.params.id);
   const order = await ordersList.show(req.params.id)
   res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: order = {
            productsID : req.body.productsID,
            quantity: req.body.quantity,
            UserID: req.body.UserID,
            status: req.body.status,
        }

        const neworder = await ordersList.create(order)
        res.json(neworder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await ordersList.delete(req.params.id)
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/order', index)
  app.get('/order/:id', show)
  app.post('/order', create)
  app.delete('/order/:id', destroy)
}

export default orderRoutes