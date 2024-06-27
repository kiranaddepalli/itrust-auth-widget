import { Home,  } from "@mui/icons-material";
import React from "react";
import Main from "./pages/Widget/Main";

export const routePaths = [
    {
        path: "/",
        name: "Home",
        type: "link",
        icon: Home,
        component: <Main />,
    }
    
];
