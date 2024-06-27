import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { GridLoader } from 'react-spinners';
import * as Constants from "../../constants";
import { useLocation, useNavigate } from 'react-router-dom';

export default function CompletePanel({operation, currentState, currentStep, nextStep, payload}) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    //setLoading(true)
    setTimeout(() => {
      //setLoading(false)
      console.log ('Navigate to register page')
      window.parent.postMessage({ type: "adiaResponse", payload: payload }, "*");
    }, Constants.STANDARD_DELAY)
  }, [])

  return (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh" justifyContent="center" alignItems="center" >
      <GridLoader color="#cc0404" />
      { operation && operation === Constants.OPERATION_REGISTER && 
        <Typography variant="headline" pb={2} >Completing verification...</Typography>
      }
      { operation && operation === Constants.OPERATION_AUTHENTICATE && 
        <Typography variant="headline" pb={2} >Completing authentication...</Typography>
      }
    </Box>
    )
}
