import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import useAuth from "../../hooks/useAuth";

const CreateCourse = () => {
  const { user } = useAuth();
  console.log(user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      level: "beginner",
      videoTitle: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      // Append video file
      if (videoFile) {
        formData.append("video", videoFile);
      }

      // Append other form data
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });

      // Add user ID from auth context
      formData.append("createdBy", user.id);

      const response = await api.post("/courses/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        navigate("/dashboard/courses");
      }
    } catch (error) {
      console.error("Error creating course:", error);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        // 100MB limit
        alert("File size must be less than 100MB");
        return;
      }
      setVideoFile(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Create New Course
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Course Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Title
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Course title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Course description is required",
              minLength: {
                value: 20,
                message: "Description must be at least 20 characters",
              },
            })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            {...register("category", { required: "Category is required" })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Level
          </label>
          <select
            {...register("level")}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Course Video
          </label>
          <input
            type="text"
            {...register("videoTitle", { required: "Video title is required" })}
            placeholder="Video Title"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.videoTitle && (
            <p className="mt-1 text-sm text-red-600">
              {errors.videoTitle.message}
            </p>
          )}
          <div className="mt-2">
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>
          {uploadProgress > 0 && (
            <div className="mt-2">
              <div className="h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 bg-indigo-600 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Upload progress: {uploadProgress}%
              </p>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCourse;
