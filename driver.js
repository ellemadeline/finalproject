var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var port = process.env.PORT || 3000;

const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
// This is my password file containing my password to my Mongo. I keep it in a separate file and import it but for my own privacy I'm not addinog that file
// const { password } = require("./pass.js");
const loginUrl = "mongodb+srv://inspiredByW3:inspired@clusterproject.vscbs1b.mongodb.net/info?retryWrites=true&w=majority";
const exerciseUrl = "mongodb+srv://inspiredByW3:inspired@clusterproject.vscbs1b.mongodb.net/retryWrites=true&w=majority"
const bodyParser = require('body-parser');
const express = require("express");
const app = express();
var mongoose = require("mongoose");
var usernameGlobal = '';

// Define connection parameters for MongoDB
var connectionParams = {
	useNewUrlParser: true,
	useUnifiedTopology: true
  }
  
  // Connect to the MongoDB database
  mongoose.connect(loginUrl, connectionParams).then((client) => {
	console.info("Connected to the DB");
	db = client.connection;
  }).catch((e) => {
	console.log("Error:", e);
  });
  
  // Define schema for the contact object
  var contactSchema = new mongoose.Schema({
	username: String,
	password: String,
  });
  
  // Create model from schema
  var Contact = mongoose.model("Contact", contactSchema);
  
  // Add middleware to parse URL-encoded and JSON data
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  
http.createServer(async function (req, res) 
  {
	if (req.url == "/track.html")
	{
		console.log("track");
		curr=req.url;

		file = 'track.html';
		fs.readFile(file, 'utf8', function(err, txt) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			res.write(txt);
			res.end();
		});

		}

		else if (req.url == "/view.html")
		{
			curr=req.url;
		console.log("view");
			file = 'view.html';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(txt);
				res.end();
			});
		}
	else if (req.url == "/index.html" || req.url == "/")
		{
			curr=req.url;
			file = 'index.html';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(txt);
				res.end();
			});
		}
		else if (req.url == "/search.html")
		{
			curr=req.url;
		console.log("search");
			file = 'search.html';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(txt);
				res.end();
			});
		}
		else if (req.url == "/register.html")
		{
			curr=req.url;
			file = 'register.html';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(txt);
				res.end();
			});
		}
		else if (req.url == "/login.html")
		{
			if (req.method == "GET") {
				// res.sendFile(__dirname + "/login.html");
			} else if (req.method == "POST") {
				curr=req.url;
				file = 'login.html';
				fs.readFile(file, 'utf8', function(err, txt) {
					res.writeHead(200, {'Content-Type': 'text/html'});
					res.write(txt);
					res.end();
				});
			}
		}
		else if (req.url == "/exercise") {
			if (req.method == "GET") {
				let query = {};
				query["name"] = req.query.exercisename;
				query["date"] = req.query.date;
				console.log(query["name"]);
				alert("after query");
				try {
					var exercises = await getExercises(query);
					alert("after getExercises");
				} catch (err) {
					res.status(400).end("Search resulted in errors");
					return;
				}
				alert("end of get");
				res.status(200).send(exercises);
			}
			else if (req.method == "POST") {
				let query = createQuery(req);
				if (!checkInput(query)) {
					console.log("1");
					res.status(400).end("Invalid Input Parameteres");
					return;
				}
				try {
					await addExercise(query);
				} catch (err) {
					console.log("2");
					res.status(400).end("Create resulted in errors");
					return;
				}
				// Do we want to send anything back here?
				res.status(200).send();
			}
			else if (req.method == "PUT") {
				if (req.body.id === undefined) {
					res.status(400).end("Invalid Input Parameters");
					return;
				}
				let query = { "_id" : new mongodb.ObjectId(req.body.id) };
				let changes = { $set : createQuery(req) };
				try {
					// var changed = await changeExercise(query, changes);
					await changeExercise(query, changes);
				} catch (err) {
					res.status(400).end("Change resulted in errors");
					return;
				}
				// What's sent back here might be useful in case of an undo button
				res.status(200).send();
			}
			else if (req.method == "DELETE") {
				if (req.body.id === undefined) {
					res.status(400).end("Invalid Input Parameters");
					return;
				}
				let query = { "_id" : new mongodb.ObjectId(req.body.id) };
				try {
					// var removed = await removeExercise(query);
					await removeExercise(query);
				} catch (err) {
					res.status(400).end("Delete resulted in errors");
					return;
				}
				// What's sent back here might be useful in case of an undo button
				res.status(200).send();
			}
		}
		else if (req.url == "/login") {
			let { username, password } = req.body;

			try {
				// Check if contact with username and password exists
				var user = await Contact.findOne({ username });

				if (!user || user.password !== password) {
				// If contact does not exist or password is incorrect, send error response
				return res.status(401).send("Username or Password not found");
				}

				// Send success response
				usernameGlobal = username;
				res.send("Login successful!");
				} catch (err) {
					// Log error and send error response
					console.log("Error logging in:", err);
					res.status(500).send("Error: " + err.message);
				}
		}
		else if (req.url == "/contact") {
			console.log("in fetch");
			// Extract the username and password from the request body
			var { username, password } = req.body;
		
			try {
			// Check if a Contact document with the same username exists
			var existingUser = await Contact.findOne({ username });
		
			if (existingUser) {
			// If a Contact document with the same username exists, send an HTTP 409 response
			return res.status(409).send("Username is already taken.");
			}
		
			// If a Contact document with the same username does not exist, create a new Contact document
			var newContact = new Contact({
			username,
			password,
			});
		
			// Create a new collection with the user's username
			var db = mongoose.connection;
			db.createCollection(username);
		
			// Save the new Contact document to the database
			await newContact.save();
		
			// Send an HTTP 200 response with a success message
			res.send("Thanks for contacting us!");
			} catch (err) {
				// If an error occurs during the saving process, send an HTTP 500 response with the error message
				console.log("Error saving contact:", err);
				res.status(500).send("Error: " + err.message);
			}
		}
		else if (req.url == "/edit.html")
		{
			curr=req.url;
			file = 'edit.html';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/html'});
				res.write(txt);
				res.end();
			});
		}
		else if (req.url == "/style.css")
		{
			curr=req.url;
			file = 'style.css';
			fs.readFile(file, 'utf8', function(err, txt) {
				res.writeHead(200, {'Content-Type': 'text/css'});
				res.write(txt);
				res.end();
			});
		}
		else if (req.url == "/home") {
			// res.sendFile(__dirname + "/track.html");
		}
		else 
			{
			res.writeHead(200, {'Content-Type':'text/html'});
			res.write(req.url);
			res.write ("Unknown page request");
			res.end();
			}
}).listen(port);


// Creats a JSON query that can be used in MongoDB functions
// Decides what the query will have in it based on what is sent by the user
function createQuery(req) {
    let query  = {};
    if (req.body.name !== undefined) {
        query["name"] = req.body.name;
    }
    if (req.body.date !== undefined) {
        query["date"] = req.body.date;
    }
    if (req.body.reps !== undefined) {
        query["reps"] = req.body.reps;
    }
    if (req.body.sets !== undefined) {
        query["sets"] = req.body.sets;
    }
    if (req.other !== undefined) {
        query["other"] = req.body.other;
    }
    return query;
}

// Gets all the exercises that satisfies the query from MongoDB
async function getExercises(query) {
    const client = new MongoClient(exerciseUrl);
    client.connect();
    const collect = client.db("info").collection(usernameGlobal);
    // const collect = client.collection(usernameGlobal);
    let exercise = await collect.find(query).toArray();
    await client.close();
    return exercise;
}

// Creates a new exercise based off the query in MongoDB
async function addExercise(query) {
    const client = new MongoClient(exerciseUrl);
    client.connect();
    console.log("Got here")
    console.log(usernameGlobal);
    const collect = client.db("info").collection(usernameGlobal);
    // const collect = client.collection(usernameGlobal);
    console.log("got collection");
    await collect.insertOne(query);
    console.log("waiting on insertOne");
    await client.close();
}

// Changes an existing exercise based off the query in MongoDB
async function changeExercise(query, changes) {
    const client = new MongoClient(exerciseUrl);
    client.connect();
    const collect = client.db("info").collection(usernameGlobal);
    // const collect = client.collection(usernameGlobal);
    await collect.updateOne(query, changes);
    await client.close();
}

// Removes an exercise identified by the unique id in the query in MongoDB
async function removeExercise(query) {
    const client = new MongoClient(exerciseUrl);
    client.connect();
    const collect = client.db("info").collection(usernameGlobal);
    // const collect = client.collection(usernameGlobal);
    await collect.deleteOne(query);
    await client.close();
    // return deleted;
}

// Checks that the query contains all information about an exercise
function checkInput(query) {
    if (!query.hasOwnProperty("name")) {
        return false;
    } else if (!query.hasOwnProperty("date")) {
        return false;
    } else if (!query.hasOwnProperty("reps")) {
        return false;
    } else if (!query.hasOwnProperty("sets")) {
        return false;
    }
    return true;
}