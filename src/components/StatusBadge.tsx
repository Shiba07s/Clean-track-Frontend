/**
 * StatusBadge Component
 * Displays a colored badge based on report status.
 * - Pending → yellow/amber
 * - Approved → green
 * - Rejected → red
 */

interface StatusBadgeProps {
  status: "Pending" | "Approved" | "Rejected";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  // Choose colors based on the status
  const colorClasses = {
    Pending: "bg-warning text-warning-foreground",
    Approved: "bg-success text-success-foreground",
    Rejected: "bg-destructive text-destructive-foreground",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colorClasses[status]}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
