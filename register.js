var express = require("express");

// Create an instance of the express app
var app = express();
var mongoose = require("mongoose")

// URL Database to connect to
var dbUrl = "mongodb+srv://inspiredByW3:inspired@clusterproject.vscbs1b.mongodb.net/info?retryWrites=true&w=majority"

// Define options for the MongoDB connection
var connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connect to the MongoDB database using the URL and options
mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.info("Connected to the DB")
  })
  .catch((e) => {
    console.log("Error:", e);
  })

// Define a schema for the Contact model
var contactSchema = new mongoose.Schema({
  username: String,
  password: String,
});

// Create a Contact model using the schema
var Contact = mongoose.model("Contact", contactSchema);


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define a GET endpoint for the root path
app.get("/", (req, res) => {
  // Send the register.html file
  res.sendFile(__dirname + "/register.html");
});

// Define a POST endpoint for the /contact path
app.post("/contact", async (req, res) => {
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
  });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});











