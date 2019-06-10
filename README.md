[![Build Status](https://travis-ci.org/william000000/AutoMart.svg?branch=develop)](https://travis-ci.org/william000000/AutoMart)
[![Coverage Status](https://coveralls.io/repos/github/william000000/AutoMart/badge.svg?branch=develop)](https://coveralls.io/github/william000000/AutoMart?branch=develop)
# AutoMart
Auto Mart is an online marketplace for automobiles of diverse marks, model or body type. With
Auto Mart, users can sell their cars or buy from trusted sellers.

## It has such features:
- User can sign up.
- User can sign in.
- Seller can post a car sale advertisement.
- Buyer can make a purchase order.
- Buyer can update the price of his/her purchase order.
- Seller can mark his/her posted AD as sold.
- Seller can update the price of his/her posted AD.
- User can view a specific car.
- User can view all unsold cars.
- User can view all unsold cars within a price range.
- Admin can delete a posted AD record.
- Admin can view all posted ads whether sold or unsold.

## Pivotal Tracker stories
https://www.pivotaltracker.com/n/projects/2350443

### UI Template
 - Use this link to see UI Template https://william000000.github.io/AutoMart/UI/index.html

## Installation(Tools)
- Text Editor Ex: Visual Studio, Sublime etc
- Node/Express
- Postman

## SetUp Project to get Started
- Clone my repo 
- install all dependencies using 
```npm install```
- Start Server 
```npm run dev```
- Run Postman to check my API Endpoint on 
```localhost:2000``` 

## Use these method and path to test my API Endpoint

| Method      | Path                                                           | Description                            |
|-------------|----------------------------------------------------------------|----------------------------------------|
| POST        | /api/v1/auth/signup                                            | Create User Account                    |
| POST        | /api/v1/auth/signin                                            | User login                             |
| POST        | /api/v1/car                                                    | Create a car sale ad                   |
| POST        | /api/v1/order                                                  | Create a purchase order                |
| PATCH       | /api/v1/order/:id/price                                        | Update the price of a purchase order   |
| PATCH       | /api/v1/car/:id/status                                         | Mark a posted car Ad as sold           |
| PATCH       | /api/v1/car/:id/price                                          | Update a car price                     |
| GET         | /api/v1/car/:id                                                | View a specific car                    |
| GET         | /api/v1/car                                                    | View All Unsold car                    |
| DELETE      | /api/v1/car/:id                                                | Delete specific Car                    |
| GET         | /api/v1/car-all?`status=available`                             | View all posted cars                   |
| POST        | /api/v1/flag                                                   | Flag/report posted car as fraudulent   |
| GET         | /api/v1/car?`status=available&min_price=xx &max_price=xx`      | View all cars with a range of price    |
| GET         | /api/v1/car?`status=available&state=used`                      | View all unsold cars&Used by make      |
| GET         | /api/v1/car?`status=available&state=new`                       | View all unsold cars&New by make       |
| GET         | /api/v1/car?`status=available&manufacturer= XXXValue`          | View all unsold cars of a specific make|
| GET         | /api/vi/car?`body_type= bodyType`                              | View all cars of a specific body type.

## API
- https://dashboard.heroku.com/apps/automart-pro

## API Documentation
-  Swagger

## Technologies Used

### Bank-End
- Node / Express js
- Express
- Joi
- ESLint
- Travis CI
- Code Climate & Coveralls

### Front-End
- HTML
- CSS
- JavaScript

## Author: Willy Boris 



