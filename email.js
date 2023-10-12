/** @format */

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(cors({ origin: "*" }));
// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail", // Use the email service you want to use (e.g., 'Gmail')
  auth: {
    user: "emmycloxzy07@gmail.com", // Your email address
    pass: "pacacloxzy", // Your email password
  },
});

// Define a route to handle form submissions
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;
  console.log(req.body);
  const mailOptions = {
    from: email,
    to: "emmycloxzy07@gmail.com", // The recipient's email address
    subject: "New Contact Form Submission from " + name,
    text: "Name: " + name + "\nEmail: " + email + "\nMessage:\n" + message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error:", error);
      res.status(500).send("Error: Could not send email.");
    } else {
      console.log("Email sent:", info.response);
      res.send("Email sent successfully.");
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
