import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { default as theme } from "./assets/theme/theme.json";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./store/reducers/auth";
import orderReducer from "./store/reducers/orders";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import { Provider } from "react-redux";
import thunk from 'redux-thunk'
import { Platform } from "react-native";

if(Platform.OS === 'android') { // only android needs polyfill
  require('intl'); // import intl object
  require('intl/locale-data/jsonp/sv-SE'); // load swedish
}


const rootReducer = combineReducers({
  authReducer: authReducer,
  orderReducer: orderReducer,
  productsReducer: productsReducer,
  cartReducer: cartReducer

});

export type RootState = ReturnType<typeof rootReducer>;


const store = createStore(rootReducer, applyMiddleware(thunk))



export default function App() {
  const isLoadingComplete = useCachedResources();

  

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ApplicationProvider {...eva} theme={{ ...eva.dark, ...theme }}>
          <SafeAreaProvider>
            <Navigation  />
            <StatusBar />
          </SafeAreaProvider>
        </ApplicationProvider>
      </Provider>
    );
  }
}
