import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="575157075241-pt9pmr52q66iuto6v3jqflge4q3emp65.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
