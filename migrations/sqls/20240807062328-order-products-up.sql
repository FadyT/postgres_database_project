/* Replace with your SQL commands */
CREATE TABLE orders_products (
    id SERIAL PRIMARY  KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)

);