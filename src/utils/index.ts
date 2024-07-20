export const formatNumber = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(value);
};

export const formatNumberCompact = (value: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  });
  return formatter.format(value);
};
