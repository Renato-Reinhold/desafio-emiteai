// src/routes/index.tsx
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import RegisterPerson from "../pages/RegisterPerson";
import PeopleList from "../pages/PeopleList";

const rootRoute = createRootRoute({ component: Outlet });

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RegisterPerson,
});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/list",
  component: PeopleList,
});

const routeTree = rootRoute.addChildren([registerRoute, listRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
