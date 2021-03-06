﻿# MongoDbCrudApi
This code aims at providing basic understanding of creating Node.js REST API using Express.js and MongoDB backend.

## Package Dependency
This project requires mainly three packages:
* Express
* Mongoose
* Body Parser


```shell
npm install express --save
npm install mongoose --save
npm install body-parser --save
```

## Source Code Breakdown
* At first, import the required packages.
* Write MongoDB connection code.
* Write four helper functions using mongoose to perform CRUD operations.
* Write API functions using express.
* Test them using Postman

## Data Format
It will store the data in the MongoDB in the following format:
{
    _id : 67dcgw6wgwe87weh,
    name : "Potato",
    price : 30
}

## Quickstart
* Clone this repository
* Change connectionurl, databasename, collectionname in the config.json accordingly
* Run *npm run start*

## API call using Postman
* GET http://localhost:8800/vegs
Response:
Status Code : 200
Response Body:
[
    {
        "_id" : "h743iuh3948",
        "name" : "Onion",
        "price" : 30
    },
    ...
]
-> *Displays all the vegetables*

* GET http://localhost:8800/vegs/Potato
Response:
Status Code : 200
Response Body:
[
    {
        "_id" : "h743iuh3948",
        "name" : "Potato",
        "price" : 30
    }
]
-> *Displays the vegetable with specified name*

* POST http://localhost:8800/vegs
Request Header:
Content-Type : application/json

Request Body :
{
	"name" : "Papaya",
	"price" : 25
}

Response:
Status Code : 201
Response Body :
{
    "_id": "5b82be810ff25300d06d92ad",
    "name": "Papaya",
    "price": 25
}

-> *Creates the vegetable*

* PUT http://localhost:8800/vegs
Request Header:
Content-Type : application/json

Request Body :
Request Body :
{
	"name" : "Papaya",
	"price" : 30
}

Response:
Status Code : 200
Response Body :
{
    "_id": "5b82be810ff25300d06d92ad",
    "name": "Papaya",
    "price": 30
}

-> *Updates the vegetable*

* DELETE http://localhost:8800/vegs/Papaya
Response:
Status Code : 200
Response Body :
"Deleted"

-> *Deletes the vegetable with specified name*
