import { Cancel, CheckCircle, PersonAdd, PersonPin } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import * as Constants from "../../constants";

export default function StatusPanel({ operation, currentState, currentStep, nextStep, payload }) {
  const [backgroundColor, setBackgroundColor] = useState('green')
  const [message, setMessage] = useState('')

  useEffect(() => {
    console.log ('StatusPanel: Operation: ', operation, ' Current State: ', currentState, ' Current Step: ', currentStep)

    // Get the message based on the current state
    getMessage()

    setTimeout(() => {
      if (operation === Constants.OPERATION_REGISTER) {
        if (currentState === Constants.STATE_USER_ALREADY_ENROLLED) {
          // Show the DA Panel
          nextStep(Constants.PANEL_DIGITAL_ADDRESS, payload)
        } else {
          nextStep(Constants.PANEL_COMPLETE, payload)
        }

      } else if (operation === Constants.OPERATION_AUTHENTICATE) {
        if (currentState === Constants.STATE_AUTHENTICATED) {
          console.log ('Go to ', Constants.PANEL_DIGITAL_ADDRESS)
          nextStep(Constants.PANEL_DIGITAL_ADDRESS, payload)
        } else {
          nextStep(Constants.PANEL_COMPLETE, payload)
        }
      }

    }, Constants.STANDARD_DELAY)

  }, [])

  const getMessage = () => {
    console.log('getMessage(): Current State: ', currentState)
    if (currentState === Constants.STATE_AUTHENTICATED) {
      setMessage('Authenticated')
      setBackgroundColor('green')
    } else if (currentState === Constants.STATE_AUTHENTICATION_FAILED) {
      setMessage('Authentication Failed')
      setBackgroundColor('red')
    } else if (currentState === Constants.STATE_ENROLLED) {
      setMessage('Enrolled')
      setBackgroundColor('green')
    } else if (currentState === Constants.STATE_USER_ALREADY_ENROLLED) {
      setMessage('User Already Enrolled')
      setBackgroundColor('red')
    }
    return ""
  }

  // Function to return a dynamic icon based on the icon paramter
  const getStatusIcon = () => {
    console.log('getStatusIcon(): Current State: ', currentState)
    if (currentState === Constants.STATE_AUTHENTICATED) {
      return (<CheckCircle sx={{ fontSize: '8rem', color: 'white' }} />)
    } else if (currentState === Constants.STATE_AUTHENTICATION_FAILED) {
      return (<Cancel sx={{ fontSize: '8rem', color: 'white' }} />)
    } else if (currentState === Constants.STATE_ENROLLED) {
      return (<PersonAdd sx={{ fontSize: '8rem', color: 'white' }} />)
    } else if (currentState === Constants.STATE_USER_ALREADY_ENROLLED) {
      return (<PersonPin sx={{ fontSize: '8rem', color: 'white' }} />)
    }
    return (<Typography />);
  }


 return (
    <Box display="flex" flexDirection="column" justifyContent="center" height="100%" width="100%" alignItems="center" sx={{ bgcolor: backgroundColor }}>
      {getStatusIcon()}
      <Typography variant="h4" sx={{ color: 'white' }}>{message}</Typography>
    </Box>
  )
}
