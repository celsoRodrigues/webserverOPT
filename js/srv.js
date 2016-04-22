var express=require('express');
var path=require('path');
var app=express();
var mongoose=require('mongoose');
var bp=require('body-parser');
var colors = require('colors');

//color def 
colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

//bp use
app.use(bp.json());

//mongo connect
mongoose.connect('mongodb://localhost/website01', function(err){
	if(err){
		console.error("::Mongodb connection refused:: ".error+err.stack);
		return;
	}
	console.log("::database connection established::".info);

});

//model
var myModel=mongoose.model('post',{
	name:{type:String},
	surname:{type:String},
	DOB:{type:String},
	title:{type:Date, default:Date.now}

});
 

//set port
app.set('port', process.argv[2]||3000);
//use static files
app.use(express.static(path.join(__dirname, '../public')));

//routes
app.get('/', function(req, res){

	res.sendFile(path.join(__dirname, '../public/', 'index.html'));

});

app.get('/about', function(req, res){

	res.sendFile(path.join(__dirname, '../public', 'about.html'));

});

app.get('/api',function(req, res){

	myModel.find({name:"Jairo"},{_id:0},function(err, docs){

		if(err){
			console.error(err);
		}

		res.status(200);
		res.send(docs);
	
	});	

});

app.post('/api',function(req, res){


	var post=new myModel({name:req.body.name, surname:req.body.surname, DOB:req.body.DOB});

	post.save(function(err, data){
		if(err){
			console.error("error!");
		}
		console.log('written to db.');
		res.status(201);
		res.json(data);
	});
});

//404
app.use(function(req, res, next){

	res.status(404);
	res.sendFile(path.join(__dirname, '../public', '404.html'));

});

//500
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.sendFile(path.join(__dirname, '../public', '500.html'));

});

app.listen(app.get('port'), function(){

	console.log('::Server started on localhost:'.info+app.get('port')+', press Ctrl+c to kill the server.::'.info);

});
