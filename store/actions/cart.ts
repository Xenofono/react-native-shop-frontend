import CartItemModel from "../../models/CartItemModel";
import ProductModel from "../../models/ProductModel";
import { AppThunk } from "./AppThunk";

interface UserCartResponse {
  cart: {
    id: number;
    cartItems: {
      id: number;
      product: ProductModel;
      quantity: number;
      sum: number;
    }[];
    total: number;
  };
  username: string;
}

export type CartActions = { type: "FETCH_CART"; payload: UserCartResponse };

export const fetchCart = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.token;

    try {
      const response = await fetch("http://192.168.50.112:8080/shop/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        throw new Error("Kunde inte hämta kundvagn");
      }
      const data = await response.json();
      const action: CartActions = { type: "FETCH_CART", payload: data };
      dispatch(action);
    } catch (error) {
      throw error;
    }
  };
};



//localhost:8080/shop/cart/1

export const deleteFromCart = (id:number): AppThunk => {
    return async (dispatch, getState) => {
      const token = getState().authReducer.token;
      try {
        const response = await fetch("http://192.168.50.112:8080/shop/cart/"+id, {
          headers: {
            Authorization: "Bearer " + token,
          },
          method: "DELETE",
        });
  
        if (!response.ok) {
          throw new Error("Kunde inte ta bort från kundvagnen");
        }
      } catch (error) {
        throw error;
      }
    };
  };
