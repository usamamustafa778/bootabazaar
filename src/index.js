import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import Router from "./Router";
import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "b572720c5111a0d0cf3d6c75a9f06220Tz02MTk2NixFPTE3MTAzOTYwOTIyNzIsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);
