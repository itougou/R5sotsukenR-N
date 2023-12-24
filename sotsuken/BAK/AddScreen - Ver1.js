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
  Button,
} from 'react-native';

const AddScreen: () => Node = (props) => {

	//2023.12.7
	const namae = props.route.params.p_name;	//前のページからのパラメータ取り出し
	console.dir(props);
	console.log("JSON.stringify props:"+JSON.stringify(props));
	console.log("props.route.params.data:"+props.route.params.data);
	
	Object.keys(props).forEach(function (key) {
	  console.log("結合stringify:" + JSON.stringify(props[key]));
	});
	
	
  return (
    <View>
      <Text>AddScreen</Text>
    <Text>名前：{namae}</Text>
    </View>
  );
};
export default AddScreen;
