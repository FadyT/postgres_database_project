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
    
      async addProductToOrder (quantity:number , orderID: string , productID : string): Promise<order> {
         // get order to see if it is open
    try {
        const ordersql = 'SELECT * FROM orders WHERE id=($1)'
        //@ts-ignore
        const conn = await Client.connect()
  
        const result = await conn.query(ordersql, [orderID])
  
        const order = result.rows[0]
  
        if (order.status !== "open") {
          throw new Error(`Could not add product ${productID} to order ${orderID} because order status is ${order.status}`)
        }
  
        conn.release()
      } catch (err) {
        throw new Error(`${err}`)
      }
  
        try {
        const sql = 'INSERT INTO order_products (quantity ,order_id , product_id ) VALUES ($1,$2,$3)  RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [quantity , orderID , productID])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not insert product ${productID} to order ${orderID}. Error: ${err}`)
        }
        
      }
      
    
      async create(b: order): Promise<order> {
          try {
            console.log(`trying to create order with data ${b.productsID}${b.quantity}${b.UserID}${b.status} `)
        const sql = 'INSERT INTO orders (productID, quantity , UserID, status) VALUES($1, $2 , $3 , $4) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn
            .query(sql, [b.productsID, b.quantity , b.UserID , b.status])
        console.log(`connection is ${conn} and sql result is ${result}`)
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