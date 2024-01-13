import { RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";

import { UserProvider } from "./store/UserContext";
import router from "./routes/index";

import "./styles/custom.css";
import "./styles/index.css";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <UserProvider>
    <RouterProvider router={router} />
    <Toaster richColors expand={true} />
  </UserProvider>
);
