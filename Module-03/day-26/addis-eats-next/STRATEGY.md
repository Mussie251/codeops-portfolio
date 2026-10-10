# Addis Eats — Rendering and Component Strategy

## Server Components

Next.js App Router components are Server Components by default unless a file declares "use client".

The following remain Server Components:
- app/layout.js
- app/page.js
- app/menu/layout.js
- app/menu/page.js
- app/menu/[id]/page.js
- app/checkout/page.js

The root layout can render the client-side CartProvider without itself becoming a Client Component.

## Rendering Strategy

- /: statically rendered home page.
- /menu: statically rendered with Incremental Static Regeneration (ISR).
- /menu/[id]: statically generated for known dish IDs using generateStaticParams().
- /cart: Client Component for interactive cart state.
- /checkout: dynamically rendered using force-dynamic.
- /api/dishes and /api/orders: Route Handlers for HTTP requests.

The menu page revalidation interval is 3600 seconds (one hour).

## Client Components

Client Components are used where browser-side interactivity or React state is needed.

### CartProvider
app/cart/CartProvider.jsx declares "use client" because it uses:
- createContext and useContext
- useReducer for cart state
- A shared provider value for components that access the cart

### AddToCartButton
app/menu/components/AddToCartButton.jsx declares "use client" because it dispatches an ADD action in response to a browser click.

### Cart Page
app/cart/page.js declares "use client" because it reads and updates the cart through useCart() and handles remove and clear actions.

### Checkout Form
app/checkout/CheckoutForm.jsx is a Client Component for interactive form state and submission through a Server Action.

The root layout and menu pages do not need "use client" merely because they render interactive child components.

## Data and API Boundaries

The API Route Handlers use the shared mock data layer in lib/db.js.
Order input is validated with the Zod schema in lib/schema.js.

The data layer is currently an in-memory mock implementation. It is suitable for the class exercise but does not provide persistent database storage or production authentication.

## Verification

The production build has succeeded.
The menu route is configured for ISR with a 3600-second revalidation interval.
Individual dish routes are generated using generateStaticParams().
Checkout is configured for dynamic rendering.

Re-run npm run build after changes to confirm the final route table and compilation.

## Limitations

The current menu UI and mock database use different dish IDs and dish records. This should be aligned before treating the UI and API as one integrated data source.
The reported client JavaScript bundle size of 591,559 bytes (~577.7 KiB) is a previous measurement and must be re-measured if the code changes.
