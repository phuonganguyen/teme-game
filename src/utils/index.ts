export const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(value);
};
