export function getAllOrders() {
  return Orders;
}

export function saveOrder(order) {
  Orders.push(order);
}
