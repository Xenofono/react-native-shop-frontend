import { AppThunk } from "./AppThunk";

export interface OrderResponse {
  orders: {
    created: Date;
    expedited: Date | null;
    id: number;
    items: {[key: string]:string};
    total: number;
  }[];
}

export type OrdersAction = {
  type: "GET_ORDERS";
  payload: OrderResponse
} | {type: 'SEND_ORDER'};

export const fetchOrders = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.token;
    const response = await fetch("http://192.168.50.112:8080/shop/order", {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    const data = await response.json();
    const toDispatch: OrdersAction = { type: "GET_ORDERS", payload: data };
    dispatch(toDispatch);
  };
};


export const sendOrder = (): AppThunk => {
  return async (dispatch, getState) => {
    const token = getState().authReducer.token;

    try{
      const response = await fetch("http://192.168.50.112:8080/shop/order", {
        headers: {
          authorization: "Bearer " + token,
        },
        method: "POST",
      });
      if(!response.ok){
        throw new Error("Kunde inte slutföra beställning")
      }
      const toDispatch: OrdersAction = { type: "SEND_ORDER" };
      dispatch(toDispatch);
    } catch(error){
      throw error
    }
    
  };
};


