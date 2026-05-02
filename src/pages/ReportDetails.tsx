/**
 * Report Details Page
 * Shows full details of a single report including images and reward points.
 */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import StatusBadge from "@/components/StatusBadge";
import { MapPin, Calendar, Award, ArrowLeft } from "lucide-react";
import { API_ENDPOINTS } from "@/lib/api-config";

const ReportDetails = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all reports and find the specific one
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS.REPORTS.GET_ALL_REPORTS
        );
        const reports = response.data;
        const foundReport = reports.find((r) => r.id === Number(id));
        setReport(foundReport);
      } catch (error) {
        console.error("Error fetching reports:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReports();
    }
  }, [id]);

  // Show loading state
  if (loading) {
    return (
      <div className="container-page text-center py-20">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <p className="mt-2">Loading report...</p>
      </div>
    );
  }

  // Show error if report not found
  if (!report) {
    return (
      <div className="container-page text-center py-20">
        <h2 className="text-2xl font-bold mb-2">Report Not Found</h2>
        <p className="text-muted-foreground mb-4">The report you're looking for doesn't exist.</p>
        <Link to="/my-reports" className="text-primary hover:underline">
          ← Back to My Reports
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page">
      {/* Back link */}
      <Link
        to="/my-reports"
        className="inline-flex items-center gap-1 text-primary hover:underline mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to My Reports
      </Link>

      <div className="bg-card border rounded-lg shadow-sm overflow-hidden">
        {/* Report Image */}
        <img
          src={report.imageUrl}
          alt={report.description}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder-image.png";
          }}
        />

        <div className="p-6 space-y-6">
          {/* Status and Date */}
          <div className="flex flex-wrap gap-4 items-center">
            <StatusBadge status={report.status} />
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {new Date(report.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {report.location}
            </span>
          </div>

          {/* Description */}
          <div>
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-muted-foreground">{report.description}</p>
          </div>

          {/* Before/After Images */}
          <div>
            <h2 className="text-xl font-bold mb-4">Before / After</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-lg p-8 text-center bg-muted/30">
                <p className="text-muted-foreground text-sm">Before (Reported Image)</p>
                <img 
                  src={report.imageUrl} 
                  alt="Before" 
                  className="mt-3 rounded-md mx-auto max-h-48 object-cover" 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-image.png";
                  }}
                />
              </div>
              <div className="border rounded-lg p-8 text-center bg-muted/30">
                <p className="text-muted-foreground text-sm">After (Cleanup Image)</p>
                {report.afterImageUrl ? (
                  <img 
                    src={report.afterImageUrl} 
                    alt="After" 
                    className="mt-3 rounded-md mx-auto max-h-48 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder-image.png";
                    }}
                  />
                ) : (
                  <div className="mt-3 h-48 flex items-center justify-center">
                    <p className="text-xs text-muted-foreground italic">
                      {report.status === "APPROVED" ? "Cleanup completed" : "Awaiting cleanup"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Reward Points */}
          <div className="bg-accent rounded-lg p-6 flex items-center gap-4">
            <Award className="w-8 h-8 text-primary" />
            <div>
              <p className="font-bold text-lg">
                {report.user?.rewardPoints > 0
                  ? `${report.user.rewardPoints} Points Earned!`
                  : "No Rewards Yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                {report.status === "APPROVED"
                  ? "Thank you for your contribution to a cleaner environment."
                  : "Points will be awarded after your report is approved."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetails;
