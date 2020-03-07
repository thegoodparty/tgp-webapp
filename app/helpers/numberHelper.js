export const percHelper = num => {
  if (!num) return num;
  if (typeof num !== 'number') {
    num = parseFloat(num);
  }
  return (num * 100).toFixed(2);
};
