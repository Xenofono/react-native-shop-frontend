import {
  Button,
  Card,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
import * as React from "react";
import { Alert, KeyboardAvoidingView, Modal, Platform, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

import { View } from "../components/Themed";
import { login, signup } from "../store/actions/auth";


const LoadingIndicator = (props: any) => <Spinner size="small" />;

export default function SignInScreen() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLogin, setIsLogin] = React.useState<boolean>(true);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const dispatch = useDispatch();

  const theme = useTheme();

  const authHandler = async () => {
    setIsLoading(true);
    try {
      const authFunction = isLogin ? login : signup;
      await dispatch(authFunction(username, password));
      if(authFunction === signup){
        Alert.alert(
            "Konto registrerat",
            `Användare ${username} registrerad, logga in med dina uppgifter!`,
            [{ text: "Yay!" }]
          );
          setIsLoading(false);
      }
      
    } catch (error) {
      Alert.alert("Fel vid inloggning", error.message, [{ text: "Ok" }]);
      setIsLoading(false);
    }
  };


  return (
    <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS == "ios" ? "padding" : null}>
      <Layout style={styles.container} level="1">
        <Text style={styles.title} category="h1" >
          Kris webshop
        </Text>
        <View
          style={styles.separator}
          lightColor={theme['color-primary-default']}
          darkColor="rgba(255,255,255,0.1)"
        />




        <Layout style={styles.inputs}>
          <Input
            placeholder="Användarnamn"
            value={username}
            onChangeText={(text) => setUsername(text)}></Input>
          <Input
            placeholder="Lösenord"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}></Input>
        </Layout>
        <Layout style={styles.buttonContainer}>
        <Button
          style={styles.button}
          appearance="outline"
          accessoryLeft={isLoading ? LoadingIndicator : null}
          onPress={authHandler}>
          {isLogin ? "Logga in" : "Registrera konto"}
        </Button>
        <Button
          style={styles.button}
          appearance="outline"
          onPress={() => setIsLogin((old) => !old)}>
          {isLogin? "Nytt konto" : "Har redan konto"}
        </Button>

        </Layout>
        
        
      </Layout>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container:{
    width:'100%',
    height:'100%',
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: "roboto",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  indicator: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer:{
      height: 100,
      justifyContent: "space-between",
      alignItems: "center",
      width:300
  },
  button: {
    width: "50%",
  },
  inputs: {
    width: "80%",
    height: 150,
  },
});
