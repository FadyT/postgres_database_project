import {client} from "../database";

export type order = {
    productsID:Number;
    quantity:Number;
    UserID:Number;
    status:String;
}


export class OrdersList {
    async index():Promise<order[]> {
        try{
            
        const conn =await client.connect();
        const sql = 'SELECT * FROM orders'
        const result =await conn.query(sql);
        conn.release();

        return result.rows;

        }catch(e){
            throw new Error(`Could not get orders. Error: ${e}`)
        }
    }

    
      async show(id: string): Promise<order> {
        try {
        const sql = 'SELECT * FROM orders WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`)
        }
      }
    
      async create(b: order): Promise<order> {
          try {
            console.log(`trying to create order with data ${b.productsID}${b.quantity}${b.UserID}${b.status} `)
        const sql = 'INSERT INTO orders (productsID, quantity , UserID, status) VALUES($1, $2 , $3 , $4) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn
            .query(sql, [b.productsID, b.quantity , b.UserID , b.status])
    
        const order = result.rows[0]
    
        conn.release()
    
        return order
          } catch (err) {
              throw new Error(`Could not add new order ${b.productsID}. Error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<order> {
          try {
        const sql = 'DELETE FROM orders WHERE id=($1)'
        console.log("trying to delete " + id)
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        const order = result.rows[0]
    
        conn.release()
    
        return order
          } catch (err) {
              throw new Error(`Could not delete order ${id}. Error: ${err}`)
          }
      }

}