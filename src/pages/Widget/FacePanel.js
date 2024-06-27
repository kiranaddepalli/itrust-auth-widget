import { Alert, Box, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { GridLoader } from 'react-spinners';
import {
  useCamera,
  useWasm,
  usePredictOneFa,
  useEnrollOneFa
} from "../../hooks";
import { DebugContext } from "../../context/DebugContext";
import { useParams } from 'react-router-dom';
import { isBackCamera } from '../../utils/PlatformUtils';
import { getRawFaceValidationStatus } from '@privateid/cryptonets-web-sdk/dist/utils';
import * as Constants from "../../constants";
import { findDigitalAddressByGUID } from '../../services/DigitalAddressService';

let callingWasm = false;

export default function FacePanel({ operation, currentState, currentStep, nextStep }) {
  const [loading, setLoading] = useState(false);
  const debugContext = useContext(DebugContext);
  let { loadSimd } = useParams();

  const [showSuccess, setShowSuccess] = useState(false);
  const [disableButtons, setDisableButtons] = useState(false);

  const [skipAntiSpoof, setSkipAntispoof] = useState(true);

  const { ready: wasmReady, deviceSupported, init: initWasm } = useWasm();
  const { ready: cameraReady, init: initCamera, device, devices, settings, capabilities, setReady, } = useCamera("userVideo");

  const isBack = isBackCamera(devices, device);
  const [deviceId, setDeviceId] = useState(device);
  const [devicesList] = useState(devices);

  const [privateIdStatus, setPrivateIdStatus] = useState(0)

  // DUMMY DATA 
  const DUMMY_DA = 'natty.ralestone.us@cvs'
  const DUMMY_DID = 'did:adia:ocMkIWkKInVrLVRnPEZZzcDdSgHWEpiR'

  // User Authentication Hook 
  const handleEnrollSuccess = async (result) => {
    console.log("---- Enroll Result ---", result);

    const payload = {
      status: result?.status,
      message: result?.message,
      privateId: result?.guid,
    }

    if (result.status === 0) {
      if (payload.privateId && result?.message === "User Already Enrolled") {
        // Get the did and DID for the user 
        const response = await findDigitalAddressByGUID(payload.privateId);
        console.log('Got the DA Metadata: ', response)

        payload.did = response?.entityDID
        payload.digitalAddress = response?.entityDigitalAddress
        payload.state = Constants.STATE_USER_ALREADY_ENROLLED
        nextStep(Constants.PANEL_STATUS, payload);

      } else {
        payload.state = Constants.STATE_ENROLLED
        nextStep(Constants.PANEL_STATUS, payload);
      }
    } else {
      console.log("Enroll Failed. Start a registration flow", result);
    }
  };

  // User Authentication Hook 
  const handlePredictSuccess = (result) => {
    console.log("Predict Result", result);
    if (result.status === 0) {
      const payload = {
        status: result?.status,
        message: result?.message,
        privateId: result?.guid,
        did: DUMMY_DID,
        digitalAddress: DUMMY_DA
      }

      nextStep(Constants.STATE_FACE_DETECTED, payload);
    } else {
      console.log("Predict Failed. Start a registration flow", result);
    }
  };

  const { enrollGUID, enrollPUID, enrollAntispoofPerformed, enrollAntispoofStatus, enrollValidationStatus, 
    enrollToken, enrollUserOneFa, }
  = useEnrollOneFa("userVideo", handleEnrollSuccess, null, deviceId, setShowSuccess, setDisableButtons);

  const {predictAntispoofPerformed,predictAntispoofStatus, predictGUID, predictPUID, predictValidationStatus,
    predictMessage, predictUserOneFa,
  } = usePredictOneFa("userVideo", handlePredictSuccess, 4, null, setShowSuccess, setDisableButtons);

  // User Registration Hook
  const useEnrollSuccess = () => {
    setShowSuccess(true);
  };


  useEffect(() => {

    console.log('Operation: ', operation, ' Current State: ', currentState, ' Current Step: ', currentStep)
    async function initializeWasm() {
      if (wasmReady && cameraReady) {
        return;
      }
      if (!wasmReady) {
        if (!callingWasm) {
          // NOTE: MAKE SURE THAT WASM IS ONLY LOADED ONCE
          await initWasm(loadSimd);
          callingWasm = true;
        }
        return;
      }
      if (!cameraReady) {
        await initCamera();
      }
    }

    // Check if WASM and Camera are ready
    const handleInitializationComplete = () => {
      return (wasmReady && cameraReady) ? true : false
    }

    // setLoading(true);
    initializeWasm();

    var pollInterval = 1000;
    var maxIterations = 60; // 1 minute
    var iterations = 0
    var interval; 
    switch (operation) {
      case Constants.OPERATION_REGISTER:
        console.log ('Operation: Register')
        interval = setInterval(() => {
          iterations++;
          const initialized = handleInitializationComplete();
          if (initialized) {
            clearInterval(interval);
            enrollUserOneFa("", skipAntiSpoof);
            return
          } else if (iterations < maxIterations) {
            clearInterval(interval);
            console.log("Initialization failed")
          } else {
            console.log("----- Fall out of the loop -----")
            return
          }
        }, pollInterval);
        break;
      case Constants.OPERATION_AUTHENTICATE:
        console.log ('Operation: Authenticate')
        interval = setInterval(() => {
          iterations++;
          const initialized = handleInitializationComplete();
          if (initialized) {
            clearInterval(interval);
            predictUserOneFa(skipAntiSpoof);
            return
          } else if (iterations < maxIterations) {
            clearInterval(interval);
            console.log("Initialization failed")
          }
        }, pollInterval);
        break;
      default:
        console.log ('Operation: Unknown')
        break;
    }

  }, [wasmReady, cameraReady])


  return loading ? (
    <Box display="flex" flexDirection="column" width="100vw" height="100vh" justifyContent="center" alignItems="center" >
      <GridLoader color="#cc0404" />
    </Box>
  ) : (
    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <video id="userVideo" muted autoPlay playsInline style={{ width: "100%" }} />

      {operation && operation === Constants.OPERATION_REGISTER &&
        <Alert severity="info" sx={{ width: "100%" }}>
          <Typography variant="body1" fontWeight="bold">
            Validation Status
          </Typography>
          <Typography variant="body1" gutterBottom>
            {enrollValidationStatus ? (getRawFaceValidationStatus(enrollValidationStatus) || "Not Authenticated") : "Authenticated"}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Do we know you?
          </Typography>
          <Typography variant="body1" gutterBottom>
            {enrollGUID ? "Yes." : "No"}
          </Typography>

        </Alert>
      }
      {operation && operation === Constants.OPERATION_AUTHENTICATE &&
        <Alert severity="info" sx={{ width: "100%" }}>
          <Typography variant="body1" fontWeight="bold">
            Validation Status
          </Typography>
          <Typography variant="body1" gutterBottom>
            {predictValidationStatus ? (getRawFaceValidationStatus(predictValidationStatus) || "Not Authenticated") : "Authenticated"}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            Do we know you?
          </Typography>
          <Typography variant="body1" gutterBottom>
            {predictGUID ? "Yes." : "No"}
          </Typography>

        </Alert>
      }
    </Box>

  )
}
