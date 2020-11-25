import { Button, Input, Layout, Spinner, Text } from "@ui-kitten/components/ui";
import * as React from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { StackScreenProps } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { fetchProducts, fetchProductsByName } from "../store/actions/products";
import { RootState } from "../App";
import Product from "../components/Product";
import ProductModel from "../models/ProductModel";
import { useCallback, useEffect, useState } from "react";

const Products = ({ navigation }: StackScreenProps<{}>) => {
  const [searchText, setSearchText] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const products: ProductModel[] = useSelector(
    (state: RootState) => state.productsReducer.products
  );

  const dispatch = useDispatch();

  const fetchAll = useCallback(async () => {
    setIsRefreshing(true);
    setSearchText("")
    try {
      await dispatch(fetchProducts());
    } catch (error) {
      console.log("HEJ ERROR")
      
    }
    setIsRefreshing(false);
    
  }, [dispatch, setIsLoading])

  useEffect(() => {
    setIsLoading(true)
    fetchAll().then(() => setIsLoading(false))
  }, [dispatch]);

  const searchHandler = () => {
    dispatch(fetchProductsByName(searchText));
  };

  if(isLoading){
    return (
      <Layout style={styles.container}>
        <Spinner/>
      </Layout>
    );
  }

 

  return (
    <Layout style={styles.container}>
      <Layout style={styles.searchContainer}>
        <Input
          style={styles.searchInput}
          placeholder="Sök produkt"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}></Input>
        <Button onPress={searchHandler} appearance="outline">Sök</Button>
        <Button onPress={() => {
          setSearchText("");
          dispatch(fetchProducts());
        }} appearance="outline">Se alla</Button>
      </Layout>
      {products.length !== 0 ? <FlatList
        onRefresh={fetchAll}
        refreshing={isRefreshing}
        contentContainerStyle={styles.list}
        keyExtractor={(itemData) => itemData.id.toString()}
        data={products}
        renderItem={(itemData) => <Product productData={itemData.item} />}
      /> : <Text>Inga produkter matchar sökkriterierna  </Text>}
      
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    margin: 10,
  },
  searchInput: {
    width: "45%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  list: {
    marginBottom: 30,
    width: "100%",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default Products;
