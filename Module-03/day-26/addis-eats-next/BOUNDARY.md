# Addis Eats — Server and Client Boundary

## Purpose

Keep data preparation and page rendering on the server by default. Use Client Components only for browser-side state, event handlers, and interactive forms.

## Server Components

- app/layout.js: root layout, metadata, navigation, and shared page shell.
- app/page.js: home page.
- app/menu/layout.js: menu section layout.
- app/menu/page.js: menu page.
- app/menu/[id]/page.js: dish detail page.
- app/checkout/page.js: checkout page shell.

These files do not require a "use client" directive in their current implementation.

## Client Components

- app/cart/CartProvider.jsx: React context and reducer for shared cart state.
- app/cart/page.js: displays and updates cart contents.
- app/menu/components/AddToCartButton.jsx: adds a dish to the cart.
- app/checkout/CheckoutForm.jsx: interactive checkout form.
- app/menu/error.js: error boundary with a retry event handler.

## Route Handlers and Server Actions

- app/api/dishes/route.js: returns the dish collection.
- app/api/dishes/[id]/route.js: returns a dish or a 404 response.
- app/api/orders/route.js: validates an order request and returns a response.
- app/checkout/actions.js: validates and processes checkout form submissions.
- app/orders/actions.js: contains order cancellation logic.

## Data and Validation

- lib/db.js: in-memory mock data and data access functions.
- lib/schema.js: Zod order validation schema.

The mock data is not persistent. The mock session is not a substitute for production authentication.

## Boundary Rules

1. Keep database and server-only operations out of Client Components.
2. Pass serializable data from Server Components to Client Components.
3. Put "use client" at the narrowest component boundary that requires browser APIs, state, or event handlers.
4. Validate untrusted order input on the server.
5. Do not assume that hiding UI controls provides authorization; verify authorization in server-side operations.
6. Re-run the production build after architectural changes.
