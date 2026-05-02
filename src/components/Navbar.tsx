/**
 * Navbar Component
 * Displays navigation links, user profile, and logout functionality.
 */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Get logged-in user data
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const userName = user?.fullName;
  const userRole = user?.role;

  console.log(userName);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check active route
  const isActive = (path: string) => location.pathname === path;

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Navigation links - base links visible to everyone
  const baseLinks = [
    { path: "/", label: "Home" },
  ];

  // Protected links - only visible to authenticated users
  const protectedLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/report", label: "Report Pollution" },
    { path: "/my-reports", label: "My Reports" },
  ];

  // Combine links based on authentication status
  const links = userName ? [...baseLinks, ...protectedLinks] : baseLinks;

  return (
    <nav className="bg-primary text-primary-foreground shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Leaf className="w-6 h-6" />
            CleanTrack
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-2">

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-primary-foreground/20"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Show Admin link only for ADMIN */}
            {userRole === "ADMIN" && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isActive("/admin")
                    ? "bg-primary-foreground/20"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                Admin
              </Link>
            )}

            {/* Profile Section - Desktop */}
            {userName ? (
              <div className="relative ml-4" ref={profileMenuRef}>
                {/* Profile Button */}
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-foreground/10 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30"
                >
                  {/* Avatar */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 border border-white/40 hover:bg-white/30 transition-colors">
                    <span className="text-sm font-semibold text-white">
                      {userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  {/* Name and Role */}
                  <div className="hidden sm:flex flex-col items-start">
                    <span className="text-sm font-semibold text-white">{userName}</span>
                    <span className="text-xs text-white/70 capitalize">{userRole?.toLowerCase()}</span>
                  </div>

                  {/* Dropdown Chevron */}
                  <ChevronDown
                    className={`w-4 h-4 text-white/70 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 px-4 py-3 text-white">
                      <p className="font-semibold text-sm">{userName}</p>
                      <p className="text-xs text-white/80 capitalize mt-1">
                        {userRole === "ADMIN" ? "Administrator" : "User"}
                      </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      {/* Profile Option */}
                      {/* <button
                        onClick={() => {
                          navigate("/admin");
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="group-hover:font-medium">View Profile</span>
                      </button> */}

                      {/* Settings Option */}
                      {/* <button
                        onClick={() => {
                          navigate("/settings");
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors group"
                      >
                        <Settings className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                        <span className="group-hover:font-medium">Settings</span>
                      </button> */}

                      {/* Divider */}
                      <div className="my-1 border-t border-gray-200"></div>

                      {/* Logout Option */}
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsProfileOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors group"
                      >
                        <LogOut className="w-4 h-4 text-red-400 group-hover:text-red-600" />
                        <span className="group-hover:font-medium">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-white text-black px-3 py-1 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}

          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-1">

            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm ${
                  isActive(link.path)
                    ? "bg-primary-foreground/20"
                    : "hover:bg-primary-foreground/10"
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Admin Mobile */}
            {userRole === "ADMIN" && (
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-primary-foreground/10"
              >
                Admin
              </Link>
            )}

            {/* Profile Mobile */}
            {userName && (
              <div className="px-3 py-3 border-t border-primary-foreground/20 mt-2 space-y-2">
                {/* User Header */}
                <div className="flex items-center gap-3 pb-2">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-foreground/20 border border-primary-foreground/40">
                    <span className="text-sm font-semibold">
                      {userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{userName}</p>
                    <p className="text-xs text-primary-foreground/70 capitalize">
                      {userRole === "ADMIN" ? "Administrator" : "User"}
                    </p>
                  </div>
                </div>

                {/* Mobile Menu Items */}
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>View Profile</span>
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-red-200 hover:bg-red-500/20 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}

            {!userName && (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 bg-white text-black rounded-md text-sm"
              >
                Login
              </Link>
            )}

          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;






// /**
//  * Navbar Component
//  * Displays the top navigation bar with links to different pages.
//  * Shows different links based on whether user is logged in.
//  */
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { Leaf, Menu, X, User } from "lucide-react";
// import { useState } from "react";

// const Navbar = () => {
//   // State to toggle mobile menu
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
//   const userName = localStorage.getItem("userName");

//   const navigate = useNavigate();

// const handleLogout = () => {
//   localStorage.removeItem("userName");
//   localStorage.removeItem("userId");

//   navigate("/login");
// };

//   // Helper to check if a link is active
//   const isActive = (path: string) => location.pathname === path;

//   // Navigation links for the app
//   const links = [
//     { path: "/", label: "Home" },
//     { path: "/dashboard", label: "Dashboard" },
//     { path: "/report", label: "Report Pollution" },
//     { path: "/my-reports", label: "My Reports" },
//     { path: "/admin", label: "Admin" },
//   ];

//   return (
//     <nav className="bg-primary text-primary-foreground shadow-md">
//       <div className="max-w-6xl mx-auto px-4">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo and brand name */}
//           <Link to="/" className="flex items-center gap-2 font-bold text-xl">
//             <Leaf className="w-6 h-6" />
//             CleanTrack
//           </Link>

//           {/* Desktop navigation links */}
//           <div className="hidden md:flex items-center gap-1">
//             {links.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
//                   isActive(link.path)
//                     ? "bg-primary-foreground/20"
//                     : "hover:bg-primary-foreground/10"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}

//               {/* Profile Section */}
//   {userName && (
//     <div className="flex items-center gap-2 ml-4">
//       <User className="w-5 h-5" />
//       <span className="text-sm font-medium">{userName}</span>
//     </div>
//   )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="md:hidden p-2"
//             aria-label="Toggle menu"
//           >
//             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//           </button>
//         </div>

//         {/* Mobile menu dropdown */}
//         {isOpen && (
//           <div className="md:hidden pb-4 space-y-1">
//             {links.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsOpen(false)}
//                 className={`block px-3 py-2 rounded-md text-sm font-medium ${
//                   isActive(link.path)
//                     ? "bg-primary-foreground/20"
//                     : "hover:bg-primary-foreground/10"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             {userName && (
//   <div className="flex items-center gap-2 px-3 py-2">
//     <User className="w-5 h-5" />
//     <span>{userName}</span>
//   </div>
// )}
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
