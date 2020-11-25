import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useTheme } from "@ui-kitten/components";
import { Button, Card, Layout, Spinner, Text } from "@ui-kitten/components/ui";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../App";
import CartItem from "../components/CartItem";

import { View } from "../components/Themed";
import CartItemModel from "../models/CartItemModel";
import { logout } from "../store/actions/auth";
import { fetchCart } from "../store/actions/cart";
import { sendOrder } from "../store/actions/orders";

const Cart = ({navigation}: StackScreenProps<{}>) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const cartItems: CartItemModel[] = useSelector(
    (state: RootState) => state.cartReducer.cart
  );
  const total: number = useSelector(
    (state: RootState) => state.cartReducer.total
	);
	const username: string = useSelector((state:RootState) => state.cartReducer.cartOwner)
	const dispatch = useDispatch();
	const theme = useTheme();

	console.log(username)
	
	
	const loadCart = useCallback(async()=> {
		setIsRefreshing(true)
		await dispatch(fetchCart());
		setIsRefreshing(false)

	}, [dispatch])


	React.useLayoutEffect(() => {
    navigation.setOptions({
			headerTitle: "Kundvagn för " + username,
			headerRight: () => (
				<Ionicons
					name="md-checkbox-outline"
					size={30}
					color={theme["color-primary-default"]}
					onPress={() => {
						if(cartItems?.length !== 0){
							Alert.alert(
								"Vill du beställa?",
								"Klicka ok för att bekräfta order",
								[
									{ text: "Köp!", onPress: async () => {
										await dispatch(sendOrder())
										navigation.navigate("OrdersScreen")
									} },
									{ text: "Avbryt" },
								]
							);
						}
						
					}}
					style={{ marginRight: 20 }}></Ionicons>
			),
			headerStyle: { backgroundColor: theme["color-basic-700"] },
			headerTintColor: theme["color-primary-default"]	 
			
		});
  }, [navigation, username, cartItems]);

	useFocusEffect(useCallback(() => {
		loadCart();
	}, [dispatch] ))

  useEffect(() => {
		setIsLoading(true)
    loadCart().then(() => setIsLoading(false))
	}, [loadCart]);
	
	if(isLoading){
		return <Layout style={styles.container}>
			<Spinner/>
		</Layout>
	}


  return (
    <Layout style={styles.container}>
			
      <Text category="h4" style={styles.username}>
        Total summa: {total.toFixed(2)} kr
      </Text>
      <FlatList
			onRefresh={loadCart}
			refreshing={isRefreshing}
        style={styles.list}
        data={cartItems}
        keyExtractor={(item) => item.productName}
        renderItem={(itemData) => <CartItem cartItem={itemData.item} />}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  username: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  list: {
    height: "30%",
    width: "80%",
  },
});

export default Cart
