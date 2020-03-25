export const percHelper = (num, significant = false) => {
  if (!num) return num;
  if (typeof num !== 'number') {
    num = parseFloat(num);
  }
  if (significant) {
    return toPrecision(num * 100);
  }
  return (num * 100).toFixed(2);
};

export const numberNth = number => {
  if (!number) {
    return '';
  }
  let num = number;
  if (typeof number === 'string') {
    num = parseInt(number, 10);
  }
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return `${num}st`;
  }
  if (j === 2 && k !== 12) {
    return `${num}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${num}rd`;
  }
  return `${num}th`;
};

export const numberFormatter = num => {
  if (!num) return num;
  if (typeof num !== 'number') {
    num = parseFloat(num);
  }
  return `${num
    .toFixed(0)
    .replace(/./g, (c, i, a) =>
      i && c !== '.' && (a.length - i) % 3 === 0 ? `,${c}` : c,
    )}`;
};

export const toPrecision = num => {
  if (!num) {
    return num;
  }
  return parseFloat(num.toPrecision(2));
};
