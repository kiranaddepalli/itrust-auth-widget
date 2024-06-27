// Desc: Utility functions for crypto

import { SHA256, enc } from "crypto-js";

  export const calculateSHA256Hash = (obj) => {
    // Convert the JSON object to a string
    const jsonString = JSON.stringify(obj);
    // Create the hash    
    const hash = SHA256(jsonString).toString(enc.Hex);
    return hash

  }