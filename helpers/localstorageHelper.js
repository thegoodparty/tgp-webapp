let canUseLocalStorage = true;
if (typeof Storage === 'undefined') {
  canUseLocalStorage = false;
}

export const getItem = (key, withParse = true) => {
  if (!canUseLocalStorage) {
    return;
  }
  const item = window.localStorage.getItem(key);
  if (!item) {
    return false;
  }
  if (withParse) {
    return JSON.parse(item);
  }
  return item;
};

export const setItem = (key, value) => {
  if (!canUseLocalStorage) {
    return;
  }
  let item = value;
  if (typeof item !== 'string') {
    item = JSON.stringify(item);
  }
  window.localStorage.setItem(key, item);
};

export const removeItem = (key) => {
  if (!canUseLocalStorage) {
    return;
  }

  window.localStorage.removeItem(key);
};

export const clearAll = () => {
  if (!canUseLocalStorage) {
    return;
  }
  window.localStorage.clear();
};

export const setApplicationStorage = (value) => {
  setItem('application', value);
};

export const getApplicationStorage = () => getItem('application');

export const deleteApplicationStorage = () => removeItem('application');
