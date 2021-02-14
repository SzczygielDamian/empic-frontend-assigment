export const getUpdatedQuantity = (quantity: number, action: string) =>
  quantity + (action === "add" ? +1 : -1);