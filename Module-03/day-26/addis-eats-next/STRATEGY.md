# Addis Eats - Rendering Strategy

## Root Layout

The root layout owns the HTML document structure, global CSS, header, navigation and footer. It persists across all routes.

## Menu Layout

The menu route has a nested layout containing the category sidebar. The sidebar remains visible when navigating between the menu and individual dish pages.

## Menu Page

The menu page uses:

```js
export const revalidate = 60;
