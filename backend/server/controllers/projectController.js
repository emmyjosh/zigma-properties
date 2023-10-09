/** @format */

const cloudinary = require("cloudinary").v2;
const cloudinarys = require("../controllers/cloudinary").v2; // Import the Cloudinary SDK
const multer = require("multer");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
var Project = require("../models/Project");
//Home
exports.homepage = async (req, res) => {
  const locals = {
    title: "zigma-backend",
    description: "CRUD Operation",
  };

  const perPage = 8; // Number of projects per page
  const page = req.query.page || 1; // Get the requested page from the query parameters

  try {
    const totalProjects = await Project.aggregate([
      { $sort: { updatedAt: -1 } },
    ]);
    // Get the total number of projects
    // Use skip() and limit() for pagination
    const Projects = await Project.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    res.render("index", {
      locals,
      Projects,
      currentPage: page,
      pages: Math.ceil(Project.count / perPage),
    });
  } catch (error) {
    console.error(error);
  }
};

//About page
exports.aboutpage = async (req, res) => {
  const locals = {
    title: "About page",
    description: "Know about the business",
  };
  res.render("about", locals);
};
// Handle 404
exports.errorpage = async (req, res) => {
  const locals = {
    title: "page not found",
    description: "cant get this page",
  };
  res.status(404).render("404", locals);
};
//add new project
exports.addProject = async (req, res) => {
  const locals = {
    title: "Add new Project",
    description: "add project to database",
  };
  res.render("project/add", locals);
};

// Configure Multer storage
const storage = multer.memoryStorage(); // Use memory storage for file uploads

const upload = multer({ storage: storage }).single("imageUrl"); // 'image' matches the name attribute in your form input

// Handle file upload and create a new project
exports.postProject = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("File upload failed.");
    }

    console.log(req.body);
    console.log("Uploaded file:", req.file);

    // Check if req.file is defined
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    // Upload the image to Cloudinary
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).send("Error uploading image to Cloudinary.");
        }

        // Create a new project with the Cloudinary URL
        let newProject = new Project({
          title: req.body.title,
          category: req.body.category,
          imageUrl: result.secure_url, // Store the Cloudinary URL in your model
        });

        try {
          console.log("Before saving project:", newProject);
          await newProject.save(); // Save the new project to the database
          console.log("After saving project:", newProject);
          res.redirect("/");
        } catch (error) {
          console.error(error);
          res.status(500).send("Error saving the project to the database.");
        }
      })
      .end(req.file.buffer); // Pass the image buffer to Cloudinary
  });
};

//edit project

exports.edit = async (req, res) => {
  try {
    console.log("Edit route accessed with ID:", req.params.id);

    const project = await Project.findOne({ _id: req.params.id });

    if (!project) {
      console.log("Project not found for ID:", req.params.id);
      return res.status(404).render("error/404");
    }

    const locals = {
      title: "Edit Project Data",
      description: "Edit the project data",
    };
    res.render("project/edit", {
      locals,
      project,
    });
  } catch (error) {
    console.error("Error in edit route:", error);
    res.status(500).render("error/500");
  }
};

// //update project
// exports.editProject = async (req, res) => {
//   try {
//     // Retrieve the project by its ID
//     const project = await Project.findById(req.params.id);

//     // Edit Image (if a new image is provided)
//     if (req.file) {
//       // Delete the old image from Cloudinary (if it exists)
//       if (project.imageUrl) {
//         const publicId = project.imageUrl.split("/").pop().split(".")[0];
//         await cloudinary.uploader.destroy(publicId);
//       }

//       // Upload the new image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.file.path);

//       // Update the project's imageUrl with the new Cloudinary URL
//       project.imageUrl = result.secure_url;
//     }

//     // Edit Title and Category
//     project.title = req.body.title;
//     project.category = req.body.category;

//     // Save the updated project document to MongoDB
//     await project.save();

//     res.redirect(`/edit/${req.params.id}`);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error editing project.");
//   }
// };

exports.deleteProject = async (req, res) => {
  try {
    // Retrieve the project by its ID
    const project = await Project.findById(req.params.id);

    // Check if the project has an image URL
    if (project.imageUrl) {
      // Parse the public ID from the Cloudinary URL (assuming it's in the correct format)
      const publicId = project.imageUrl.split("/").pop().split(".")[0];

      // Delete the image from Cloudinary by its public ID
      await cloudinary.uploader.destroy(publicId);
    }

    // Delete the project document from MongoDB
    await Project.deleteOne({ _id: req.params.id });

    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error deleting project.");
  }
};
