import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "pricing",
  component: () => <div>Pricing Page</div>,
});
