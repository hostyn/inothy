export const getSellerAmount = (price: number): number => {
  return Math.trunc((0.7510326296 * price - 0.1672168905950096) * 100) / 100
}
