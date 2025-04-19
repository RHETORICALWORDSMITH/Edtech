const Course = require("../models/courses.model");
const fs = require("fs").promises;

// Create new course
const createCourse = async (req, res) => {
  try {
    const { title, description, category, level } = req.body;
    const videoFile = req.file;

    if (!videoFile) {
      return res.status(400).json({ error: "Video file is required" });
    }

    const course = await Course.create({
      title,
      description,
      category,
      level,
      createdBy: req.user._id, // Assuming user is attached by auth middleware
      videos: [
        {
          title: req.body.videoTitle || title,
          url: videoFile.path.replace(/\\/g, "/"),
        },
      ],
    });

    res.status(201).json({ success: true, course });
  } catch (error) {
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    res.status(500).json({ error: error.message });
  }
};

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate("createdBy", "name email")
      .select("-videos.url");
    res.json({ success: true, courses });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single course
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("createdBy", "name email")
      .populate("enrolledUsers", "name email");

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ success: true, course });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, level } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if user is course creator
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { title, description, category, level },
      { new: true }
    );

    res.json({ success: true, course: updatedCourse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if user is course creator
    if (course.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    // Delete video files
    for (const video of course.videos) {
      await fs.unlink(video.url).catch(console.error);
    }

    await course.deleteOne();
    res.json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Check if already enrolled
    if (course.enrolledUsers.includes(req.user._id)) {
      return res.status(400).json({ error: "Already enrolled" });
    }

    course.enrolledUsers.push(req.user._id);
    await course.save();

    res.json({ success: true, message: "Enrolled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollCourse,
};
