import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "features",
  component: () => <div>Features Page</div>,
});
