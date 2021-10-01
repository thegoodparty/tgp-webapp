const isNumericInput = event => {
  const key = event.keyCode;
  return (
    (key >= 48 && key <= 57) || // Allow number line
    (key >= 96 && key <= 105) // Allow number pad
  );
};

const isModifierKey = event => {
  const key = event.keyCode;
  return (
    event.shiftKey === true ||
    key === 35 ||
    key === 36 || // Allow Shift, Home, End
    (key === 8 || key === 9 || key === 13 || key === 46) || // Allow Backspace, Tab, Enter, Delete
    (key > 36 && key < 41) || // Allow left, up, right, down
    // Allow Ctrl/Command + A,C,V,X,Z
    ((event.ctrlKey === true || event.metaKey === true) &&
      (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
  );
};

export const enforceFormat = event => {
  // Input must be of a valid number format or a modifier key, and not longer than ten digits
  if (!isNumericInput(event) && !isModifierKey(event)) {
    event.preventDefault();
  }
};

export const formatToPhone = value => {
  if (!value) {
    return '';
  }
  const input = value.replace(/\D/g, '').substring(0, 10); // First ten digits of input only
  const zip = input.substring(0, 3);
  const middle = input.substring(3, 6);
  const last = input.substring(6, 10);

  if (input.length > 6) {
    return `+1 (${zip}) ${middle}-${last}`;
  }
  if (input.length > 3) {
    return `+1 (${zip}) ${middle}`;
  }
  if (input.length > 0) {
    return `+1 (${zip}`;
  }
};

export const cleanPhone = phone => {
  if (!phone) {
    return phone;
  }
  if (phone && phone.indexOf('+1') === 0) {
    phone = phone.substring(2);
  } else if (phone && phone.indexOf('1') === 0) {
    phone = phone.substring(1);
  }
  return phone;
};

export const validatePhone = phone => {
  const expression = /^([0-9]{3})\-([0-9]{3})\-([0-9]{4})$/;

  return expression.test(phone);
};
