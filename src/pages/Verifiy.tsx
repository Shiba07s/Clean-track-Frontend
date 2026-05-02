// /**
//  * Admin Dashboard Page
//  * Displays all complaints in a table with approve/reject functionality.
//  * Status changes are simulated (UI only, no backend).
//  */


import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { Shield, ArrowLeft } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api-config";

interface Report {
  id: number;
  imageUrl: string;
  afterImageUrl?: string;
  location: string;
  description: string;
  status: string;
  createdAt: string;
}

const Verify = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [afterImage, setAfterImage] = useState<File | null>(null);

  // Fetch Report Details
  const fetchReport = async () => {
    try {
      const response = await axios.get(
        API_ENDPOINTS.REPORTS.GET_REPORT_BY_ID(id!)
      );
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchReport();
    }
  }, [id]);

  // Approve
  const approveReport = async () => {
    try {
      setActionLoading(true);

      await axios.put(
        API_ENDPOINTS.ADMIN.APPROVE_REPORT(id!)
      );

      alert("Report Approved Successfully");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to approve report");
    } finally {
      setActionLoading(false);
    }
  };

  // Reject
  const rejectReport = async () => {
    try {
      setActionLoading(true);

      await axios.put(
        API_ENDPOINTS.ADMIN.REJECT_REPORT(id!)
      );

      alert("Report Rejected");
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert("Failed to reject report");
    } finally {
      setActionLoading(false);
    }
  };

  // Upload After Photo - FIXED VERSION
const uploadAfterPhoto = async () => {
  if (!afterImage) {
    alert("Select image first");
    return;
  }

  try {
    setActionLoading(true);

    const formData = new FormData();
    formData.append("image", afterImage);

    await axios.post(
      API_ENDPOINTS.REPORTS.UPLOAD_AFTER_PHOTO(id!),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    alert("Uploaded Successfully");
    fetchReport();

  } catch (error) {
    console.error(error);
    alert("Upload failed");
  } finally {
    setActionLoading(false);
  }
};

  if (loading) {
    return (
      <div className="p-10 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2">Loading...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="p-10 text-center text-red-500">
        <p className="text-xl font-semibold">Report Not Found</p>
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="mt-4 px-4 py-2 bg-gray-200 rounded"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container-page max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-3 items-center">
          <Shield className="w-8 h-8 text-primary" />

          <div>
            <h1 className="text-3xl font-bold">
              Verify Report #{report.id}
            </h1>
            <p className="text-muted-foreground">
              Review complaint and verify cleaning status
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/admin-dashboard")}
          className="px-4 py-2 bg-gray-200 rounded flex gap-2 items-center hover:bg-gray-300 transition"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg border p-6">

        {/* Before Image */}
        <h2 className="text-xl font-semibold mb-3">
          Before Cleaning Image
        </h2>

        <img
          src={report.imageUrl}
          alt="before cleaning"
          className="w-full h-72 object-cover rounded-lg border mb-6"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.png";
          }}
        />

        {/* After Image if uploaded */}
        {report.afterImageUrl && (
          <>
            <h2 className="text-xl font-semibold mb-3">
              After Cleaning Image
            </h2>

            <img
              src={report.afterImageUrl}
              alt="after cleaning"
              className="w-full h-72 object-cover rounded-lg border mb-6"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder-image.png";
              }}
            />
          </>
        )}

        {/* Details */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">

          <div>
            <p className="font-semibold text-gray-700">Location</p>
            <p className="text-gray-600">{report.location}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Date</p>
            <p className="text-gray-600">
              {new Date(report.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700">Description</p>
            <p className="text-gray-600">{report.description}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Status</p>
            <StatusBadge status={report.status} />
          </div>

        </div>

        {/* Upload Section */}
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">

          <h2 className="text-lg font-semibold mb-3">
            Upload After Cleaning Photo
          </h2>

          <div className="space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAfterImage(e.target.files?.[0] || null)
              }
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100
                cursor-pointer"
            />

            {afterImage && (
              <p className="text-sm text-gray-600">
                Selected: {afterImage.name} ({(afterImage.size / 1024).toFixed(2)} KB)
              </p>
            )}

            <button
              onClick={uploadAfterPhoto}
              disabled={actionLoading || !afterImage}
              className={`px-4 py-2 rounded font-medium transition ${
                actionLoading || !afterImage
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {actionLoading ? "Uploading..." : "Upload Photo"}
            </button>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">

          <button
            onClick={approveReport}
            disabled={actionLoading}
            className={`px-5 py-2 rounded font-medium transition ${
              actionLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {actionLoading ? "Processing..." : "Approve"}
          </button>

          <button
            onClick={rejectReport}
            disabled={actionLoading}
            className={`px-5 py-2 rounded font-medium transition ${
              actionLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            {actionLoading ? "Processing..." : "Reject"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default Verify;
// import { useEffect, useState } from "react";
// import axios from "axios";
// import StatusBadge from "@/components/StatusBadge";
// import { Shield } from "lucide-react";
// import { useParams } from "react-router-dom";


// // const FILTERS = [
// //   { label: "All",      value: "ALL",      endpoint: "http://localhost:1010/api/reports/user/get-all" },
// //   { label: "Pending",  value: "PENDING",  endpoint: "http://localhost:1010/api/admin/pending/reports" },
// //   { label: "Approved", value: "APPROVED", endpoint: "http://localhost:1010/api/admin/approve/reports" },
// //   { label: "Rejected", value: "REJECTED", endpoint: "http://localhost:1010/api/admin/reject/reports" },
// // ];

// const Verify = () => {
//   const [reports, setReports]       = useState([]);
//   const [loadingId, setLoadingId]   = useState(null);
//   const [activeFilter, setActiveFilter] = useState("ALL");
//   const [fetching, setFetching]     = useState(false);

// //   const fetchReports = async (filter = "ALL") => {
// //     const target = FILTERS.find((f) => f.value === filter);
// //     setFetching(true);
// //     try {
// //       const response = await axios.get(target.endpoint);
// //       setReports(response.data);
// //     } catch (error) {
// //       console.error("Error fetching reports:", error);
// //     } finally {
// //       setFetching(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchReports(activeFilter);
// //   }, [activeFilter]);

//   const handleStatusChange = async (id, newStatus) => {
//     setLoadingId(id);
//     try {
//       if (newStatus === "APPROVED") {
//         await axios.put(`http://localhost:1010/api/admin/approve/${id}`);
//       } else if (newStatus === "REJECTED") {
//         await axios.put(`http://localhost:1010/api/admin/reject/${id}`);
//       }
//       // Re-fetch current filter after action so list stays in sync
//     //   await fetchReports(activeFilter);
//     } catch (error) {
//       console.error(`Error updating report #${id}:`, error);
//     } finally {
//       setLoadingId(null);
//     }
//   };

//   const { id } = useParams();
//   const filterTabStyle = (value) =>
//     `px-4 py-2 rounded-full text-sm font-medium transition-all ${
//       activeFilter === value
//         ? value === "ALL"
//           ? "bg-gray-800 text-white"
//           : value === "PENDING"
//           ? "bg-yellow-500 text-white"
//           : value === "APPROVED"
//           ? "bg-green-500 text-white"
//           : "bg-red-500 text-white"
//         : "bg-muted text-muted-foreground hover:bg-muted/80"
//     }`;

//   return (
//     <div className="container-page">
//       {/* Header */}
//       <div className="flex items-center gap-3 mb-6">
//         <Shield className="w-8 h-8 text-primary" />
//         <div>
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <p className="text-muted-foreground">Review and manage pollution reports.</p>
//         </div>
//       </div>

//       {/* Filter Tabs */}
//       {/* <div className="flex gap-2 mb-6">
//         {FILTERS.map((f) => (
//           <button
//             key={f.value}
//             onClick={() => setActiveFilter(f.value)}
//             className={filterTabStyle(f.value)}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div> */}

//       {/* Table */}
//       <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
//         {fetching ? (
//           <div className="p-8 text-center text-muted-foreground">Loading...</div>
//         ) : reports.length === 0 ? (
//           <div className="p-8 text-center text-muted-foreground">No reports found.</div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b bg-muted/50">
//                   <th className="p-4 text-left">ID</th>
//                   <th className="p-4 text-left">Image</th>
//                   <th className="p-4 text-left">Location</th>
//                   <th className="p-4 text-left">Date</th>
//                   <th className="p-4 text-left">Status</th>
//                   <th className="p-4 text-left">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {reports.map((report) => (
//                   <tr key={report.id} className="border-b hover:bg-muted/30 transition-colors">
//                     <td className="p-4 font-medium">#{report.id}</td>
//                     <td className="p-4">
//                       <img
//                         src={report.imageUrl}
//                         alt="report"
//                         className="w-16 h-12 object-cover rounded"
//                       />
//                     </td>
//                     <td className="p-4">{report.location}</td>
//                     <td className="p-4">{new Date(report.createdAt).toLocaleDateString()}</td>
//                     <td className="p-4">
//                       <StatusBadge status={report.status} />
//                     </td>
//                     <td className="p-4">
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => handleStatusChange(report.id, "APPROVED")}
//                           disabled={loadingId === report.id || report.status === "APPROVED"}
//                           className="px-3 py-1 text-xs bg-green-500 text-white rounded 
//                                      disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
//                         >
//                           {loadingId === report.id ? "..." : "Approve"}
//                         </button>
//                         <button
//                           onClick={() => handleStatusChange(report.id, "REJECTED")}
//                           disabled={loadingId === report.id || report.status === "REJECTED"}
//                           className="px-3 py-1 text-xs bg-red-500 text-white rounded 
//                                      disabled:opacity-40 disabled:cursor-not-allowed hover:bg-red-600 transition-colors"
//                         >
//                           {loadingId === report.id ? "..." : "Reject"}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Verify;



