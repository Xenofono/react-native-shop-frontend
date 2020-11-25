import CartItemModel from "../../models/CartItemModel";
import { AuthAction } from "../actions/auth";
import {CartActions} from "../actions/cart";

interface CartStateInterface {
	cart: CartItemModel[];
	cartOwner: string;
	total: number
}

const initialState = {cart: [], cartOwner: "", total:0}

export default (
  state: CartStateInterface = initialState,
  action: CartActions | AuthAction
) => {
  switch (action.type) {
		case "FETCH_CART":
			const rawData = action.payload
			const total = rawData.cart.total
			const cartOwner = rawData.username
			const cartItems : CartItemModel[] = rawData.cart.cartItems.map(rawItem => {
				const cartItem =  new CartItemModel(rawItem.product.name, rawItem.quantity, rawItem.sum, rawItem.product.id)
				return cartItem 
			})
			return {...state, cart:cartItems, total, cartOwner}
			case "LOGOUT":
				return initialState
		default:
			return state
  }
};



