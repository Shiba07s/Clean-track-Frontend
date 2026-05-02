/**
 * Login Page
 * Simple login form with email and password fields.
 * Uses basic validation (no backend).
 */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf } from "lucide-react";
import axios from "axios";
import { API_ENDPOINTS } from "@/lib/api-config";

const Login = () => {
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!email || !password) {
    setError("Please fill in all fields.");
    return;
  }

  try {
    const response = await axios.post(
      API_ENDPOINTS.AUTH.LOGIN,
      null,
      {
        params: {
          email: email,
          password: password
        }
      }
    );
    console.log("Login Success:", response.data);

    setError("");

    // Optional: store token or user info
    localStorage.setItem("user", JSON.stringify(response.data));
localStorage.setItem("userName", response.data.fullName);
localStorage.setItem("userId", response.data.id);
    navigate("/dashboard");

  } catch (err: any) {
    console.error(err);

    if (err.response) {
      setError(err.response.data.message || "Invalid email or password");
    } else {
      setError("Server not responding");
    }
  }
};
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Basic validation
  //   if (!email || !password) {
  //     setError("Please fill in all fields.");
  //     return;
  //   }

  //   // Simulate login (no real auth)
  //   // In a real app, this would call an API using Axios
  //   console.log("Login attempt:", { email, password });
  //   setError("");

  //   // Redirect to dashboard after "login"
  //   navigate("/dashboard");
  // };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card border rounded-lg shadow-sm p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <Leaf className="w-10 h-10 text-primary mx-auto mb-2" />
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground text-sm">Login to your CleanTrack account</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-md font-semibold hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
