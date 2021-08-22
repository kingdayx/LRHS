import React, { Component } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Button,
  TextInput,
  StatusBar,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as firebase from "firebase";
import { createStackNavigator } from "@react-navigation/stack";

import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      value: "",
    };
  }

  componentDidMount() {
    console.log("start again");
    const that = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        firebase
          .database()
          .ref("client/")
          .on("value", (snapshot) => {
            if (snapshot.val() != null) {
              Object.keys(snapshot.val()).map((val) => {
                firebase
                  .database()
                  .ref("client/" + val + "/client/")
                  .on("value", function (snapshot) {
                    if (snapshot.val()) {
                      if (snapshot.val()) {
                        if (snapshot.val().useruid === user.uid) {
                          that.setState({
                            value: "first",
                          });
                          return;
                        }
                      }
                    }
                  });
              });
            }
          });
        firebase
          .database()
          .ref("agent/")
          .on("value", (snapshot) => {
            if (snapshot.val() != null) {
              Object.keys(snapshot.val()).map((val) => {
                firebase
                  .database()
                  .ref("agent/" + val + "/agent/")
                  .on("value", function (snapshot) {
                    if (snapshot.val().useruid === user.uid) {
                      that.setState({
                        value: "second",
                      });
                      return;
                    }
                  });
              });
            }
          });
        that.setState({
          authenticated: true,
        });
      } else {
        console.log("notlogin");
        that.setState({
          authenticated: false,
        });
      }
    });
  }

  render() {
    const Stack = createStackNavigator();
    const ReferStackScreen2 = ({ navigation }) => (
      <ReferStack.Navigator>
        <ReferStack.Screen
          name="Refer A Friend"
          component={Refer2}
          options={{
            headerStyle: {
              backgroundColor: "black",
            },
            headerTintColor: "white",
            headerLeft: () => (
              <DrawerButton onPress={() => navigation.toggleDrawer()} />
            ),
          }}
        />
      </ReferStack.Navigator>
    );
    const SearchStackScreen2 = ({ navigation }) => (
      <Stack.Navigator>
        <Stack.Screen
          name="Sign Up"
          component={Search2}
          // options={{
          //   headerStyle: {
          //     backgroundColor: 'black',
          //   },
          //   headerTintColor: 'white',
          //   headerLeft: () => (
          //     <DrawerButton onPress={() => navigation.toggleDrawer()} />
          //   ),
          // }}
        />
      </Stack.Navigator>
    );
    return (
      <div>
        <div></div>
      </div>
    );
  }
}

export default Nav;
