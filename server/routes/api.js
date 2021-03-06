const express = require('express');
const router = express.Router();

// declare axios for making http requests
const MongoClient = require('mongodb').MongoClient;
var db;

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

var localDB='mongodb://localhost:27017/exampleDb';
var cloudDB='mongodb://souvik:password@ds117271.mlab.com:17271/souvik';


MongoClient.connect(cloudDB, (err, database) => {
if (err) return console.log(err)
db = database
console.log("Database Connection Successful");
})


// Get all posts
router.get('/posts', (req, res) => {
  // Get posts from the mock api
  // This should ideally be replaced with a service that connects to MongoDB
	var mockResponseArray=[];
  var mockResponseObject={};
	  mockResponseObject.name="Souvik";
	  mockResponseObject.age=24;
	
	var mockResponseObject2={};
	  mockResponseObject2.name="Soumik";
	  mockResponseObject2.age=22;
	
	mockResponseArray.push(mockResponseObject);
	mockResponseArray.push(mockResponseObject2);
    res.send(mockResponseArray);
});


router.get('/getTasks', (req, res) => {
db.collection('todos').find().toArray((err, result) => {
if (err) return console.log(err)
res.send(result)
})
})

router.post('/tasks', (req, res) => {
var d = new Date();
var month=parseInt(d.getMonth())+1;
req.body.sdate=d.getFullYear()+"-"+month+"-"+d.getDate();
db.collection('todos').save(req.body, (err, result) => {
if (err) return console.log(err)
console.log('saved to database')
res.send(result)
})
})

router.post('/deleteTask', (req, res) => {
db.collection('todos').findOneAndDelete({key: req.body.key},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})

router.post('/completeAllTasks',(req,res)=>{
	db.collection('todos').update({isDone:false},{$set:{isDone:true}},{w:1, multi: true},(err,result)=>{
		if(err) returnres.send(500,err);
		res.send(result);
	});
})


router.post('/deleteCompletedTasks', (req, res) => {
	//console.log(req.body);
db.collection('todos').remove({isDone:true},
(err, result) => {
if (err) return res.send(500, err)
res.send(result)
})
})

router.post('/completeTask', (req, res) => {
	//console.log(req.body);
	var ctodo;
	db.collection('todos').findOne({key: req.body.key},
 (err, result) => {
    if (err) return res.send(500, err)
	
	ctodo=result;
	ctodo.isDone=true;
		
		db.collection('todos').save(ctodo, (err, result) => {
if (err) return console.log(err)
console.log('updated to database')
res.send(result)
})
})	
})

router.put('/updateToDoTask',(req,res)=>
{
	db.collection('todos').findOneAndUpdate({key:req.body.key},{$set:{text:req.body.text}},(err,result)=>
	{
		if(err) return resizeBy.send(500,err);
		res.send(result);
	})
})

module.exports = router;
