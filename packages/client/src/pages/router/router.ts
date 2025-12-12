import { createRouter } from "@tanstack/react-router";

import { rootRoute } from "./routes/root";
import { indexRoute } from "./routes/index";
import { featuresRoute } from "./routes/features";
import { pricingRoute } from "./routes/pricing";
import { contactRoute } from "./routes/contact";
import { loginRoute } from "./routes/login";
import { signupRoute } from "./routes/signup";
import { dashboardRoute } from "./routes/dashboard";


const routeTree = rootRoute.addChildren([
  indexRoute,
  featuresRoute,
  pricingRoute,
  contactRoute,
  loginRoute,
  signupRoute,
  dashboardRoute,
]);

export const router = createRouter({ routeTree });
