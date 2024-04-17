import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../Layout/Layout.jsx";
import { AnimatedSwitch } from "../Layout/AnimatedSwitch/AnimatedSwitch.jsx";
import { Home, Login, Registration, UserProfile } from "../../Pages/index.js";
import { NotFound } from "../../Widgets/index.js";
import {
  PlaningDays,
  Dashboard,
  Bookings,
  ServicesAdmin,
  NewsAdmin,
  ReviewsAdmin,
} from "../../Pages/Admin/components/index.js";
import AdminLayout from "../../Pages/Admin/components/AdminLayout/AdminLayout.jsx";

export const routePath = {
  //user
  INITIAL_PATH: "/",
  PROFILE: "/profile",
  LOGIN_PAGE: "/login",
  REGISTRATION_PAGE: "/registration",

  //admin
  PLANING_DAYS: "/planingDays",
  BOOKINGS: "/bookings",
  SERVICES: "/services",
  NEWS: "/news",
  REVIEWS: "/reviews",
};

export const unAuthRoutes = createBrowserRouter([
  {
    path: routePath.INITIAL_PATH,
    element: <AnimatedSwitch />,
    children: [
      {
        path: "",
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: routePath.LOGIN_PAGE,
        element: (
          <Layout>
            <Login />
          </Layout>
        ),
      },
      {
        path: routePath.REGISTRATION_PAGE,
        element: (
          <Layout>
            <Registration />
          </Layout>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const authRoutes = createBrowserRouter([
  {
    path: routePath.INITIAL_PATH,
    element: <AnimatedSwitch />,
    children: [
      {
        path: "",
        element: (
          <Layout>
            <Home />
          </Layout>
        ),
      },
      {
        path: routePath.PROFILE,
        element: (
          <Layout>
            <UserProfile />
          </Layout>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const adminRoutes = createBrowserRouter([
  {
    path: routePath.INITIAL_PATH,
    children: [
      {
        path: "",
        element: (
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        ),
      },
      {
        path: routePath.PLANING_DAYS,
        element: (
          <AdminLayout>
            <PlaningDays />
          </AdminLayout>
        ),
      },
      {
        path: routePath.BOOKINGS,
        element: (
          <AdminLayout>
            <Bookings />
          </AdminLayout>
        ),
      },
      {
        path: routePath.NEWS,
        element: (
          <AdminLayout>
            <NewsAdmin />
          </AdminLayout>
        ),
      },
      {
        path: routePath.REVIEWS,
        element: (
          <AdminLayout>
            <ReviewsAdmin />
          </AdminLayout>
        ),
      },
      {
        path: routePath.SERVICES,
        element: (
          <AdminLayout>
            <ServicesAdmin />
          </AdminLayout>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
