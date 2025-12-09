import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { ROUTES } from "../../routes/routes";

export const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.PRICING,
  component: () => <div>Pricing Page</div>,
});
