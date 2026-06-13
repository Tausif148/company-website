import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "src/assets/styles/index.css";
import "src/assets/styles/orb-animations.css";
import "src/assets/styles/swiper.css";

import router from "./routes/Routes.tsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
