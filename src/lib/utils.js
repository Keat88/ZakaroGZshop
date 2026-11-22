export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const formatPrice = (value) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(Number(value) || 0);
