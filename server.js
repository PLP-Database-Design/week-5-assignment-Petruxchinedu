// Import our dependencies
const express = require("express");
const app = express();
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Configure environment variables
dotenv.config();

// Create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection
db.connect((err) => {
  // Connection is not successful
  if (err) {
    return console.log("Error connecting to the database:", err);
  }
  // Connection is successful
  console.log("Successfully connected to MySQL:", db.threadId);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Patient Management System</h1><a href="/patients">View Patients</a><br><a href="/providers">View Providers</a>');
});

//question 1: Retrieve all patients
app.get('/patients', (req, res) => { 
  const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
  db.query(getPatients, (err, data) => {
    // If I have an error
    if (err) {
      return res.status(400).send("Failed to get patients: " + err); // Combine message and error
    }

    res.status(200).render('data', { data });
  });
});

//question 3: Filter patients by First Name
app.get('/patients/filter', (req, res) => {
  const firstName = req.query.first_name; // Get the first name from query parameters
  if (!firstName) {
    return res.status(400).send("First name query parameter is required.");
  }

  const getFilteredPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
  db.query(getFilteredPatients, [firstName], (err, data) => {
    // If I have an error
    if (err) {
      return res.status(400).send("Failed to get patients: " + err); // Combine message and error
    }

    res.status(200).render('data', { data });
  });
});

//question 2: Retrieve all providers
app.get('/providers', (req, res) => {
  const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";// Import our dependencies
  const express = require("express");
  const app = express();
  const mysql = require("mysql2");
  const dotenv = require("dotenv");
  
  // Configure environment variables
  dotenv.config();
  
  // Create a connection object
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
  
  // Test the connection
  db.connect((err) => {
    // Connection is not successful
    if (err) {
      return console.log("Error connecting to the database:", err);
    }
    // Connection is successful
    console.log("Successfully connected to MySQL:", db.threadId);
  });
  
  app.set('view engine', 'ejs');
  app.set('views', __dirname + '/views');
  
  // Define a route for the root URL
  app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Patient Management System</h1><a href="/patients">View Patients</a><br><a href="/providers">View Providers</a>');
  });
  
  //question 1: Retrieve all patients
  app.get('/patients', (req, res) => { 
    const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients";
    db.query(getPatients, (err, data) => {
      // If I have an error
      if (err) {
        return res.status(400).send("Failed to get patients: " + err); // Combine message and error
      }
  
      res.status(200).render('data', { data });
    });
  });
  
  //question 3: Filter patients by First Name
  app.get('/patients/filter', (req, res) => {
    const firstName = req.query.first_name; // Get the first name from query parameters
    if (!firstName) {
      return res.status(400).send("First name query parameter is required.");
    }
  
    const getFilteredPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?";
    db.query(getFilteredPatients, [firstName], (err, data) => {
      // If I have an error
      if (err) {
        return res.status(400).send("Failed to get patients: " + err); // Combine message and error
      }
  
      res.status(200).render('data', { data });
    });
  });
  
  //question 2: Retrieve all providers
  app.get('/providers', (req, res) => {
    const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers";
    db.query(getProviders, (err, data) => {
      // If I have an error
      if (err) {
        return res.status(400).send("Failed to get providers: " + err); // Combine message and error
      }
  
      res.status(200).render('data', { data });
    });
  });
  
  //question 4: Filter providers by Specialty
  app.get('/providers/filter', (req, res) => {
    const specialty = req.query.specialty; // Get the specialty from query parameters
    if (!specialty) {
      return res.status(400).send("Specialty query parameter is required.");
    }
  
    const getFilteredProviders = "SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?";
    db.query(getFilteredProviders, [specialty], (err, data) => {
      // If I have an error
      if (err) {
        return res.status(400).send("Failed to get providers: " + err); // Combine message and error
      }
  
      res.status(200).render('data', { data });
    });
  });
  
  // Start and listen to the server
  app.listen(3300, () => {
    console.log("Server is running on port 3300...");
  });
  db.query(getProviders, (err, data) => {
    // If I have an error
    if (err) {
      return res.status(400).send("Failed to get providers: " + err); // Combine message and error
    }

    res.status(200).render('data', { data });
  });
});

// Start and listen to the server
app.listen(3300, () => {
  console.log("Server is running on port 3300...");
});