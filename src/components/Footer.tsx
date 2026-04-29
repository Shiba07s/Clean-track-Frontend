/**
 * Footer Component
 * Simple footer with project info and credits.
 */
import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 font-bold text-lg">
            <Leaf className="w-5 h-5" />
            CleanTrack
          </div>

          {/* Description */}
          <p className="text-sm text-primary-foreground/80 text-center">
            A Pollution Reporting System — B.Tech College Project
          </p>

          {/* Copyright */}
          <p className="text-sm text-primary-foreground/60">
            © 2026 CleanTrack. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
