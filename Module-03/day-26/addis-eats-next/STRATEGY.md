# Addis Eats - Client and Server Components

## Server Components

The Addis Eats application uses Server Components by default.

The following components remain Server Components:

- 
- 
- 
- 
- 
- 

The menu and dish pages do not contain  and therefore can render on the server.

## Server-Side Data and Rendering

The menu page contains an async  Server Component. Dish information is prepared and rendered on the server rather than requiring the complete menu interface to run in the browser.

The dynamic dish page also remains a Server Component and uses  to pre-render known dishes.

## Client Components

Client Components are limited to areas that require browser-side interactivity.

### CartProvider

 contains  because it uses:

- 
- 
- 

The provider is isolated from the rest of the application.

### AddToCartButton

 contains  because it handles the browser click event and dispatches an item to the cart.

### Cart Page

 is a Client Component because it reads and modifies the client-side cart state.

No  directive is placed on the root layout or menu pages merely to make their child components interactive.

## Rendering Strategy

The production build confirms:

-  is statically prerendered.
-  is statically generated but contains client-side interactivity.
-  is statically generated with .
-  uses Static Site Generation through .
-  is dynamically rendered using .

## Bundle Measurement

After the production build, the JavaScript files in  were measured.

The measured client JavaScript total was:

**591,559 bytes (~577.7 KiB).**

The  directory itself is not used as the client-bundle measurement because it also contains server and build artifacts.

## Architecture Result

The application keeps pages and data preparation on the server wherever possible and limits browser-side JavaScript to components that require state or event handlers.

This creates a clear Server/Client Component boundary without making the entire application a Client Component.

## Day 13 Result

The application demonstrates:

- Server Components for pages and layouts
- Async Server Components
- Isolated Client Components
- An isolated Cart Provider
- Client-side cart state
- Production build verification
- Client JavaScript bundle measurement
