import dotenv from 'dotenv'
import { Pool } from 'pg'


dotenv.config();

const envData = process.env

const client = new Pool({
    host: envData.HOST,
    database: envData.DB,
    user: envData.USER,
    password: envData.PASSWORD
})

export {
    client,
    envData
}