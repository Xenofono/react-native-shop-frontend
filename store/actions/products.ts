import { Alert } from "react-native";
import ProductModel from "../../models/ProductModel";
import { AppThunk } from "./AppThunk";

export type ProductsActions =
  | {
      type: "FETCH_PRODUCTS";
      payload: {
        id: number;
        imageUrl: string;
        name: string;
        description: string;
        price: number;
      }[];
    }
  | { type: "ADD_TO_CART"; payload: { id: number; quantity: number } };

export const fetchProducts = (): AppThunk => {
  return (dispatch, getState) => {
    const token = getState().authReducer.token;
    fetch("http://192.168.50.112:8080/shop", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Du är inte tillåten på den här resursen");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "FETCH_PRODUCTS", payload: data });
      })
      .catch((error) => {
        Alert.alert(error.message, "Du loggas ut nu", [{text:"Ok :("}])
        dispatch({ type: "LOGOUT"})

      });
  };
};

export const fetchProductsByName = (name: string): AppThunk => {
  return (dispatch, getState) => {
    const token = getState().authReducer.token;
    fetch("http://192.168.50.112:8080/shop/filter", {
      headers: {
        authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ name }),
    })
      .then((response) => {
        console.log(response.ok);
        if (!response.ok) {
          throw new Error("Du är inte tillåten på den här resursen");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        dispatch({ type: "FETCH_PRODUCTS", payload: data });
      })
      .catch((error) => {
        dispatch({ type: "LOGOUT" });
      });
  };
};

export const addToCart = (id: number, quantity: number): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.token;

    try {
      const response = await fetch("http://192.168.50.112:8080/shop/cart", {
        headers: {
          authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ id, quantity }),
      });
      const data = await response.text();
      console.log(data);
      dispatch({ type: "ADD_TO_CART", payload: { id, quantity } });
    } catch (error) {
      console.log(error);
    }
  };
};
