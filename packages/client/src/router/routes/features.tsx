import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { ROUTES } from "../../routes/routes";

export const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.FEATURES,
  component: () => <div>Features Page</div>,
});
