import { useFocusEffect } from "@react-navigation/native";
import { Header } from "@react-navigation/stack";
import { Button, Card, Layout, Spinner, Text } from "@ui-kitten/components/ui";
import * as React from "react";
import { useCallback, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import Order from "../components/Order";

import OrderModel from "../models/OrderModel";
import { logout } from "../store/actions/auth";
import { fetchOrders } from "../store/actions/orders";

export default function Orders() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.orderReducer.orders);

  const loadOrders = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await dispatch(fetchOrders());
    } catch (error) {
      console.log(error.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

  useFocusEffect(useCallback(() => {
    console.log("HEJ")
		loadOrders();
	}, [dispatch,] ))

  useEffect(() => {
    console.log("HEJ")

    setIsLoading(true);
    loadOrders().then(() => setIsLoading(false));
  }, [dispatch, loadOrders]);

  if(orders.length === 0 ){
    return <Layout style={styles.container}>
      <Text category="p1">Du har inte köpt nått än.. så då finns inga ordrar</Text>
    </Layout>
  }


  return (
    <Layout style={styles.container}>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          onRefresh={loadOrders}
          refreshing={isRefreshing}
          keyExtractor={itemData => itemData.id.toString()}
          data={orders}
          renderItem={(itemData) => <Order orderData={itemData.item} />}
        />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
