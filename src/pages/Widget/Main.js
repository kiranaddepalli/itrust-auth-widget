import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import StatusMessage from "../../components/StatusMessage";
import * as Constants from "../../constants";
import { useLocation } from "react-router-dom";
import FacePanel from "./FacePanel";
import DigitalAddressPanel from "./DigitalAddressPanel";
import StatusPanel from "./StatusPanel";
import CompletePanel from "./CompletePanel";


export default function Main({ refresh }) {
  const [status, setStatus] = useState({
    open: false,
    type: "success",
    message: "",
  });
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [operation, setOperation] = useState(null); 
  const [currentState, setCurrentState] = useState(Constants.STATE_START)
  const [currentStep, setCurrentStep] = useState(Constants.PANEL_FACE)
  const steps = [ Constants.PANEL_FACE, Constants.PANEL_STATUS, Constants.PANEL_DIGITAL_ADDRESS, Constants.PANEL_COMPLETE]
  const [payload, setPayload] = useState(null)

  useEffect(() => {
    // Set the operation based on the URL parameter
    if (params && params.get('op')) {
      setOperation(params.get('op'))
    }else 
      setOperation(Constants.OPERATION_AUTHENTICATE)
  }, []);

  const nextStep = (next, payload) => {
    console.log ('Current Step: ', currentStep, ' Next Step: ', next, ' Payload: ', payload)
    if (payload){
      setPayload(payload)
      setCurrentState(payload.state)
    }
    setCurrentStep(next)
  }

  return (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh" justifyContent="center" alignItems="center">
      <StatusMessage status={status} changeStatus={setStatus} />

      {/* { operation && operation === Constants.OPERATION_REGISTER && <RegistrationWizard />}
      { operation && operation === Constants.OPERATION_AUTHENTICATE && <AuthenticationWizard />} */}

    { operation && currentStep && currentStep === Constants.PANEL_FACE && 
      <FacePanel operation={operation} currentState={currentState} currentStep={currentStep} nextStep={nextStep}/>
    }
    { operation && currentStep && currentStep === Constants.PANEL_STATUS &&
      <StatusPanel operation={operation} currentState={currentState} currentStep={currentStep} nextStep={nextStep} payload={payload}/>
    }
    { operation && currentStep && currentStep === Constants.PANEL_DIGITAL_ADDRESS &&
      <DigitalAddressPanel operation={operation} currentState={currentState} currentStep={currentStep} nextStep={nextStep} payload={payload}/>
    }
    { operation && currentStep && currentStep === Constants.PANEL_COMPLETE &&
      <CompletePanel operation={operation} currentState={currentState}  currentStep={currentStep} nextStep={nextStep} payload={payload}/>
    }
     

      
    </Box>
  );
}
