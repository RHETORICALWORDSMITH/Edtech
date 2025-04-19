import { Routes, Route } from "react-router-dom";
import DashBar from "../components/Dashboard/DashBar";
import CreateCourse from "../components/Dashboard/CreateCourse";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashBar />
      <main className="flex-1 p-8">
        <CreateCourse />
      </main>
    </div>
  );
};

export default Dashboard;
