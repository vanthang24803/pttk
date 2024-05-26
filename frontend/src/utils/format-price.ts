export const price = (price: number) => {
  return price.toLocaleString("vi", { style: "currency", currency: "VND" });
};
