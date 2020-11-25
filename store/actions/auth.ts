import { AppThunk } from "./AppThunk";

export type AuthAction = { type: "LOGIN"; payload: { token: string } } | {type:"LOGOUT"};

export const login = (username: string, password: string): AppThunk => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch("http://192.168.50.112:8080/shop/login", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Kunde inte logga in");
      }

      const resData = await response.text();
      dispatch({ type: "LOGIN", payload: { token: resData } });
    } catch (error) {
      throw error;
    }

  };
};

export const signup = (username: string, password: string): AppThunk => {
    return async (dispatch, getState) => {
      try {
        const response = await fetch("http://192.168.50.112:8080/shop/signup", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error("Kunde inte registrera");
        }
      } catch (error) {
        throw error;
      }
    };
  };


  export const logout = (): AuthAction => ({
    type:"LOGOUT"
  })
