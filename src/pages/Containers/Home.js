/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-key */



import React from "react";
import { Route, Routes } from "react-router-dom";

import * as routes from "../../routes";
import Workspace from "./Workspace";
import { Grid } from "@mui/material";

export default function Home({ history }) {
  const getRoutes = (
    <Routes>
      {routes.routePaths.map((item, index) =>
      (
        <Route
          exact
          path={item.path}
          element={item.component}
          name={item.name}
          key={index}
        />
      )
      )}
    </Routes>
  );

  return (
    <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
      <Grid item xs={3}>
          <Workspace> {getRoutes}</Workspace>
      </Grid>
    </Grid> 
    );
}
