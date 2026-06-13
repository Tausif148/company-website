import { createBrowserRouter, Navigate } from "react-router-dom";

// Common layout
import App from "src/pages/layout/App";
import Home from "src/pages/Home";
import About from "src/pages/About";
import Contact from "src/pages/Contact";
import Careers from "src/pages/Careers";
import CaseStudies from "src/pages/CaseStudies";
import PrivacyPolicy from "src/pages/PrivacyPolicy";
import Partner from "src/pages/Partner";
import Enterprise from "src/pages/Enterprise";
import Product from "src/pages/Product";
import ProductDetails from "src/pages/ProductDetails";
import Services from "src/pages/Services";
import TechnicalExpertise from "src/pages/TechnicalExpertise";
import ServicesDetails from "src/pages/ServicesDetails";

const router = createBrowserRouter([
  // Public Routes
  // {
  //   path: "/admin/login",
  //   element: <Login />,
  // },
  // {
  //   path: "/admin/signup",
  //   element: <Register />,
  // },

  // Main Layout
  {
    path: "/",
    children: [
      {
        element: <App />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/enterprise",
            element: <Enterprise />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "/services",
            element: <Services />,
          },
          {
            path: "/services/:slug",
            element: <ServicesDetails />,
          },
          {
            path: "/technical-expertise",
            element: <TechnicalExpertise />,
          },
          {
            path: "/careers",
            element: <Careers />,
          },
          {
            path: "/case-studies",
            element: <CaseStudies />,
          },
          {
            path: "/careers",
            element: <Careers />,
          },
          {
            path: "/contact",
            element: <Contact />,
          },
          {
            path: "/privacy-policy",
            element: <PrivacyPolicy />,
          },
          {
            path: "/partner",
            element: <Partner />,
          },
          {
            path: "/products",
            element: <Product />,
          },
          {
            path: "/products/:slug",
            element: <ProductDetails />,
          },
          {
            path: "*",
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },

  // Redirect any unmatched route to Home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

export default router;
