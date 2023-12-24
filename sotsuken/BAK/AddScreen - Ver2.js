import React,{ useState,useEffect,useRef,Component,useContext } from 'react';
import type {Node} from 'react';
import SockJS from "sockjs-client";	//2023.12.8
import Stomp from "webstomp-client";	//2023.12.8
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';

//2023.12.7
let stompClient=null;

const AddScreen: () => Node = (props) => {
	
	let totalMessages = "";
	
	//接続処理
	function connect() {
	    console.log("★connect()");
	    
	    
	    var socket = new SockJS('http://192.168.11.113:8080/gs-guide-websocket');
	    //var socket = new SockJS('http://192.168.1.186:8080/gs-guide-websocket');
	    stompClient = Stomp.over(socket);
	    /*
	    var options = {debug: false, protocols: Stomp.VERSIONS.supportedProtocols()};
	    stompClient = Stomp.over(socket, options);
	    */
	    stompClient.connect({}, function (frame) {
	        setConnected(true);
	    	stompClient.send("/app/hello", JSON.stringify( { name: "ICCﾁｬｯﾄｼｽﾃﾑ", message: namae+"さんが、入室しました！！！" } ) );	//ｻｰﾊﾞへﾒｯｾｰｼﾞ送信
	        console.log('★Connected: ' + frame);
	        stompClient.subscribe('/topic/greetings', function ( greeting ) { //サーバーからの受信窓口登録
	            showGreeting( JSON.parse( greeting.body ).content );	//受信ﾒｯｾｰｼﾞ表示
	    		console.log( "★/topic/greeting msg="+msg );
	        });
	    });
	}
	
	//送信処理
	const sendMessage = () => {
	    console.log("★sendMessage()");
	    
	    if(stompClient!=null){
	    	//stompClient.send("/app/hello", JSON.stringify( { name: "gogogo", message: "konnwannmi" } ) );
	    	stompClient.send("/app/hello", JSON.stringify( { name: namae, message: text } ) );	//ｻｰﾊﾞへﾒｯｾｰｼﾞ送信
	    	console.log( "★sendMessage() msg="+msg );
	   		setText( "" );	//変数text消去＝ﾃｷｽﾄﾎﾞｯｸｽ文字列消去

		}
		
	}

	//受信メッセージ表示処理
	function showGreeting( message ) {
		if(totalMessages===""){
			totalMessages = message;
		}else{
			totalMessages = totalMessages +'\n'+ message;
		}
	    console.log( "★showGreeting()"+message );
	    console.log( "★showGreeting() totaLmessages="+totalMessages );
	    setMsg( totalMessages  );	//受信メッセージ→変数msgへ書き込み
	}

	//切断処理
	function disconnect() {
	    if (stompClient !== null) {
    		console.log("★disconnect()");
	    	stompClient.send("/app/hello", JSON.stringify( { name: "ICCﾁｬｯﾄｼｽﾃﾑ", message: namae+"さんが、退出しました！！！" } ) );	//ｻｰﾊﾞへﾒｯｾｰｼﾞ送信
	        stompClient.disconnect();
	    }
	    setConnected(false);
	    
	}                                   
	
	//接続状態／切断状態 表示切り替え処理
	function setConnected( connected ) {
    	console.log("★setConnected()");
    	if( connected ){
		    
		    setConDisable(true);	//接続ボタン使用不可に
		    setSendDisable(false);	//送信ボタン使用可に
		    setDisconDisable(false);	//切断ボタン使用可に
		    setCmdMsg('メッセージを入力してください！');
	    }else{
		    setConDisable(false);	//接続ボタン使用可に
		    setSendDisable(true);	//送信ボタン使用不可に
		    setDisconDisable(true);	//切断ボタン使用不可に
		    setCmdMsg('接続してください！');
		    
		    console.log( "diconnected msg:"+msg );
	    }
	    totalMessages = "";
	    setMsg( "" );	//変数msg消去＝受信ﾒｯｾｰｼﾞ文字列消去
	    setText( "" );	//変数text消去＝ﾃｷｽﾄﾎﾞｯｸｽ文字列消去
	}
	
	const [text, setText] = useState('');	//2023.11.29 ito テキストボックスの文字列
	const [msg, setMsg] = useState('');	//2023.12.1 ito受信メッセージの文字列
	const [sendDisable, setSendDisable] = useState(true);	//2023.12.9 送信ボタン使用可／不可
	const [conDisable,setConDisable] = useState(false);	//2023.12.9 接続ボタン使用可／不可
	const [disconDisable, setDisconDisable] = useState(true);	//2023.12.9 切断ボタン使用可／不可
	const [cmdMsg, setCmdMsg] = useState('接続してください');	//2023.12.9 指示メッセージ
	const {height, width} = Dimensions.get('window'); 
	//2023.12.7
	const namae = props.route.params.p_name;	//前のページからのパラメータ取り出し
	const res = props.route.params.p_res;	//前のページからのパラメータ取り出し
	//onamae = namae;
	console.dir(props);
	//console.log("JSON.stringify props:"+JSON.stringify(props));
	//console.log("props.route.params.data:"+props.route.params.data);
	
	//Object.keys(props).forEach(function (key) {
	//  console.log("結合stringify:" + JSON.stringify(props[key]));
	//});
	
    //  <TextInput style={styles.input} onChangeText={(input_text) => setText(input_text)} value={text} editable={!sendDisable}  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)'}} />
	
  //	  placeholder={ sendDisable ? "This input is disabled" : "Please input message" }
  return (
    <View>
      	  
      <View style={styles.rowButtonLayout}>
      	    <TouchableOpacity onPress={ connect } disabled={conDisable}  style={{opacity:conDisable ? 0.5 : 1}}>
     		<Text style={styles.button}> 接 続 </Text>
      		</TouchableOpacity>
      		
		    <TouchableOpacity onPress={ disconnect } disabled={disconDisable}  style={{opacity:disconDisable ? 0.5 : 1}}>
		    <Text style={styles.button}> 切 断 </Text>
		    </TouchableOpacity>
      </View>
      	  
      <Text style={styles.title}>{res}</Text>
      
	  <Text style={styles.cmdMessage}>{cmdMsg}</Text>
	  

      <TextInput 
  	      style={ [ styles.input ,style={ backgroundColor: sendDisable ? '#C0C0C0' : '#FFF' , width: width-20, marginHorizontal:10, } ] } 
      	  onChangeText={ (input_text) => setText(input_text)}
      	  value={text}  
      	  editable={!sendDisable}
      	  underlineColorAndroid='transparent'
      placeholder={ sendDisable ? "This input is disabled" : "This input is possible" }
      />

      
      <TouchableOpacity onPress={ sendMessage } disabled={sendDisable}  style={{ opacity:sendDisable ? 0.5 : 1 , width: width-20, marginHorizontal:10, }}>
      <Text style={styles.button}> 送 　信 </Text>
      </TouchableOpacity>
      <Text style={styles.contentText}>{msg}</Text>
      			
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
    fontSize: 20,
    fontWeight: '600',
    margin: 5,
  },
  cmdMessage: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
    fontSize: 16,
    fontWeight: '600',
    margin: 5,
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
    /*flex: 1,
    borderColor: 'rgb(29, 161, 242)',
    borderWidth: 2,
    marginRight: 10,
    borderRadius: 10,
    */
    color: 'black',
    paddingHorizontal: 10,
    fontSize: 16,

	  borderColor:'#000000',
	  borderWidth:1, 
	  borderRadius:10,  
	  backgroundColor:'#FFFFFF',
	  height:45,
	  marginVertical:10,
  },
  contentText: {
    marginVertical: 0,
    paddingVertical:0,
    fontSize: 16,
  },
  rowButtonLayout: {
    flexDirection: "row",
  },

});

export default AddScreen;
