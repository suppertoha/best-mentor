import { createRoot } from "react-dom/client";
import "@/shared/styles/index.scss";
import { setupApiAuth } from "@/app/api";
import { App } from "./app/App";
import { Provider } from "react-redux";
import { store } from "@/app/store/store";

setupApiAuth();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
