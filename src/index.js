import { React, StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import App from "./App";
import "./assets/styles/app.css";
import reportWebVitals from "./reportWebVitals";
import DebugContextProvider from "./context/DebugContext";


const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);



root.render(
    <StrictMode>
        <DebugContextProvider>
                <App />
        </DebugContextProvider>
    </StrictMode>
);

reportWebVitals();
