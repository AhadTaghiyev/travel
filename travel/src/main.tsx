import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { UserProvider } from "./store/UserContext";
import router from "./routes/index";

import "./styles/custom.css";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
