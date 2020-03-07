export default (num) => {
  if (!num) return num;
  if(typeof num !== 'number'){
    num = parseFloat(num);
  }
  return `$${num.toFixed(0).replace(/./g, (c, i, a) => i && c !== '.' && ((a.length - i) % 3 === 0) ? `,${c}` : c)}`;
};
