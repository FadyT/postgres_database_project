# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo install the required packages 
- Express
- Postgres
- Jasmine
- dotenv
- bcrypt
- cors
- db-migrate
- db-migrate-pg

## Technologies used
Application use the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to Completion

### 1. clone the repo

first you have to clone the repo 


### 2.  DB Creation and Migrations

postgres is used for handeling database you can find the oreder , product , user , order-products tables migration rules in the migrations folder under sqls path
just run db-migrate up "table name" command for each table and you will have same table schema added to your database  

### 3. Models

all models are added to the src/Model folder
one model for each table route to interact with tables in database

### 4. Express Handlers

handelers are separated in src/handler folder to handel any route requested by the user 

### 5. JWTs

JWT is used in src/Handler/userRoutes to return token for user when he create a new user and used also for the middle ware that check the token to make sure user is authorized to make the request .


**NOTE** 
server is running on port:3000 

Database
- host : localhost
- port : 5432
- databasename : shopping
- user : postgres
- password = password123

