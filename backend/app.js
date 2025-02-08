const express = require("express");

const router = require("./src/routes/api.js");
const app = new express();

const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const path = require("path");

// Connect to MongoDB
let URL =
  "mongodb+srv://parvez:parvez122509@universal-database.8e02k.mongodb.net/mern-ecommerce";
// let option = { user: "testuser01", pass: "testuser01", autoIndex: true };

mongoose
  .connect(URL, {
    autoCreate: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(" Error connecting to the DB", err);
  });

// Middleware
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Rate Limit

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// Routes

app.use("/api", router);

//not found page
app.use("*", (req, res) => {
  return res.status(404).json({ message: "Page not found" });
});

// Serve static files from the React app

app.use(express.static(path.join("client/build")));

// Handle React routing, return all requests to React app
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});

module.exports = app;
