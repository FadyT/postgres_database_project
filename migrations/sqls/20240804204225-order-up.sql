/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY  KEY,
    productid integer,
    productquantity integer,
    user_id integer,
    orderstatus VARCHAR(150)
);