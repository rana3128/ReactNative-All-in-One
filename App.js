import * as React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
const Drawer = createDrawerNavigator();
import Home from "./component/home";
import Training from "./component/training";
import Deit from "./component/deit";
import store from "./store";
import { Provider } from "react-redux";
import { checkDataBase } from "./utils/InitAppCheck";

function Root(props) {
  return (
    <Stack.Navigator initialRouteName={props.route.params.initPage}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle: {
            height: 80, // Specify the height of your custom header
          },
          headerLeft: () => (
            <Button
              onPress={() => props.navigation.openDrawer()}
              title="Menu"
              color="black"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Training"
        component={Training}
        options={{
          headerStyle: {
            height: 80, // Specify the height of your custom header
          },
          headerLeft: () => (
            <Button onPress={() => props.navigation.goBack()} title="Back" />
          ),
        }}
      />
      <Stack.Screen
        name="Deit"
        component={Deit}
        options={{
          headerStyle: {
            height: 80, // Specify the height of your custom header
          },
          headerLeft: () => (
            <Button onPress={() => props.navigation.goBack()} title="Back" />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

function App(props) {
  let [database, setDataBase] = React.useState(false);
  if(!database){
    checkDataBase()
    .then((dbcheck) => {
      if (dbcheck) {
        setDataBase(true);
      }
    })
    .catch((err) => console.log("some error ouccr : ", err));
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="root"
          drawerContentOptions={{
            itemStyle: { flex: 1 },
          }}
        >
          <Drawer.Screen
            name="root"
            component={Root}
            initialParams={{ initPage: "Home" }}
          />
          <Drawer.Screen
            name="Training"
            component={Root}
            initialParams={{ initPage: "Training" }}
          />
          <Drawer.Screen
            name="Deit"
            component={Root}
            initialParams={{ initPage: "Deit" }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
