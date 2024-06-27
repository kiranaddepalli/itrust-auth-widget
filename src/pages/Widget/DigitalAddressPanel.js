import React, { useEffect } from 'react'
import * as Constants from "../../constants";
import { Box, Typography } from '@mui/material';
import QRCode from 'react-qr-code';

export default function DigitalAddressPanel({operation, currentState, currentStep, nextStep, payload}) {

  useEffect(() => {
    console.log ('DAPanel: Operation: ', operation, ' Current State: ', currentState, ' Current Step: ', currentStep)
   setTimeout ( () => {
      // console.log ('DAPanel: Operation: ', operation, ' Current State: ', currentState, ' Current Step: ', currentStep)
      
      if (operation === Constants.OPERATION_REGISTER) {
        if (currentState === Constants.STATE_USER_ALREADY_ENROLLED) {
          nextStep(Constants.PANEL_COMPLETE, payload)
        } 
      } else if (operation === Constants.OPERATION_AUTHENTICATE) {
        if (currentState === Constants.STATE_AUTHENTICATED) {
          nextStep(Constants.PANEL_COMPLETE, payload)
        } 
      }

    }, Constants.STANDARD_DELAY)


  }, [])

  return (
    <Box p={1} display="flex" flexDirection="column" justifyContent="center" alignItems="center" width="100%" >
            <Typography variant="headline" pb={2} >Your Digital Address</Typography>
            <Box boxShadow={4} display="flex" flexDirection="row" justifyContent="flex-start" alignItems="center" p={4} gap={4} width="80%" sx={{ color: 'white', backgroundColor: 'primary.main' }}>
                <QRCode value={JSON.stringify(payload)} size={64} />
                <Box display="flex" flexDirection="column" >
                    <Typography variant="body1" fontWeight={"bold"}>
                        Digital Address
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {payload?.digitalAddress}
                    </Typography>
                    <Typography variant="body1" fontWeight={"bold"} pt={2}>
                        DID
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {payload?.did}
                    </Typography>
                </Box>
            </Box>
        </Box>
  )
}
