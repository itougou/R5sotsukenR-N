/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/* 2023.11.29 ito import React from 'react'; */
import React, { useState } from 'react';	//2023.11.29 ito
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


//const [text, setText] = useState('')
	
export default function App() {
   const [text, setText] = useState('');	//2023.11.29 ito
   const [msg, setMsg] = useState('');	//2023.12.1 ito
   const [posts, setPosts] = useState([]);	//2023.12.1 ito
   
   const sendData = () => {	//2023.11.29 ito
   	   /*
   	   console.log("sendData() clicked!!");
   		//props.addEet(text)
   		//setText('')
   		fetch('http://192.168.1.192/json', {
		    method: 'GET'
		    //Request Type 
		})
		.then((response) => response.json())
		//If response is in json then in success
		.then((responseJson) => {
		    //Success 
		    console.log("SUCCESS ?:"+responseJson);
		})
		//If response is not in json then in error
		.catch((error) => {
		    //Error 
		    console.error("ERR_2:"+error);
		});
		*/

		/* localhostだと Network request failed　エラーになる　
		fetch("http://localhost/reactTest/resvApp.php?cpu=I3&memory=8G")*/
		/* Webアプリ側ではJSONデータのみをレスポンスされること */
		//GET 成功 
		/*
			fetch("http://192.168.1.192:8080/J/get?name="+text )
		*/

		fetch("http://192.168.11.113:8080/J/post",
		 {  method: 'POST' , 
		    headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
			body: JSON.stringify( { name: text } )
		 }
		 )
		  .then((res) => {
		   console.log("res:"+res);
		   if (!res.ok) {
		     throw new Error("fetchに失敗しました");
		   }
		   return res.json()
		  })

		  .then((data) => { console.log("\nres-data=" + JSON.stringify( data, null, 2) );  setMsg(data.msg); } )
		  .catch((error) => console.error("エラーです:", error));
		   console.log("clicked!");

  }
   return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Text style={styles.title}>何か入力してください!!</Text>
      <TextInput style={styles.input} onChangeText={(_text) => setText(_text)}/>
       
      <TouchableOpacity onPress={sendData}>
      <Text style={styles.button}> 送 信 </Text>
      </TouchableOpacity>
		   
      <Text style={styles.contentText}>{text}</Text>
      <Text style={styles.contentText}>受信メッセージ：</Text>
      <Text style={styles.contentText}>{msg}</Text>
    </View>
  );
}
	
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
   title: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    fontSize: 24,
    fontWeight: '600',
  },
   button: {
    backgroundColor: '#00f',
    color: 'white',
    margin: 5,
    paddingVertical:10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center', 
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    /*flex: 1,*/
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 16,
  },
  contentText: {
    fontSize: 16,
    paddingVertical: 10,
  }
});
