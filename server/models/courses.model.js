const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    // Thumbnail image or preview
    thumbnail: { type: String },

    // Array of videos
    videos: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true }, // This can be a Cloudinary URL or local file path
        duration: { type: Number }, // In seconds (optional)
      },
    ],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    category: { type: String }, // e.g. Programming, Math
    level: {
      type: String,
      enum: ["beginner", "intermediate", "advanced"],
      default: "beginner",
    },

    enrolledUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  { timestamps: true }
);

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
