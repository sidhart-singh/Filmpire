import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import store from "./app/store.js";
import ToggleColorModeProvider from "./utils/ToggleColorMode";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ToggleColorModeProvider>
        <App />
      </ToggleColorModeProvider>
    </BrowserRouter>
  </Provider>
);
