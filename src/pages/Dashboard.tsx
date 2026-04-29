/**
 * User Dashboard Page
 * Shows user statistics (cards) and recent complaints list.
 */
import { FileText, Clock, CheckCircle, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { mockUser, mockReports } from "@/data/mockData";
import StatCard from "@/components/StatCard";
import StatusBadge from "@/components/StatusBadge";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

const userName = user?.fullName;
  // Stats to display in cards
  const stats = [
    { icon: FileText, label: "Total Reports", value: mockUser.totalReports, color: "bg-accent" },
    { icon: Clock, label: "Pending Reports", value: mockUser.pendingReports, color: "bg-warning/20" },
    { icon: CheckCircle, label: "Resolved Reports", value: mockUser.resolvedReports, color: "bg-success/20" },
    { icon: Award, label: "Reward Points", value: mockUser.rewardPoints, color: "bg-accent" },
  ];

  return (
    <div className="container-page">
      {/* Welcome message */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.fullName}!</h1>
        <p className="text-muted-foreground mt-1">Here's an overview of your pollution reports.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Recent Reports Table */}
      <div className="bg-card border rounded-lg shadow-sm">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Recent Reports</h2>
          <Link
            to="/my-reports"
            className="text-primary text-sm font-medium hover:underline"
          >
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockReports.slice(0, 5).map((report) => (
                <tr key={report.id} className="border-b last:border-0 hover:bg-muted/30">
                  <td className="p-4 text-sm">#{report.id}</td>
                  <td className="p-4 text-sm">{report.location}</td>
                  <td className="p-4 text-sm">{report.date}</td>
                  <td className="p-4"><StatusBadge status={report.status} /></td>
                  <td className="p-4">
                    <Link
                      to={`/report/${report.id}`}
                      className="text-primary text-sm font-medium hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
