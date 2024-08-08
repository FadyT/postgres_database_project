# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

### In a terminal tab, create and run the database:
switch to the postgres user 
# su postgres
start psql 
# psql postgres
in psql run the following:

# CREATE USER shopping_user WITH PASSWORD 'password123';
# CREATE DATABASE shopping;
# \c shopping
# GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;
to test that it is working run 
# \dt 
and it should output "No relations found."

In the 2nd terminal:

# install yarn 
npm install yarn -g
# install db-migrate on the machine for terminal commands 
npm install db-migrate -g
# check node version node -v - it needs to be 10 or 12 level

## API Endpoints
#### Products

- Get all products from the database
  app.get('/product', index)
- Get specific product with id 
  app.get('/product/:id', show)
- Add new product to the products table if token is correct
  app.post('/product',verifyAuthToken, create)

#### Users

- Get all Users if token is valid 
  app.get('/user', index)
- Get user with specified ID if token is valid
  app.get('/user/:id',verifyAuthToken, show)
- Create user if the token is valid
  app.post('/user',verifyAuthToken, create)

#### Orders

- Show all orders
  app.get('/order', index)
- Show order of specific id
  app.get('/order/:id', show)
- Create order with the details added in request body
  app.post('/order', create)
- Add product to order in order_products table with the details added in request body
  app.post('/order/:id/product', addProduct)
  
## Tables Data Shapes
#### Products Table
- id (SERIAL PRIMARY KEY)
- name (VARCHAR(150))
- price (float)

#### Users Table
- id (SERIAL PRIMARY KEY)
- firstName (VARCHAR(150))
- lastName (VARCHAR(150))
- password (VARCHAR(100))

#### Orders Table

- id (SERIAL PRIMARY KEY)
- productid (integer)
- productquantity (integer)
- user_id (integer)
- orderstatus (VARCHAR(150))

#### Order-products Table

- id (SERIAL PRIMARY KEY)
- quantity (integer)
- order_id (bigint REFERENCES orders(id))
- product_id (bigint REFERENCES orders(id))
