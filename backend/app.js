/** @format */

require("dotenv").config();
var Project = require("./server/models/Project");
const express = require("express");
const twilio = require("twilio");
const expressLayout = require("express-ejs-layouts");
const methodOverride = require("method-override");
const connectDB = require("./server/config/db");
const cors = require("cors"); // Import the 'cors' middleware

// Initialize Twilio client with your Account SID and Auth Token
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const bodyParser = require("body-parser");
// const Project = require("./server/models/Project");
const app = express();
const port = 5000 || process.env.PORT;
//connect to
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride("_method"));
// Use the 'cors' middleware to enable CORS
app.use(cors({ origin: "*" }));

//static folder
app.use(express.static("public"));

//templating
app.use(expressLayout);
app.set("layout", "./layouts/main");
app.set("view engine", "ejs");

app.get("/api/projects", async (req, res) => {
  try {
    const project = await Project.find();
    console.log(project); // Log the result
    res.status(200).json({ project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.use("/", require("./server/routes/project"));

app.listen(port, () => {
  console.log(`App Listening On Port ${port}`);
});
