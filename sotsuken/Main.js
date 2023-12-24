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
  TextInput,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



const Main: () => Node = (props) => {

	const [text, setText] = useState('');	//2023.11.29 ito
	//const [msg, setMsg] = useState('');	//2023.12.1 ito
	//const [posts, setPosts] = useState([]);	//2023.12.1 ito

	const {height, width} = Dimensions.get('window'); 
	
	//チャットへログイン
	const sendData = () => {	//2023.11.29 ito
			//2023.11.29 ito

			//fetch("http://192.168.1.186:8080/J/post",
			fetch("http://192.168.11.113:8080/J/post/login",
			{
				method: 'POST' , 
				headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
				body: JSON.stringify( { name: text } )
			})
			.then((res) => {
				console.log("res:"+res);
				if (!res.ok) {
					throw new Error("fetchに失敗しました");
				}
				return res.json()
			})
			.then((data) => {
					console.log( "\n res-data=" + JSON.stringify( data, null, 2 ) );  
					//setMsg(data.msg);
					if( data.msg === "ログイン失敗" ){
						alert("ログイン失敗しました！");
					}else if( data.msg === "サーバー側でエラー発生" ) {
						alert("サーバー側でエラーが発生しました！");
					}else{
						const param = { p_name: data.msg, p_res: data.msg+"さん、こんにちわ！" };	//次のﾍﾟｰｼﾞへ渡す ｵﾌﾞｼﾞｪｸﾄを定義
						props.navigation.navigate( 'AddScreen', param );
					}

					console.log("clicked!");
			})
			.catch((error) => console.error("エラーです:", error));

	}

	//BBSへログイン
	const sendData2 = () => {	//2023.12.16 ito
		
			//fetch("http://192.168.1.186:8080/J/post",
			fetch("http://192.168.11.113:8080/J/post/login",
			{
				method: 'POST' , 
				headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
				body: JSON.stringify( { name: text } )
			})
			.then((res) => {
				console.log("res:"+res);
				if (!res.ok) {
					throw new Error("fetchに失敗しました");
				}
				return res.json()
			})
			.then((data) => {
				console.log( "\n res-data=" + JSON.stringify( data, null, 2 ) );  
				//setMsg(data.msg);
				if( data.msg === "ログイン失敗" ){
					alert("ログイン失敗しました！");
				}else if( data.msg === "サーバー側でエラー発生" ) {
					alert("サーバー側でエラーが発生しました！");
				}else{
					const param = { p_name: data.msg, p_res: data.msg+"さん、こんにちわ！" };	//次のﾍﾟｰｼﾞへ渡す ｵﾌﾞｼﾞｪｸﾄを定義
					props.navigation.navigate( 'AddScreen_2', param );
				}
				console.log("Button2 clicked!");
			})
			.catch((error) => console.error("エラーです:", error));

	}

    //  <Text style={styles.contentText}>受信メッセージ：</Text>
    //  <Text style={styles.contentText}>{msg}</Text>
    //  <Text style={styles.contentText}>{text}</Text>
      	  
  return (
    <View>
      <Text style={styles.title}>ICC チャットシステム</Text>
     
      <StatusBar style="auto" />
      <Text style={styles.contentText}>ユーザーIDを入力してください!!</Text>
      <TextInput style={ [styles.input,style={width: width-20, marginHorizontal:10} ] } onChangeText={(input_text) => setText(input_text)}/>
       
      <TouchableOpacity onPress={sendData}>
      <Text style={[styles.button,style={width: width-20, marginHorizontal:10} ] } > チャット ログイン </Text>
      </TouchableOpacity>
	
	       
      <TouchableOpacity onPress={sendData2}>
      <Text style={[styles.button,style={width: width-20, marginHorizontal:10} ] } > BBSログイン </Text>
      </TouchableOpacity>
		   
    </View>
  );
};
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
    fontSize: 18,
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
    textAlign:"center",
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

export default Main;
