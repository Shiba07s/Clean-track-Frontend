/**
 * Navbar Component
 * Displays navigation links, user profile, and logout functionality.
 */

import { Link, useLocation, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, User } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get logged-in user data
const user = JSON.parse(localStorage.getItem("user") || "{}");

const userName = user?.fullName;
const userRole = user?.role;

console.log(userName);
  // const userRole = localStorage.getItem("role");

  // Check active route
  const isActive = (path: string) => location.pathname === path;

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Navigation links
  const links = [
    { path: "/", label: "Home" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/report", label: "Report Pollution" },
    { path: "/my-reports", label: "My Reports" },
  ];

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

            {/* Profile Section */}
            {userName ? (
              <div className="flex items-center gap-3 ml-4">

                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span className="text-sm font-medium">{userName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
                </button>

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
              <div className="px-3 py-2 space-y-2">

                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{userName}</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-sm bg-red-500 px-3 py-1 rounded hover:bg-red-600"
                >
                  Logout
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
