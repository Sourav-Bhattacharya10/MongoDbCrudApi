const express = require('express');
const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const configData = require("./config.json");

const connectionUrl = configData.connectionurl;
const databaseName = configData.databasename;
const collectionName = configData.collectionname;

//console.log("Connection : ", connectionUrl + databaseName);

mongoose.connect( connectionUrl + databaseName , {useNewUrlParser : true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log("Database Connected!!!");
});

let vegSchema = new mongoose.Schema({ name: String, price : Number },{ versionKey: false });

//let Vegetables = mongoose.model('Vegetable', vegSchema);

let Vegetables = mongoose.model('Vegetable', vegSchema, collectionName);     // collection name


const findData = (requ,resp) =>
{
    let filterData;
    if(requ.params.name == undefined)
        filterData = {};
    else
        filterData = { name : requ.params.name };
    Vegetables.find(filterData, (err, res) => 
    {
        resp.status(200).json(res);
    });
};

const createData = (requ,resp) =>
{
    let veg = new Vegetables({ name : requ.body.name, price : requ.body.price });
    veg.save(function (err, vo) {
        if (err) return console.error(err);
        console.log("Veg details : ", vo);
        resp.status(201).json(vo).end();
      });
};

const updateData = (requ,resp) =>
{
    let query = { name : requ.body.name };
    let update = { price : requ.body.price };
    Vegetables.findOneAndUpdate(query, update, { new : true }, (err,doc,res) => {
        if (err) 
            return console.error(err);

        console.log("Doc Veg details : ", doc);

        resp.status(200).json(doc).end();
      });
};

const deleteData = (requ,resp) =>
{
    let query = { name : requ.params.name };
    Vegetables.deleteOne(query, (err) => {
        if (err) return console.error(err);
        resp.status(200).end("Deleted");
      });
};

app.use(bodyParser.json());

app.get('/vegs', (req, res) => 
{
    //get all vegetables
    findData(req, res);
});

app.get('/vegs/:name', (req, res) => 
{
    //get vegetable by name
    findData(req, res);
});

app.post('/vegs', (req, res) => 
{   
    // create a new veg
    // { "name" : "Potato", "price" : 30 } 
    createData(req, res);
}); 
 
app.put('/vegs', (req, res) => 
{   
    // update the veg with specified name
    // { "name" : "Potato", "price" : 40 } 
    updateData(req, res);
}) 
 
app.delete('/vegs/:name', (req, res) => 
{   
    // delete the veg with specified name
    deleteData(req,res);
})

app.listen(8800, () => console.log('Example app listening on port 8800!'));