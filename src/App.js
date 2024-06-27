import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppProvider from "./context/AppContext";

import Home from "./pages/Containers/Home";


function App() {
    return (
        <AppProvider>
            <Router>
                <Routes>
                    <Route exact path="/*" element={<Home />} />
                </Routes>
            </Router>
        </AppProvider>
    );
}

export default App;
