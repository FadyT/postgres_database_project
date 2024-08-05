import client from "../database";

export type product = {
    name:String;
    price:Number;
}

export class productStore {
    async index():Promise<product[]> {
        try{
            
        const conn =await client.connect();
        const sql = 'SELECT * FROM products'
        const result =await conn.query(sql);
        conn.release();

        return result.rows;

        }catch(e){
            throw new Error(`Could not get books. Error: ${e}`)
        }
    }

    
      async show(id: string): Promise<product> {
        try {
        const sql = 'SELECT * FROM products WHERE id=($1)'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        conn.release()
    
        return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`)
        }
      }
    
      async create(b: product): Promise<product> {
          try {
            console.log(`trying to create product with data ${b.name}${b.price}`)
        const sql = 'INSERT INTO products (name, price) VALUES($1, $2) RETURNING *'
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn
            .query(sql, [b.name, b.price])
    
        const book = result.rows[0]
    
        conn.release()
    
        return book
          } catch (err) {
              throw new Error(`Could not add new product ${b.name}. Error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<product> {
          try {
        const sql = 'DELETE FROM products WHERE id=($1)'
        console.log("trying to delete " + id)
        // @ts-ignore
        const conn = await client.connect()
    
        const result = await conn.query(sql, [id])
    
        const product = result.rows[0]
    
        conn.release()
    
        return product
          } catch (err) {
              throw new Error(`Could not delete product ${id}. Error: ${err}`)
          }
      }

}