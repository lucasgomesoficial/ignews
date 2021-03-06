export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-PT", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};
