import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import RegisterPerson from "../pages/RegisterPerson";
import PeopleList from "../pages/PeopleList";
import Home from "../pages/Home";
import AppAppBar from "../components/AppBar/AppAppBar";
import React from "react";

const RootLayout = () => (
  <>
    <AppAppBar />
    <Outlet />
  </>
);

const rootRoute = createRootRoute({ component: RootLayout });

const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/people",
  component: RegisterPerson,
});

const listRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/list",
  component: PeopleList,
});

const routeTree = rootRoute.addChildren([HomeRoute, registerRoute, listRoute]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
