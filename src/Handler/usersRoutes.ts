import express, { Request, Response } from 'express'
import { user, usersList } from '../Model/user'
import jwt from 'jsonwebtoken'
import { envData } from '../database'

const UsersList = new usersList()

const index = async (_req: Request, res: Response) => {
  const user = await UsersList.index()
  res.json(user)
}
/*
const show = async (req: Request, res: Response) => {
    console.log("received request for id :::: " + req.params.id);
   const user = await UsersList.show(req.params.id)
   res.json(user)
}*/

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
        const user: user = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
        }

        const newUser = await UsersList.create(user)
        var token = jwt.sign({user:newUser} , `${envData.TOKEN_SECRET}` )
        res.json(token)
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
  //app.get('/user/:id',verifyAuthToken, show)
  app.post('/user',verifyAuthToken, create)
  app.delete('/user/:id',verifyAuthToken, destroy)
}

export default userRoutes