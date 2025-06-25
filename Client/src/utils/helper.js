import { redirect } from "@tanstack/react-router";

export const checkAuth = ({ context }) => {
  const store = context.store;
  const queryClient = context.queryClient;

  const auth = store.getState().auth;
  if (!auth.isAuthenticated) {
    throw redirect({ to: "/signin" });
  }
};
