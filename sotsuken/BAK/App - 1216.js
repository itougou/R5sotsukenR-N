import 'react-native-gesture-handler';    //追記
import React,{ useState,useEffect,useRef,Component,useContext } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';    //追記
import { createStackNavigator } from '@react-navigation/stack';    //追記
import Main from './Main';    //追記
import AddScreen from './AddScreen';    //追記

const Stack = createStackNavigator();    //追記


const App: () => Node = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          component={Main}
        />
        <Stack.Screen
          name="AddScreen"
          component={AddScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
