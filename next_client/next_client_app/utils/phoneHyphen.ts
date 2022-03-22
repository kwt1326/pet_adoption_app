export function phoneHyphen(value: string) {
  if (value.length === 11) {
    return value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (value.length === 12) {
    return value.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3');
  } else if (value.length === 9) {
    return value.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
  } else if (value.length === 10) {
    return value.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  } else if (value.length === 8) {
    return value.replace(/(\d{4})(\d{4})/, '$1-$2');
  }
  return value;
}