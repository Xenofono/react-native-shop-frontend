import React, { useState } from "react";
import {
  Button,
  Card,
  Divider,
  Interaction,
  Layout,
  List,
  ListItem,
  StyleService,
  StyleType,
  Text,
  ThemeType,
  useStyleSheet,
  withStyles,
} from "@ui-kitten/components";
import {
  FlatList,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import OrderModel from "../models/OrderModel";
import CartItemModel from "../models/CartItemModel";

interface OrderInterface {
  orderData: OrderModel;
}

const Header: React.FC<{ orderData: OrderModel }> = ({ orderData }) => {
  const expedited = orderData.expedited;

  const expeditedText = `Skickad: ${
    expedited ? orderData.expeditedReadableDate() : "Ej skickad"
  }`;
  return (
    <View>
      <Text category="h6">Ordernummer: {orderData.id}</Text>
      <Text category="h6">Skapades: {orderData.readableDate()}</Text>
      <Text appearance={expedited ? "default" : "alternative"} category="h6">
        {expeditedText}
      </Text>
      <Text category="h6">Summa: {orderData.total} kr</Text>
    </View>
  );
};

const CartItem: React.FC<{ cartItem: CartItemModel }> = ({ cartItem }) => {
  const styles = useStyleSheet(themedStyle);
  return (
    <TouchableNativeFeedback>
      <View style={styles.item} >
        <Text category="h6">{cartItem.productName}</Text>
        <Text category="p1">Antal: {cartItem.quantity}</Text>
        <Text category="p1">Summa: {cartItem.sum} kr</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const Order: React.FC<OrderInterface> = ({ orderData }) => {
  const [showItems, setShowItems] = useState<boolean>(false);

  const styles = useStyleSheet(themedStyle);

  return (
    <Layout>
      <Card style={styles.card}>
        <Header orderData={orderData}></Header>

        <Button
          style={styles.button}
          onPress={() => setShowItems((old) => !old)} >
          {showItems ? "Göm produkter" : "Visa produkter"}
        </Button>
        <Layout style={styles.listContainer}>
          {showItems && (
            <List
              data={orderData.items}
              keyExtractor={(item) => item.productName}
              style={styles.list}
              renderItem={(itemData) => (
                <CartItem cartItem={itemData.item} />
              )}></List>
          )}
        </Layout>
      </Card>
    </Layout>
  );
};

const themedStyle = StyleService.create({
  card: {
    marginVertical: 15,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    elevation: 1,
    backgroundColor: "color-info-transparent-100",
    padding:5,
    borderWidth:1
  },
  button: {
    alignSelf: "center",
    marginVertical: 15,
  },
  listContainer: {
      
  },
  list:{
    backgroundColor: "color-info-transparent-100",
    borderWidth:1,
    borderColor: "black"
  },
  item: {
    backgroundColor: "color-info-transparent-100",
    padding: 10,
    elevation:1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Order;
