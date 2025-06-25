import { createRootRoute } from "@tanstack/react-router";
import RootLayout from '../RootLayout';
import { signInRoute, signUpRoute } from "./auth.route";
import { homeRoute } from "./homepage";
import { dashboardRoute } from "./dashboard";


export const rootRoute = createRootRoute({
    component: RootLayout
})
export const routeTree = rootRoute.addChildren([
    signInRoute,
    signUpRoute,
    homeRoute,
    dashboardRoute
])