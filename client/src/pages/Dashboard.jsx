import DashBar from "../components/Dashboard/DashBar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashBar />
      <main className="flex-1 p-8">{/* Your dashboard content */}</main>
    </div>
  );
};

export default Dashboard;
