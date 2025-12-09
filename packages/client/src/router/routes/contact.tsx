import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./root";
import { ROUTES } from "../../routes/routes";

export const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.CONTACT,
  component: () => <div>Contact Page</div>,
});
