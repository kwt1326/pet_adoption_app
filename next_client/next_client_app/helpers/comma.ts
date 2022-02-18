export function comma(price: string) {
  let str = price;
  if (Number.isNaN(str)) {
    return '-';
  }
  if (Number(str) === 0) {
    return '0';
  } if (str === null || str === undefined) {
    return '-';
  }
  str = String(str);
  if (str.length === 0) {
    return '-';
  }
  return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}