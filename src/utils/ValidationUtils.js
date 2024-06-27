// Validation utils
export const validateContact = (contact, errors, checkAddress, checkEmail, checkPhone) => {
    let addressValid = checkAddress ? validateAddress (contact?.address, errors): true
    let emailValid = checkEmail ? validateEmail (contact?.email, errors) : true
    let phoneValid = checkPhone ? validatePhone (contact?.phone, errors): true 
    return (addressValid && emailValid && phoneValid)? true: false
  }
  
  export const validateAddress = (address, errors) => {
      let isValid = true;
      // Validate firstName field
      if (address.addressLine1.trim() === "") {
          errors.name = "Street or road is required";
          isValid = false;
      } else {
          errors.addressLine1 = "";
      }
  
      if (address.country.trim() === "") {
          errors.country = "Country is required";
          isValid = false;
      } else {
          errors.country = "";
      }
      if (address.city.trim() === "") {
          errors.city = "City is required";
          isValid = false;
      } else {
          errors.city = "";
      }
      if (address.state.trim() === "") {
          errors.state = "State is required";
          isValid = false;
      } else {
          errors.state = "";
      }
      if (address.zipcode.trim() === "") {
          errors.zipcode = "Zipcode is required";
          isValid = false;
      } else {
          errors.zipcode = "";
      }
  
      return isValid;
  };
  
  export const validateEmail = (email, errors) => {
      let isValid = true;
      if (email.trim() === "") {
          errors.email = "Email is required";
          isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
          errors.email = "Invalid email format";
          isValid = false;
      } else {
          errors.email = "";
      }
  
      return isValid;
  };
  
  export const validatePhone = (phone, errors) => {
    let isValid = true;
    if (phone.trim() === "") {
        errors.phone = "Phone is required";
        isValid = false;
    } else {
        errors.phone = "";
    }
  
    return isValid;
  };
  
  
  