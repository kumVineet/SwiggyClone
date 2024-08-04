import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
const Login = lazy(() => import("./components/Login"));
const About = lazy(() => import("./components/About"));
const Body = lazy(() => import("./components/Body"));
const Cart = lazy(() => import("./components/Cart"));
const Error = lazy(() => import("./components/Error"));
const Header = lazy(() => import("./components/Header"));
const ContactUs = lazy(() => import("./components/ContactUs"));
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Loading.....</h1>}>
        <AppLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contactUs",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: "/restaurants/:resId",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<h1>Loading.....</h1>}>
            <Login />
          </Suspense>
        ),
      },
    ],
    errorElement: (
      <Suspense fallback={<h1>Loading.....</h1>}>
        <Error />
      </Suspense>
    ),
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
