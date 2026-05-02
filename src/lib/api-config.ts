/**
 * Centralized API Configuration
 * Environment-based URL setup for loose coupling
 * Supports development, staging, and production environments
 */

// Base API URL from environment or default
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1010";

// External APIs Configuration
const LOCATION_API_KEY = import.meta.env.VITE_LOCATION_API_KEY || "79486de0fe2800dfec366e0aea64c733";
const LOCATION_API_URL = import.meta.env.VITE_LOCATION_API_URL || "http://api.positionstack.com/v1/forward";

/**
 * API Endpoints Configuration
 * All endpoints are centralized here for easy maintenance and modification
 */
export const API_ENDPOINTS = {
  // Auth Endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
  },

  // User Reports Endpoints
  REPORTS: {
    GET_USER_REPORTS: (userId: string) => `${API_BASE_URL}/api/reports/user/${userId}`,
    GET_ALL_REPORTS: `${API_BASE_URL}/api/reports/user/get-all`,
    CREATE_REPORT: (userId: string) => `${API_BASE_URL}/api/reports/create/${userId}`,
    GET_REPORT_BY_ID: (id: string) => `${API_BASE_URL}/api/reports/${id}`,
    UPLOAD_AFTER_PHOTO: (id: string) => `${API_BASE_URL}/api/reports/upload-after-photo/${id}`,
  },

  // Admin Endpoints
  ADMIN: {
    GET_PENDING_REPORTS: `${API_BASE_URL}/api/admin/pending/reports`,
    GET_APPROVED_REPORTS: `${API_BASE_URL}/api/admin/approve/reports`,
    GET_REJECTED_REPORTS: `${API_BASE_URL}/api/admin/reject/reports`,
    APPROVE_REPORT: (id: string) => `${API_BASE_URL}/api/admin/approve/${id}`,
    REJECT_REPORT: (id: string) => `${API_BASE_URL}/api/admin/reject/${id}`,
  },

  // External APIs
  EXTERNAL: {
    LOCATION_SUGGEST: LOCATION_API_URL,
  },
};

/**
 * External API Keys Configuration
 */
export const API_KEYS = {
  LOCATION_STACK: LOCATION_API_KEY,
};

/**
 * API Configuration Object
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  LOCATION_API_URL: LOCATION_API_URL,
  LOCATION_API_KEY: LOCATION_API_KEY,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export default API_ENDPOINTS;
