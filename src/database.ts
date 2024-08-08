import dotenv from 'dotenv'
import { Pool } from 'pg'


dotenv.config();

const envData = process.env
let client : Pool;


if(envData.ENV === 'test') {
    client = new Pool({
      host: envData.HOST,
      database: envData.TEST_DB,
      user: envData.USER,
      password: envData.PASSWORD,
    })
  }
  
  if(envData.ENV === 'dev') {
    client = new Pool({
      host: envData.HOST,
      database: envData.DB,
      user: envData.USER,
      password: envData.PASSWORD,
    })
  }

export {
    client,
    envData
}