import Link from "next/link";


const Dashboard = () => {
  return (
    <div>
      <Link href="/dashboard/exercise">Exercise</Link>
    </div>
  );
};

Dashboard.requireAuth = true;
Dashboard.title = "Dashboard";
Dashboard.description = "Dashboard Page Description";

export default Dashboard;
