# First Project React

> A responsive sports e-commerce experience built with React and modern frontend tools.

First Project React is a clean, responsive storefront for discovering sports products, viewing detailed product information, and managing a shopping cart. The project focuses on reusable React components, predictable state management, and a smooth browsing experience across desktop and mobile screens.

## Contents

- [Highlights](#highlights)
- [Technology](#technology)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Data Source](#data-source)
- [Deploying to Vercel](#deploying-to-vercel)
- [Development Notes](#development-notes)

## Highlights

- Responsive storefront layout for desktop and mobile
- Product catalog with category browsing and search
- Dedicated product details pages
- Shopping cart with quantity updates and item removal
- Login screen with authentication context structure
- Redux Toolkit for product-related state
- React Context for authentication and cart state
- Client-side routing with React Router
- Axios instance configured for API requests
- Direct-route refresh support through Vercel SPA rewrites
- Local product imagery for a fast, polished first render

## Technology

| Category | Tools |
| --- | --- |
| UI | React 18, JSX, CSS |
| Build tool | Vite |
| Routing | React Router |
| State management | Redux Toolkit, React Redux, React Context |
| HTTP requests | Axios |
| Deployment | Vercel |
| Product API | Fake Store API |

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm 9 or newer
- Git

### Installation

```bash
git clone https://github.com/MoustafaFathalla2005/first-project-react.git
cd first-project-react
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL in the terminal, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev       # Start the development server
npm run build     # Build the app for production
npm run preview   # Preview the production build locally
```

Before deploying, verify the production build locally:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
├── api/
│   └── axiosInstance.js       # Shared Axios configuration
├── assets/images/             # Local product and hero images
├── Component/
│   ├── Cart/                  # Cart page and styles
│   ├── Header/                # Main navigation
│   ├── Home/                  # Storefront home page
│   ├── Login/                 # Login page
│   ├── MainCom/               # Shared application layout
│   ├── NotFound/              # Fallback route
│   ├── ProductDetails/        # Product details page
│   └── Products/              # Product catalog page
├── context/
│   ├── AuthContext.jsx        # Authentication state
│   └── CartContext.jsx        # Cart state and actions
├── data/products.js           # Local product data
├── store/
│   ├── productsSlice.js       # Redux product slice
│   └── store.js               # Redux store setup
├── index.css                  # Global styles
├── main.jsx                   # Application entry point
└── router.jsx                 # Route definitions
```

## Data Source

Product requests use the public [Fake Store API](https://fakestoreapi.com). The API is configured in `src/api/axiosInstance.js` and does not require an API key.

## Deploying to Vercel

This project is configured for Vercel and can be deployed from GitHub:

1. Push the project to the `first-project-react` GitHub repository.
2. Open [Vercel](https://vercel.com) and select **Add New Project**.
3. Import the GitHub repository.
4. Select **Vite** as the framework preset.
5. Set the build command to `npm run build`.
6. Set the output directory to `dist`.
7. Click **Deploy**.

The included `vercel.json` rewrites unknown requests to `index.html`, so React Router pages continue to work when opened directly or refreshed.

## Development Notes

- Do not commit `node_modules` or generated `dist` files.
- Keep API keys and private configuration in environment variables.
- Run `npm run build` before opening a pull request or deploying.
- Keep components focused and reuse the existing context and store patterns.

## License

This project was created for learning and portfolio purposes.