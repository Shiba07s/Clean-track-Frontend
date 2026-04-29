/**
 * StatCard Component
 * Displays a single statistic with icon, label, and value.
 * Used on the dashboard to show totals.
 */
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color?: string;
}

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => {
  return (
    <div className="bg-card rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Icon with colored background */}
        <div className={`p-3 rounded-full ${color || "bg-accent"}`}>
          <Icon className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
