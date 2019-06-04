# AutoMart
Auto Mart is an online marketplace for automobiles of diverse marks, model or body type. With
Auto Mart, users can sell their cars or buy from trusted sellers.

## It has such features:
1. User can sign up.
2. User can sign in.
3. Seller can post a car sale advertisement.
4. Buyer can make a purchase order.
5. Buyer can update the price of his/her purchase order.
6. Seller can mark his/her posted AD as sold.
7. Seller can update the price of his/her posted AD.
8. User can view a specific car.
9. User can view all unsold cars.
10. User can view all unsold cars within a price range.
11. Admin can delete a posted AD record.
12. Admin can view all posted ads whether sold or unsold.

### UI
 - Use this link to see UI desing https://william000000.github.io/AutoMart/UI/index.html

## Installation
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

| Method      | Path                                       | Description                            |
|-------------|--------------------------------------------|----------------------------------------|
| POST        | /api/v1/auth/signup                        | Create User Account                    |
| POST        | /api/v1/auth/signin                        | User login                             |
| POST        | /api/v1/car                                | Create a car sale ad                   |
| POST        | /api/v1/order                              | Create a purchase order                |
| PATCH       | /api/v1/order/:id/price                    | Update the price of a purchase order   |
| PATCH       | /api/v1/car/:id/status                     | To Mark a posted car Ad as sold        |
| PATCH       | /api/v1/car/:id/price                      | To Update a car price                  |
| GET         | /api/v1/car/:id                            | To View a specific car                 |
| GET         | /api/v1/car                                | To View All Unsold car                 |
| DELETE      | /api/v1/car/:id                            | Delete specific Car                    |
| GET         | /api/v1/car-all                            | To view all posted cars                |
| POST        | /api/v1/flag                               | Flag/report posted car as fraudulent   |
| GET         | /api/v1/car-range                          | To view all cars with a range of price |
| GET         | /api/v1/car-used                           | To View all unsold cars&Used by make   |
| GET         | /api/v1/car-new                            | To View all unsold cars&New by make    |

## Technologies Used

### Bank-End
- Node / Express js

### Front-End
- HTML
- CSS
- JavaScript

## Author: Willy Boris 