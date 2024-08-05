import express, { Request, Response } from 'express'
import { user, usersList } from '../Model/user'

const UsersList = new usersList()

const index = async (_req: Request, res: Response) => {
  const user = await UsersList.index()
  res.json(user)
}

const show = async (req: Request, res: Response) => {
    console.log("received request for id :::: " + req.params.id);
   const user = await UsersList.show(req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }

        const newproduct = await UsersList.create(user)
        res.json(newproduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await UsersList.delete(req.params.id)
    res.json(deleted)
}

const userRoutes = (app: express.Application) => {
  app.get('/user', index)
  app.get('/user/:id', show)
  app.post('/user', create)
  app.delete('/user/:id', destroy)
}

export default userRoutes