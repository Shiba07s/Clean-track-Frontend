/**
 * Admin Dashboard Page
 * Displays all complaints in a table with approve/reject functionality.
 * Status changes are simulated (UI only, no backend).
 */

import { useEffect, useState } from "react";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "@/lib/api-config";



const FILTERS = [
  { label: "All",      value: "ALL",      endpoint: API_ENDPOINTS.REPORTS.GET_ALL_REPORTS },
  { label: "Pending",  value: "PENDING",  endpoint: API_ENDPOINTS.ADMIN.GET_PENDING_REPORTS },
  { label: "Approved", value: "APPROVED", endpoint: API_ENDPOINTS.ADMIN.GET_APPROVED_REPORTS },
  { label: "Rejected", value: "REJECTED", endpoint: API_ENDPOINTS.ADMIN.GET_REJECTED_REPORTS },
];

const AdminDashboard = () => {
  const [reports, setReports]       = useState([]);
  const [loadingId, setLoadingId]   = useState(null);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [fetching, setFetching]     = useState(false);
  const navigate = useNavigate();


  const fetchReports = async (filter = "ALL") => {
    const target = FILTERS.find((f) => f.value === filter);
    setFetching(true);
    try {
      const response = await axios.get(target.endpoint);
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchReports(activeFilter);
  }, [activeFilter]);

  const handleStatusChange = async (id, newStatus) => {
    setLoadingId(id);
    try {
      if (newStatus === "APPROVED") {
        await axios.put(API_ENDPOINTS.ADMIN.APPROVE_REPORT(id));
      } else if (newStatus === "REJECTED") {
        await axios.put(API_ENDPOINTS.ADMIN.REJECT_REPORT(id));
      }
      // Re-fetch current filter after action so list stays in sync
      await fetchReports(activeFilter);
    } catch (error) {
      console.error(`Error updating report #${id}:`, error);
    } finally {
      setLoadingId(null);
    }
  };

  const filterTabStyle = (value) =>
    `px-4 py-2 rounded-full text-sm font-medium transition-all ${
      activeFilter === value
        ? value === "ALL"
          ? "bg-gray-800 text-white"
          : value === "PENDING"
          ? "bg-yellow-500 text-white"
          : value === "APPROVED"
          ? "bg-green-500 text-white"
          : "bg-red-500 text-white"
        : "bg-muted text-muted-foreground hover:bg-muted/80"
    }`;

  return (
    <div className="container-page">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Review and manage pollution reports.</p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={filterTabStyle(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        {fetching ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : reports.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No reports found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Date</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">#{report.id}</td>
                    <td className="p-4">
                      <img
                        src={report.imageUrl}
                        alt="report"
                        className="w-16 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="p-4">{report.location}</td>
                    <td className="p-4">{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td className="p-4">
                      <StatusBadge status={report.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                        onClick={() => navigate(`/verify/${report.id}`)}
                          // onClick={() => navigate("/verify")}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded 
                                     disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 transition-colors">
                           Verify
                        </button>
                        {/* <button
                          onClick={() => handleStatusChange(report.id, "APPROVED")}
                          disabled={loadingId === report.id || report.status === "APPROVED"}
                          className="px-3 py-1 text-xs bg-green-500 text-white rounded 
                                     disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                        >
                          {loadingId === report.id ? "..." : "Approve"}
                        </button> */}
                        {/* <button
                          onClick={() => handleStatusChange(report.id, "REJECTED")}
                          disabled={loadingId === report.id || report.status === "REJECTED"}
                          className="px-3 py-1 text-xs bg-red-500 text-white rounded 
                                     disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
                        >
                          {loadingId === report.id ? "..." : "Reject"}
                        </button> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;













// import { useEffect, useState } from "react";
// import axios from "axios";
// import StatusBadge from "@/components/StatusBadge";
// import { Shield } from "lucide-react";

// const AdminDashboard = () => {

//   const [reports, setReports] = useState([]);

//   // Fetch reports from backend
//   const fetchReports = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:1010/api/reports/user/get-all"
//       );

//       setReports(response.data);

//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   // Approve / Reject UI simulation
//   const handleStatusChange = (id, newStatus) => {
//     setReports((prev) =>
//       prev.map((report) =>
//         report.id === id
//           ? { ...report, status: newStatus }
//           : report
//       )
//     );
//   };

//   return (
//     <div className="container-page">

//       {/* Header */}
//       <div className="flex items-center gap-3 mb-8">
//         <Shield className="w-8 h-8 text-primary" />
//         <div>
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <p className="text-muted-foreground">
//             Review and manage pollution reports.
//           </p>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">

//           <table className="w-full">

//             <thead>
//               <tr className="border-b bg-muted/50">
//                 <th className="p-4 text-left">ID</th>
//                 <th className="p-4 text-left">Image</th>
//                 <th className="p-4 text-left">Location</th>
//                 <th className="p-4 text-left">Date</th>
//                 <th className="p-4 text-left">Status</th>
//                 <th className="p-4 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report.id} className="border-b">

//                   <td className="p-4">#{report.id}</td>

//                   <td className="p-4">
//                     <img
//                       src={report.imageUrl}
//                       alt="report"
//                       className="w-16 h-12 object-cover rounded"
//                     />
//                   </td>

//                   <td className="p-4">{report.location}</td>

//                   <td className="p-4">
//                     {new Date(report.createdAt).toLocaleDateString()}
//                   </td>

//                   <td className="p-4">
//                     <StatusBadge status={report.status} />
//                   </td>

//                   <td className="p-4">
//                     <div className="flex gap-2">

//                       <button
//                         onClick={() =>
//                           handleStatusChange(report.id, "APPROVED")
//                         }
//                         className="px-3 py-1 text-xs bg-green-500 text-white rounded"
//                       >
//                         Approve
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleStatusChange(report.id, "REJECTED")
//                         }
//                         className="px-3 py-1 text-xs bg-red-500 text-white rounded"
//                       >
//                         Reject
//                       </button>

//                     </div>
//                   </td>

//                 </tr>
//               ))}
//             </tbody>

//           </table>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;












// import { useState } from "react";
// import { mockReports, Report } from "@/data/mockData";
// import StatusBadge from "@/components/StatusBadge";
// import { Shield } from "lucide-react";

// const AdminDashboard = () => {
//   // Local state to manage report statuses (simulate approve/reject)
//   const [reports, setReports] = useState<Report[]>([...mockReports]);

//   // Handle status change for a report
//   const handleStatusChange = (id: number, newStatus: "Approved" | "Rejected") => {
//     setReports((prev) =>
//       prev.map((report) =>
//         report.id === id
//           ? { ...report, status: newStatus, rewardPoints: newStatus === "Approved" ? 20 : 0 }
//           : report
//       )
//     );
//   };

//   return (
//     <div className="container-page">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-8">
//         <Shield className="w-8 h-8 text-primary" />
//         <div>
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <p className="text-muted-foreground">Review and manage pollution reports.</p>
//         </div>
//       </div>

//       {/* Complaints Table */}
//       <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b bg-muted/50">
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">ID</th>
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Image</th>
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Location</th>
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
//                 <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report.id} className="border-b last:border-0 hover:bg-muted/30">
//                   <td className="p-4 text-sm font-medium">#{report.id}</td>
//                   <td className="p-4">
//                     <img
//                       src={report.image}
//                       alt="Report"
//                       className="w-16 h-12 rounded object-cover"
//                     />
//                   </td>
//                   <td className="p-4 text-sm">{report.location}</td>
//                   <td className="p-4 text-sm">{report.date}</td>
//                   <td className="p-4">
//                     <StatusBadge status={report.status} />
//                   </td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       {/* Approve Button */}
//                       <button
//                         onClick={() => handleStatusChange(report.id, "Approved")}
//                         disabled={report.status === "Approved"}
//                         className="px-3 py-1 text-xs font-medium bg-success text-success-foreground rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
//                       >
//                         Approve
//                       </button>
//                       {/* Reject Button */}
//                       <button
//                         onClick={() => handleStatusChange(report.id, "Rejected")}
//                         disabled={report.status === "Rejected"}
//                         className="px-3 py-1 text-xs font-medium bg-destructive text-destructive-foreground rounded hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
//                       >
//                         Reject
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
