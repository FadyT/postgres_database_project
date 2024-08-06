import {client , envData} from "../database";
import bcrypt from 'bcrypt'

export type user = {
    firstName:String;
    lastName:String;
    password:String;
}


export class usersList {
    async index():Promise<user[]> {
        try{
            
        const conn =await client.connect();
        const sql = 'SELECT * FROM users'
        const result =await conn.query(sql);
        conn.release();

        return result.rows;

        }catch(e){
            throw new Error(`Could not get users. Error: ${e}`)
        }
    }

    
    async show(id: string): Promise<user> {
        try {
        const sql = 'SELECT * FROM users WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }

      async authenticate(firstName: string , lastName:string , password : string): Promise<user | null> {
        try {

        const sql = 'SELECT password FROM users WHERE firstName=($1) && lastName=($2)'
        // @ts-ignore
        const conn = await client.connect()
        const result = await conn.query(sql, [firstName ,lastName ])
        conn.release()
    
        if(result.rows.length){
            const user = result.rows[0];
            console.log(user);

            // if password was entered correctly 
            if(bcrypt.compareSync(password+`${envData.BYCRYPT_PASSWORD}` , user.password)){
                return user;
            }
        }
        return null;
        } catch (err) {
            throw new Error(`Could not find user ${firstName} ${lastName}. Error: ${err}`)
        }
      }
    
      async create(b: user): Promise<user> {
          try {
            console.log(`trying to create user with data ${b.firstName}${b.lastName}${b.password}`)
        const sql = 'INSERT INTO users (firstName, lastName , password) VALUES($1, $2, $3) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
        const hash = bcrypt.hashSync(
            b.password + `${envData.BYCRYPT_PASSWORD}`, 
            parseInt(`${envData.SALT_ROUNDS}`)
         );

         console.log(`user password : ${b.password} 
            pepper is ${envData.BYCRYPT_PASSWORD}
            salt rounds  ${envData.SALT_ROUNDS}
            hashed data = ${hash}`);

        const result = await conn
            .query(sql, [b.firstName, b.lastName , hash])
    
        const user = result.rows[0]
    
        conn.release()
    
        return user
          } catch (err) {
              throw new Error(`Could not add new user ${b.firstName}. Error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<user> {
          try {
        const sql = 'DELETE FROM users WHERE id=($1)'
        console.log("trying to delete " + id)
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        const user = result.rows[0]
    
        conn.release()
    
        return user
          } catch (err) {
              throw new Error(`Could not delete user ${id}. Error: ${err}`)
          }
      }

}