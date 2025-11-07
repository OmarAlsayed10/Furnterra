# Furnterra

Full‑stack e‑commerce application built with Angular 19 (SSR) and NestJS, backed by MongoDB. The repository contains two projects:

- `furnterra-frontend`: Angular 19 app with server‑side rendering configured via `@angular/ssr`.
- `furnterra-backend`: NestJS API exposing auth, products, blogs, orders, and uploads.

## About This Project

- Domain: Furniture and home decor e‑commerce.
- Purpose: Provide a modern storefront to browse collections and products, read blogs, manage cart and checkout, and operate via an admin dashboard.
- Tech stack: Angular 19 with SSR for SEO/performance, NestJS API, MongoDB, JWT auth, optional Google OAuth, image uploads for products/blogs.
- UX: Responsive UI, Material components, and a WYSIWYG editor for content management.

## Usage and Permission

This project is proprietary. No one can use, copy, modify, or distribute this project without the explicit written permission of the owner. All rights reserved. Contact the owner to request access or licensing.

## Prerequisites

- Node.js 18+ and npm
- MongoDB (local or a cloud instance)
- Optional for email/Google login:
  - `EMAIL_USER`, `EMAIL_PASSWORD` (SMTP credentials)
  - `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL`

## Project Structure

- Frontend: `furnterra-frontend/`
  - Angular dev server: `http://localhost:4200/`
  - SSR production server script: `serve:ssr:furnterra` (defaults to `http://localhost:4000/`)
  - API base URL: `src/environments/environment.ts` (`apiURL: 'http://localhost:3000'`)
- Backend: `furnterra-backend/`
  - NestJS server: defaults to `http://localhost:3000/`
  - Static uploads served under `/upload/`
  - CORS origin defaults to `http://localhost:4200`

## Setup

Install dependencies in both projects:

```bash
cd furnterra-frontend && npm install
cd ../furnterra-backend && npm install
```

### Configure Environment Variables (Backend)

Create a `.env` file in `furnterra-backend/` (or set env vars in your shell):

```bash
# Required
MONGODB_URI=mongodb://localhost:27017/furnterra
JWT_SECRET=change-me

# Optional: server port
PORT=3000
```

If you plan to serve the frontend via SSR at `http://localhost:4000`, consider adding that origin to backend CORS.

### Configure Frontend API URL

Frontend uses `src/environments/environment.ts`:

```ts
export const environment = {
  production: false,
  apiURL: 'http://localhost:3000'
};
```

Update `apiURL` if your backend runs elsewhere.

## Running in Development

Run backend (NestJS) in watch mode:

```bash
cd furnterra-backend
npm run start:dev
```

Run frontend (Angular dev server):

```bash
cd furnterra-frontend
npm start
```

- Frontend: `http://localhost:4200/`
- Backend: `http://localhost:3000/`

Note: Backend CORS is configured for `http://localhost:4200`. If you serve the frontend from a different origin during dev, update CORS accordingly in `src/main.ts`.

## Production Build and SSR

Build the frontend and serve via the SSR Node server:

```bash
cd furnterra-frontend
npm run build
npm run serve:ssr:furnterra
# SSR server listens on http://localhost:4000
```

Start the backend in production:

```bash
cd furnterra-backend
npm run build
npm run start:prod
# Backend listens on http://localhost:3000
```

When using SSR at `http://localhost:4000`, make sure backend CORS allows `http://localhost:4000` if browser requests originate from that origin.

## API Overview (high level)

- Auth (`/auth`)
  - `POST /auth/register` — register with email + OTP email
  - `POST /auth/login` — returns `access_token`
  - `POST /auth/verify-otp` — verify OTP and finalize account
  - `POST /auth/resend-otp` — resend verification OTP
  - `GET /auth/google` / `GET /auth/google/callback` — Google OAuth
- Users (`/users`) — protected; owner/admin
  - `GET /users` — paginated list with filters/search
  - `GET /users/:id`
- Products (`/products`)
  - Standard CRUD, image upload; static files served under `/upload/products/*`
- Blogs (`/blogs`)
  - CRUD; protected operations for admin/owner

Attach `Authorization: Bearer <token>` for protected routes.


## Useful Scripts

- Frontend
  - `npm start` — Angular dev server
  - `npm run build` — production build
  - `npm run serve:ssr:furnterra` — run SSR Node server from `dist/furnterra/server/server.mjs`
- Backend
  - `npm run start:dev` — dev with watch
  - `npm run start:prod` — run compiled server
  - `npm run build` — compile to `dist/`
  - `npm run lint`, `npm run format` — code quality

## Roadmap / Next Steps

- Profile and Settings
  - Complete profile page with editable settings (name, email, password, addresses).
  - Add avatar upload and user preferences (notifications, privacy).
- Admins and Roles
  - Add admin user management (invite/remove admins, role assignment: owner/admin/staff).
  - Enforce role‑based permissions across dashboard modules.
- Earnings and Analytics
  - Show earnings: daily/weekly/monthly revenue, order counts, average order value.
  - Charts on dashboard and CSV export.
- Orders and Inventory
  - Order statuses, fulfillment workflow, refund/return handling.
  - Stock levels, low‑stock alerts, bulk updates.
- Content and SEO
  - Blog scheduling, drafts, tags, and improved SEO metadata.
- Reliability
  - E2E tests for auth/checkout, error monitoring, and performance budgets.


## License

“All rights reserved. Proprietary software. No public use, copying, distribution, or modification without the owner’s written permission.”