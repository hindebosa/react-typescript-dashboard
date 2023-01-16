import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./context/ContextProvider";
import PaynowReactWrapper from "paynow-react";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/AuthProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const paynow_config = {
  integration_id: "15628",
  integration_key: "290cfc50-77a2-4d54-b77b-613dce1c4381",
  result_url: "default-result-url",
  return_url: "default-return-url",
};
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContextProvider>
          <PaynowReactWrapper {...paynow_config}>
            <App />
          </PaynowReactWrapper>
        </ContextProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
