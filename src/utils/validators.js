export const validatePhone = (phone) => {
  let formattedPhone = phone.replace(/\D/g, "");

  if (formattedPhone.length === 0) {
    formattedPhone = "8";
  } else if (formattedPhone[0] !== "8") {
    formattedPhone = "8" + formattedPhone;
  }

  if (formattedPhone.length > 11) {
    return formattedPhone.substring(0, 11);
  }
  
  return formattedPhone;
};

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};