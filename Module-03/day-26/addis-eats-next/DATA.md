# Addis Eats — Day 41 Data Fetching Strategy

## 1. Order Status

- **Query key:** `/api/orders/${initialOrder.id}`
- **Fetcher:** `fetcher` from `lib/fetcher.js`
- **Initial data:** The order loaded by the Server Component and passed as `fallbackData`.
- **Refresh rule:** Poll every 5 seconds using `refreshInterval: 5000`.
- **Justification:** Order status can change after the initial page load. Polling keeps the displayed status reasonably current without requiring a full page refresh.

## 2. Menu Search and Pagination

- **Query key:** `/api/menu?search=${encodeURIComponent(search)}&page=${page}`
- **Fetcher:** `fetcher` from `lib/fetcher.js`
- **Debounce:** Wait 300 milliseconds after typing stops before updating the search term.
- **Empty search:** Use a `null` SWR key so no search request is sent when the search term is empty.
- **Previous data:** Use `keepPreviousData: true` to retain existing results while new results load.
- **Pagination:** Include the page number in the query key. Each page is a distinct SWR cache entry.
- **Refresh rule:** No periodic polling; revalidation follows SWR's default behavior.
- **Justification:** Debouncing reduces unnecessary requests while typing. Pagination limits each response to five dishes. Keeping previous data avoids a blank results area during a new search.

## 3. Shared Fetcher

- **Location:** `lib/fetcher.js`
- **Behavior:** Fetch JSON, throw an error for non-success HTTP responses, and return the parsed response body.
- **Justification:** A shared fetcher avoids duplicating HTTP and JSON handling across SWR components.
