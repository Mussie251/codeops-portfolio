# Addis Eats — Authentication and Authorization

## 1. Overview

Addis Eats uses a demo authentication system built with Next.js App Router, signed JSON Web Tokens (JWTs), and HTTP-only cookies. The application supports two roles: customer and staff.

## 2. Session Management

Session logic is implemented in `lib/session.js`.

- Sessions use JWTs signed with the HS256 algorithm.
- The signing secret is read from the `SESSION_SECRET` environment variable.
- The secret must contain at least 32 characters.
- Sessions expire after seven days.
- The session cookie is named `addis-eats-session`.
- The cookie uses `httpOnly`, `sameSite: "lax"`, and `path: "/"`.
- The `secure` flag is enabled in production.
- Invalid, expired, or incorrectly structured tokens are rejected.
- Signing out deletes the session cookie.

## 3. User Roles

The demo accounts are defined in `lib/db.js`.

| Account | Role |
|---|---|
| `abebe@example.com` | Customer |
| `staff@example.com` | Staff |

This assignment uses demo accounts rather than real password-based authentication. It is not a production-ready identity system.

## 4. Route Protection

`proxy.js` checks for the presence of the session cookie on protected routes and redirects requests without a cookie to `/signin`.

Server-side session and role checks provide the actual authorization enforcement:

- **Checkout:** customers only.
- **Order status:** customers can view their own orders; staff can view orders.
- **Kitchen:** staff only.
- **Order API:** requires a valid session and checks order ownership for non-staff users.
- **Order cancellation:** checks the customer session, order ownership, and order status.

The proxy's cookie-presence check is not sufficient by itself to authenticate a user. Protected server pages, actions, and API handlers must continue to verify the session and authorization.

## 5. Order Data

The project uses a mock in-memory database in `lib/db.js`. The order store is attached to `globalThis` to help share state across module instances in the development process.

This store is temporary. Orders may be lost when the server process restarts, and in-memory storage is not appropriate for production persistence.

## 6. Security Limitations

Before production use, the application would need a persistent database, real identity verification, appropriate login protections, and a secure deployment configuration. Demo account selection is intended only for coursework and does not verify ownership of an email address.

## 7. Verification

The following behaviors were manually tested:

- Successful customer and staff sign-in.
- Sign-out and rejection of unauthenticated API requests.
- Redirects to sign-in for protected pages.
- Customer denial of access to the staff-only Kitchen page.
- Successful staff access to the Kitchen page.
- Order-status API retrieval and SWR polling without a refresh error.