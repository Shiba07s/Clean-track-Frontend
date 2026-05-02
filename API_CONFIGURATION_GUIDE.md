# API Configuration Guide

## Overview
This document outlines the centralized API configuration system that has been implemented to decouple hardcoded URLs from the codebase.

## Files Changed

### New Files Created
- **`src/lib/api-config.ts`** - Centralized API configuration with all endpoints
- **`.env.example`** - Environment variables template

### Updated Files
All the following files have been refactored to use centralized API endpoints:
1. `src/pages/Login.tsx`
2. `src/pages/Register.tsx`
3. `src/pages/Dashboard.tsx`
4. `src/pages/MyReports.tsx`
5. `src/pages/ReportPollution.tsx`
6. `src/pages/ReportDetails.tsx`
7. `src/pages/AdminDashboard.tsx`
8. `src/pages/Verifiy.tsx`

## Environment Configuration

### Setup Instructions

1. **Create `.env` file** in the project root:
   ```bash
   cp .env.example .env
   ```

2. **Update values in `.env`**:
   ```env
   # Backend API Configuration
   VITE_API_BASE_URL=http://localhost:1010

   # External APIs Configuration
   VITE_LOCATION_API_URL=http://api.positionstack.com/v1/forward
   VITE_LOCATION_API_KEY=your_location_api_key_here

   # Environment
   VITE_APP_ENV=development
   ```

3. **For Production**, change to production URL:
   ```env
   VITE_API_BASE_URL=https://api.production.com
   VITE_APP_ENV=production
   ```

## API Configuration Structure

### Accessing Endpoints

#### Authentication Endpoints
```typescript
import { API_ENDPOINTS } from "@/lib/api-config";

// Login
const loginUrl = API_ENDPOINTS.AUTH.LOGIN;
// Result: http://localhost:1010/api/auth/login

// Register
const registerUrl = API_ENDPOINTS.AUTH.REGISTER;
// Result: http://localhost:1010/api/auth/register
```

#### User Reports Endpoints
```typescript
// Get user reports with dynamic user ID
const userReportsUrl = API_ENDPOINTS.REPORTS.GET_USER_REPORTS(userId);
// Result: http://localhost:1010/api/reports/user/{userId}

// Get all reports
const allReportsUrl = API_ENDPOINTS.REPORTS.GET_ALL_REPORTS;
// Result: http://localhost:1010/api/reports/user/get-all

// Create report with user ID
const createUrl = API_ENDPOINTS.REPORTS.CREATE_REPORT(userId);
// Result: http://localhost:1010/api/reports/create/{userId}

// Get specific report
const reportUrl = API_ENDPOINTS.REPORTS.GET_REPORT_BY_ID(reportId);
// Result: http://localhost:1010/api/reports/{reportId}

// Upload after photo
const uploadUrl = API_ENDPOINTS.REPORTS.UPLOAD_AFTER_PHOTO(reportId);
// Result: http://localhost:1010/api/reports/upload-after-photo/{reportId}
```

#### Admin Endpoints
```typescript
// Get pending reports
const pendingUrl = API_ENDPOINTS.ADMIN.GET_PENDING_REPORTS;
// Result: http://localhost:1010/api/admin/pending/reports

// Get approved reports
const approvedUrl = API_ENDPOINTS.ADMIN.GET_APPROVED_REPORTS;
// Result: http://localhost:1010/api/admin/approve/reports

// Get rejected reports
const rejectedUrl = API_ENDPOINTS.ADMIN.GET_REJECTED_REPORTS;
// Result: http://localhost:1010/api/admin/reject/reports

// Approve a report
const approveUrl = API_ENDPOINTS.ADMIN.APPROVE_REPORT(reportId);
// Result: http://localhost:1010/api/admin/approve/{reportId}

// Reject a report
const rejectUrl = API_ENDPOINTS.ADMIN.REJECT_REPORT(reportId);
// Result: http://localhost:1010/api/admin/reject/{reportId}
```

#### External APIs
```typescript
// Location API endpoint
const locationUrl = API_ENDPOINTS.EXTERNAL.LOCATION_SUGGEST;
// API Key
const apiKey = API_KEYS.LOCATION_STACK;
```

## Usage Examples

### Before (Tightly Coupled)
```typescript
// ❌ BAD: Hardcoded URL
const response = await axios.get(
  `http://localhost:1010/api/reports/user/${userId}`
);
```

### After (Loosely Coupled)
```typescript
// ✅ GOOD: Using centralized configuration
import { API_ENDPOINTS } from "@/lib/api-config";

const response = await axios.get(
  API_ENDPOINTS.REPORTS.GET_USER_REPORTS(userId)
);
```

## Benefits

1. **Single Source of Truth** - All URLs defined in one place
2. **Environment-Based Configuration** - Different URLs for dev, staging, production
3. **Easy Maintenance** - Update URLs without touching component code
4. **Reduced Coupling** - Components don't know about URL structure
5. **Security** - Sensitive API keys managed via environment variables
6. **Scalability** - Easy to add new endpoints
7. **Type Safety** - TypeScript ensures correct endpoint access

## Deployment Instructions

### Development
```bash
npm run dev
# Uses VITE_API_BASE_URL from .env (default: http://localhost:1010)
```

### Production
1. Update `.env` with production URLs
   ```env
   VITE_API_BASE_URL=https://api.production.com
   ```

2. Build the application
   ```bash
   npm run build
   ```

3. Deploy built files to hosting

## API Configuration in Vite

The configuration uses Vite's environment variables feature:
- Accessed via `import.meta.env.VITE_*`
- Variables must be prefixed with `VITE_`
- Loaded from `.env` file at build time
- Different `.env` files can be used per environment (`.env.production`, `.env.development`)

## Adding New Endpoints

When adding new API endpoints, follow this pattern in `src/lib/api-config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  
  NEW_FEATURE: {
    GET_DATA: `${API_BASE_URL}/api/new-feature/data`,
    POST_DATA: `${API_BASE_URL}/api/new-feature/create`,
    UPDATE_DATA: (id: string) => `${API_BASE_URL}/api/new-feature/${id}`,
  }
};
```

Then import and use in your component:
```typescript
import { API_ENDPOINTS } from "@/lib/api-config";

const url = API_ENDPOINTS.NEW_FEATURE.GET_DATA;
```

## Notes

- Never commit `.env` file to version control (already in `.gitignore`)
- Always use `.env.example` as a template
- Keep API keys secure and never hardcode them
- Use this configuration for all external API calls
