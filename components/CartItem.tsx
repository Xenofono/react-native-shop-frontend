import { Ionicons } from "@expo/vector-icons";
import {
  Layout,
  Text,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import CartItemModel from "../models/CartItemModel";
import { deleteFromCart, fetchCart } from "../store/actions/cart";
import { addToCart, fetchProducts } from "../store/actions/products";

const CartItem: React.FC<{ cartItem: CartItemModel }> = ({ cartItem }) => {


  const [inputQuantity, setInputQuantity] = useState<number>(0);
  const [changed, setChanged] = useState<boolean>(false);


  useEffect(() => {
    if(cartItem.quantity !== inputQuantity){
        setInputQuantity(cartItem.quantity)
    }
  }, [cartItem])

  const styles = useStyleSheet(themedStyle);

  const dispatch = useDispatch();

  const handleNewQuantity = (text: string) => {
    setChanged(true);
    setInputQuantity(+text);
  };

  const updateQuantity = async () => {
    await dispatch(addToCart(cartItem.productId, inputQuantity));
    await dispatch(fetchCart());
    setChanged(false);
  };

  const deleteItem = async () => {
    await dispatch(deleteFromCart(cartItem.productId))
    await dispatch(fetchCart());
  };

  return (
    <Layout style={styles.cartItem}>
      <Input
        value={inputQuantity.toString()}
        onChangeText={handleNewQuantity}
        keyboardType="number-pad"
      />
      {changed && (
        <Ionicons
          name="md-refresh"
          style={styles.refresh}
          onPress={updateQuantity}></Ionicons>
      )}
      <Text category="p1">{cartItem.productName} </Text>
      <Text category="p1">{cartItem.sum.toFixed(2)} kr </Text>
      <Ionicons
        name="md-trash"
        style={styles.trash}
        onPress={deleteItem}></Ionicons>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  cartItem: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "color-info-transparent-200",
    borderWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  refresh: {
    color: "color-success-700",
    fontSize: 30,
  },
  trash: {
    color: "color-danger-700",
    fontSize: 30,
  },
});

export default CartItem;
