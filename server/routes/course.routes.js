const express = require("express");
const router = express.Router();
const upload = require("../config/multer.config");
const auth = require("../middlewares/auth.middleware");
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
} = require("../controllers/course.controller");

// Public routes
router.get("/", getAllCourses);
router.get("/:id", getCourse);

// Protected routes
router.post("/create", auth, upload.single("video"), createCourse);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);
router.post("/:id/enroll", auth, enrollCourse);

module.exports = router;
