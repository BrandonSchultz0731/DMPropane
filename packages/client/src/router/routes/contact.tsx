import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "contact",
  component: () => <div>Contact Page</div>,
});
