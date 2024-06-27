import { createContext, useReducer, useEffect, useContext } from "react";
import { deepOrange, green, indigo, red } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export const AppContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "direction":
            const newState = {
                ...state,
                direction: state.direction === "ltr" ? "rtl" : "ltr",
            };
            return newState;
        case "type":
            return { ...state, type: state.type === "light" ? "dark" : "light" };
        default:
            return state;
    }
};

export const AppProvider = ({ children }) => {
    const prefersDarkMode = useMediaQuery("@media (prefers-color-scheme: dark)");
    const [state, dispatch] = useReducer(reducer, {
        type: prefersDarkMode ? "dark" : "light",
        direction: "ltr",
    });

    const theme = createTheme({
        direction: state.direction,
        palette: {
            type: state.type,
            primary: { main: "#cc0404" },
            secondary: { main: "#000000" },
            error: {main: red[800]},   
            warning: { main: deepOrange[800]},
            info: { main: indigo[800]},
            success: { main: green[800] },
        },
        root: {
            padding: 0,
            margin: 0,
        },
        paper: {
            padding: 1,
            margin: 1,
        },
        card: {
            position: "relative",
            clear: "both",
        },
        appBar: {
            boxShadow: 0,
        },

        typography: {
            fontFamily: ["Roboto", "Helvetica Neue", "Arial", "sans-serif"].join(","),
            title: {
                fontSize: "2rem",
                fontWeight: 500,
            },
            headline: {
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "grey",
            },
            headline2: {
                fontSize: "1.2rem",
                color: "grey",
            },
            subtitle1: {
                fontSize: "1rem",
                color: "grey",
            },
            subtitle2: {
                fontSize: "1rem",
                color: "lightgrey",
            },

            button: {
                fontWeight: 400,
                textTransform: "initial",
            },
            body1: {
                fontSize: "1rem",
            },
        },
        shape: {
            borderRadius: 4,
        },
    });

    useEffect(() => {
        document.body.dir = state.direction;
    }, [state.direction]);

    //console.log('AppContext state:', state)

    return (
        <ThemeProvider theme={theme}>
            <AppContext.Provider value={{ ...state, dispatch }}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    {children}
                </LocalizationProvider>
            </AppContext.Provider>
        </ThemeProvider>
    );
};

export default AppProvider;
export const useAppState = () => useContext(AppContext);
