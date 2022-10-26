export default function normalize(str) {
  const string = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return string.toLowerCase();
}

export const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
