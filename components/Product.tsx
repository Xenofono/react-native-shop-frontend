import { Button, Card, Input, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableNativeFeedback, View } from "react-native";
import { useDispatch } from "react-redux";
import ProductModel from "../models/ProductModel";
import { addToCart } from "../store/actions/products";

const Product: React.FC<{ productData: ProductModel }> = ({ productData }) => {
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<string>("1");


    const dispatch = useDispatch();
    const buyHandler = () => {
        dispatch(addToCart(productData.id, +quantity))
    }

  return (
    <TouchableNativeFeedback onPress={() => setShowDescription((old) => !old)}>
      <View style={styles.container}>
        <Image
          source={{ uri: productData.imageUrl }}
          style={styles.img}></Image>
        <Text category="h6" style={styles.name}>
          Namn: {productData.name}
        </Text>
        <Text category="h6" style={styles.name}>
          Pris: {productData.price} kr
        </Text>

        {showDescription && (
          <>
            <Text category="p1" style={styles.description}>
              {productData.description}
            </Text>
            <View style={styles.buyContainer}>
              <Input placeholder="Antal" keyboardType="number-pad" value={quantity} onChangeText={text => setQuantity(text)}></Input>
              <Button onPress={buyHandler} >Köp</Button>
            </View>
          </>
        )}
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    elevation: 5,
    marginVertical: 15,
    backgroundColor: "#ccc",
    paddingBottom: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  img: {
    height: 200,
    width: "100%",
  },
  name: {
    color: "black",
    fontFamily: "roboto-bold",
    paddingHorizontal: 5,
  },
  description: {
    color: "black",
    fontFamily: "roboto",
    paddingHorizontal: 5,
  },
  buyContainer: {
      flexDirection: "row",
      justifyContent:'space-evenly',
      alignItems:'center',
      paddingTop:10
  }
});

export default Product;
