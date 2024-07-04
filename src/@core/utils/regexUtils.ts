// Username regex: Allow letters, numbers, underscores, and hyphens. Length between 3 and 30 characters.
export const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/

// Password regex: At least one uppercase letter, one lowercase letter, one number, and one special character. Length between 8 and 32 characters.
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#\$%^&*()_+={}\[\]|\\:;"\",.?\/<>\-\s]{8,}$/

export const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const urlRegex =
  /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/
