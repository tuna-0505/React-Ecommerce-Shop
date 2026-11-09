# Web Technologies Laboratory - Assignment 7 (React Multi-Page Application)

**Student Name:** Tunahan Mutlu  
**Student ID:** 230408002  

## 1. File Organization
The project is built using Vite, React 18, React Router v6, and Zustand for state management:

- `src/api/`: Pure API fetch utilities (`productsApi.js`, `authApi.js`).
- `src/hooks/`: Custom reusable hooks (`useFetch.js`, `useLocalStorage.js`).
- `src/context/`: Authentication state using React Context & `useReducer` (`AuthContext.jsx`).
- `src/store/`: Cart state management via Zustand with external `localStorage` subscription (`cartStore.js`).
- `src/components/`: Reusable UI wrappers (`Layout.jsx`, `NavBar.jsx`, `ProductCard.jsx`, `ProtectedRoute.jsx`).
- `src/pages/`: Router view pages (`Home.jsx`, `ProductList.jsx`, `ProductDetail.jsx`, `Cart.jsx`, `Login.jsx`, `NotFound.jsx`).
- `src/App.jsx` & `src/main.jsx`: Router configuration and entry root.

## 2. Section 10: Reasoning Questions

### State Choices
- **Signed-in user:** Lives in React Context (`AuthContext`) because auth status changes infrequently across app lifetime and provides high-level user session access.
- **Cart:** Lives in a Zustand store (`cartStore`) because cart actions occur frequently from various components (e.g., adding from card/detail, modifying in cart view) and require efficient atomic updates without re-rendering unrelated tree nodes.
- **Filter values:** Live in URL Query Strings via `useSearchParams` to ensure filter states are shareable via link and persistent across reloads.
- **Product list:** Loaded asynchronously inside `ProductList` using `useFetch` hook state.
- **Theme:** Managed locally via `useLocalStorage` custom hook attached to layout styling wrappers.

### Context versus Store
Context is ideal for global low-frequency updates like authentication or theme defaults. Using Context for high-frequency state like a shopping cart causes unnecessary re-renders down the component tree whenever cart items change. Zustand provides atomic state selection, enabling `NavBar` to select only `items.length` without triggering re-renders when item properties change.

### Custom Hooks
The `useFetch` hook encapsulates asynchronous state management (loading, error, data) and cleanup execution using `AbortController`. It does NOT share data states between `ProductList` and `ProductDetail` — each component invocation maintains an isolated instance of the hook's reducer state.

### Route Parameters
The `id` parameter extracted via `useParams()` is of type `string`. In `productsApi.js`, passing `id` directly inside template literals (`/products/${id}`) converts it into the expected URL string, while comparisons with numeric dataset IDs require strict awareness of string key values.

### Protected Routes
Client-side `ProtectedRoute` wrapper is a UX mechanism that prevents UI rendering for unauthenticated visitors. It is not true security because all client code, JS bundles, and public endpoints can still be inspected in the browser. True security requires server-side API authorization headers (e.g., JWT).

### Deep Links
On a plain static file server without fallback configuration, refreshing `/products/3` returns a 404 HTTP error because no physical `products/3.html` file exists on disk. The Vite development server handles client-side routing by redirecting all HTTP requests back to `index.html` (HTML5 History API fallback).

## 3. Self-Study Items
- **Query String Updating:** Used `URLSearchParams` object in `useSearchParams()` hook to modify `q` or `category` parameters independently using `.set()` and `.delete()` methods, keeping other existing parameters intact.
- **Safe LocalStorage Store Initialization:** Implemented `try-catch` blocks inside store initializers (`loadInitialCart`) to fallback gracefully to empty arrays if local storage data is missing or corrupted.
- **Theme Implementation:** Bound `useLocalStorage` preference to top-level container inline styles, toggling background and text color variables seamlessly.

## 4. Challenges Faced & Solutions
- **Preventing Memory Leaks in Data Fetching:** Solved by supplying an `AbortController` signal to the native `fetch` API inside `useFetch`, ensuring pending requests abort when components unmount or route parameters change.
- **Zustand Persistence Outside React:** Implemented `useCartStore.subscribe()` outside component lifecycle to keep `localStorage` strictly synchronized without writing redundant `useEffect` triggers.
