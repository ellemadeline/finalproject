// Import required modules
var express = require("express");
var app = express();
var mongoose = require("mongoose")

// Define connection parameters for MongoDB
var dbUrl = "mongodb+srv://inspiredByW3:inspired@clusterproject.vscbs1b.mongodb.net/info?retryWrites=true&w=majority"
var connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

// Connect to the MongoDB database
mongoose.connect(dbUrl, connectionParams).then((client) => {
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

// Define routes
app.get("/", (req, res) => {
  // Send login page as response for GET requests to root path
  res.sendFile(__dirname + "/login.html");
});

app.get("/login", (req, res) => {
  // Send login page as response for GET requests to /login path
  res.sendFile(__dirname + "/login.html");
});

app.get("/home", (req, res) => { 
  // Send home page as response for GET requests to /home path
  res.sendFile(__dirname + "/index.html");
});

app.post("/contact", async (req, res) => {
  var { username, password } = req.body;

  try {
    // Check if contact with username already exists
    var existingUser = await Contact.findOne({ username });

    if (existingUser) {
      // If contact exists, send error response
      return res.status(409).send("Username is already taken.");
    }

    // Create new contact object from request body
    var newContact = new Contact({
      username,
      password,
    });

    // Save new contact to database
    await newContact.save();
    // Send success response
    res.send("Thanks for contacting us!");
  } catch (err) {
    // Log error and send error response
    console.log("Error saving contact:", err);
    res.status(500).send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  var { username, password } = req.body;

  try {
    // Check if contact with username and password exists
    var user = await Contact.findOne({ username });

    if (!user || user.password !== password) {
      // If contact does not exist or password is incorrect, send error response
      return res.status(401).send("Username or Password not found");
    }

    // Export function to get logged in user's username
    module.exports = function getUsername() {
      return username;
    }

    // Send success response
    res.send("Login successful!");
  } catch (err) {
    // Log error and send error response
    console.log("Error logging in:", err);
    res.status(500).send("Error: " + err.message);
  }
});

// Start server
app.listen(3000, () => {
  console.log("Server listening on port 3000");
});