import CartItemModel from "../../models/CartItemModel";
import OrderModel from "../../models/OrderModel";
import { OrdersAction } from "../actions/orders";

interface OrdersInterface {
  orders: OrderModel[];
}

export default (
  state: OrdersInterface = { orders: [] },
  action: OrdersAction
) => {
  switch (action.type) {
    case "GET_ORDERS":
      const orders = action.payload.orders.map((rawOrder) => {
        const items: CartItemModel[] = Object.keys(rawOrder.items).map(
          (key) => {
            const newItem: CartItemModel = JSON.parse(rawOrder.items[key]);
            return new CartItemModel(
              newItem.productName,
              newItem.quantity,
              newItem.sum
            );
          }
        );
        const expedited = rawOrder.expedited
          ? new Date(rawOrder.expedited)
          : undefined;
        return new OrderModel(
          rawOrder.id,
          new Date(rawOrder.created),
          items,
          rawOrder.total,
          expedited
        );
      });
      return {
        ...state,
        orders,
      };
      case "SEND_ORDER":
        return {...state}
    default:
      return state;
  }
};

// private id: number;
// private name: string;
// private description: string;
// private price: number;
// private imageUrl: string;
