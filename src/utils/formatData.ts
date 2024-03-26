const formatIdr = (number: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(number);
};

const formatNumber = (number: number) => {
  return number.toLocaleString("id-ID");
};

export { formatIdr, formatNumber };
