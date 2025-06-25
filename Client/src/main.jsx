import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routing/routeTree.js";
import { Provider } from "react-redux";
import store from "./store/store.js";

const queryClient = new QueryClient();
const router = createRouter({
  routeTree,
  context: { //ye pass karega har ek route k liye
    queryClient,
    store,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>    
      <RouterProvider router={router} />          
    </QueryClientProvider>
  </Provider>
);
