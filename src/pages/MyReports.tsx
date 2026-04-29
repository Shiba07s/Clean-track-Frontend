/**
 * My Reports Page
 * Displays all user reports as cards with image, date, and status.
 */

import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import { MapPin, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

const MyReports = () => {

  const [reports, setReports] = useState([]);

  // get logged in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userId = user?.id;

  useEffect(() => {

    const fetchReports = async () => {
      try {

        const response = await axios.get(
          `http://localhost:1010/api/reports/user/${userId}`
        );

        setReports(response.data);

      } catch (error) {
        console.error("Error fetching reports", error);
      }
    };

    if (userId) {
      fetchReports();
    }

  }, [userId]);

  return (
    <div className="container-page">
      <h1 className="text-3xl font-bold mb-2">My Reports</h1>
      <p className="text-muted-foreground mb-8">
        Track all your submitted pollution reports below.
      </p>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {reports.map((report) => (

          <div
            key={report.id}
            className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >

            {/* Report Image */}
            <img
              src={report.imageUrl}
              alt={report.description}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-3">

              <div className="flex justify-between items-start">
                <StatusBadge status={report.status} />

                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {report.createdAt}
                </span>
              </div>

              <p className="text-sm text-foreground line-clamp-2">
                {report.description}
              </p>

              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {report.location}
              </p>

              <Link
                to={`/report/${report.id}`}
                className="block text-center bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
              >
                View Details
              </Link>

            </div>
          </div>

        ))}

      </div>
    </div>
  );
};

export default MyReports;


// import { Link } from "react-router-dom";
// import { mockReports } from "@/data/mockData";
// import StatusBadge from "@/components/StatusBadge";
// import { MapPin, Calendar } from "lucide-react";

// const MyReports = () => {
//   return (
//     <div className="container-page">
//       <h1 className="text-3xl font-bold mb-2">My Reports</h1>
//       <p className="text-muted-foreground mb-8">
//         Track all your submitted pollution reports below.
//       </p>

//       {/* Reports Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {mockReports.map((report) => (
//           <div
//             key={report.id}
//             className="bg-card border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
//           >
//             {/* Report Image */}
//             <img
//               src={report.image}
//               alt={report.description}
//               className="w-full h-48 object-cover"
//             />

//             {/* Report Info */}
//             <div className="p-4 space-y-3">
//               <div className="flex justify-between items-start">
//                 <StatusBadge status={report.status} />
//                 <span className="text-xs text-muted-foreground flex items-center gap-1">
//                   <Calendar className="w-3 h-3" />
//                   {report.date}
//                 </span>
//               </div>

//               <p className="text-sm text-foreground line-clamp-2">
//                 {report.description}
//               </p>

//               <p className="text-xs text-muted-foreground flex items-center gap-1">
//                 <MapPin className="w-3 h-3" />
//                 {report.location}
//               </p>

//               {/* View Details Link */}
//               <Link
//                 to={`/report/${report.id}`}
//                 className="block text-center bg-primary text-primary-foreground py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyReports;
