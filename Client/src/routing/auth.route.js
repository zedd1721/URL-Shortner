import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

export const signInRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signin',
    component: SignIn
})

export const signUpRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/signup',
    component: SignUp
})