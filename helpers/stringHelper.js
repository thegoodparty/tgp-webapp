export const upperFirst = str => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const trimObject = obj => {
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] === 'string') {
      obj[key] = obj[key].trim();
    }
  });
};
export const makeStringId = length => {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}