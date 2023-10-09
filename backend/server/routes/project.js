/** @format */
const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/", projectController.homepage);
router.get("/add", projectController.addProject);
router.post("/add", projectController.postProject);
router.get("/about", projectController.aboutpage);
router.delete("/edit/:id", projectController.deleteProject);

router.get("*", projectController.errorpage);

module.exports = router;
