function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export const numberFormat = (value, dp) => {
  return value
    ? new Intl.NumberFormat({
        style: "decimal",
      }).format(round(value, dp))
    : value;
};