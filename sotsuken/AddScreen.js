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
	FlatList,
	Dimensions,
} from 'react-native';

//2023.12.7
let stompClient=null;
/*
 * チャット画面
 */
const AddScreen: () => Node = (props) => {
	
	//let totalMessages = "";
	//let allMessages =	[{msg: "",key: new Date().toString() },];
	
	let allMessages =	[];	//全メッセージ配列
	let msgNo = 0;	//メッセージ番号
	
	//接続処理
	function connect() {
		console.log("★connect()");
		
		
		let socket = new SockJS('http://192.168.11.113:8080/gs-guide-websocket');
		//let socket = new SockJS('http://192.168.1.186:8080/gs-guide-websocket');
		stompClient = Stomp.over(socket);
		/*
		let options = {debug: false, protocols: Stomp.VERSIONS.supportedProtocols()};
		stompClient = Stomp.over(socket, options);
		*/
		stompClient.connect({}, function (frame) {
			setConnected(true);
			stompClient.send("/app/hello", JSON.stringify( { name: "ICCﾁｬｯﾄｼｽﾃﾑ", message: namae+"さんが、入室しました！！！" } ) );	//ｻｰﾊﾞへﾒｯｾｰｼﾞ送信
			console.log('★Connected: ' + frame);
			stompClient.subscribe('/topic/greetings', function ( greeting ) { //サーバーからの受信窓口登録
				showGreeting( JSON.parse( greeting.body ).content );	//受信ﾒｯｾｰｼﾞ表示
				//console.log( "★/topic/greeting msg="+msg );
			});
		});
	}
	
	//送信処理
	const sendMessage = () => {
		console.log("★sendMessage()");
		
		if(stompClient!=null){
			//stompClient.send("/app/hello", JSON.stringify( { name: "gogogo", message: "konnwannmi" } ) );
			stompClient.send("/app/hello", JSON.stringify( { name: namae, message: text } ) );	//ｻｰﾊﾞへﾒｯｾｰｼﾞ送信
			//console.log( "★sendMessage() msg="+msg );
				setText( "" );	//変数text消去＝ﾃｷｽﾄﾎﾞｯｸｽ文字列消去
		}
		
	}

	//受信メッセージ表示処理
	function showGreeting( message ) {
	
		console.log("★★★showGreeting() message:"+message);
		
			msgNo++;	//メッセージ番号カウントアップ
		//setListUpdate( msgNo	);	//ﾒｯｾｰｼﾞ番号をリスト更新フラグにへ書き込み　無くても表示更新できるようになった為コメントアウト

		//allMessages.push({ msg: message, key: msgNo });	//これはだめ	データが更新されたことを認識しない 下記のように変更
		allMessages = [ ...allMessages , { msg: message, key: msgNo } ];	//受信メッセージを配列に追加したものを「上書き」
				
		setItemList( allMessages );	//FlatList用の itemList へ格納
	
		//setItemList( [ ...itemList , { msg: message, key: msgNo } ] );　//これはだめ	データが更新されたことを認識しない 
		
		for( const d of allMessages ){
			Object.keys( d ).forEach( function ( key ) {
				console.log("★★★ newList:" + key+ ":"+ JSON.stringify( d[key]) );
			});
		}
		
		console.log("msgNo:"+msgNo);
		flatlistRef.current.scrollToIndex({index: msgNo-1 });	//FlatListの最終行へスクロール
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
		}

		setText( "" );	//変数text消去＝ﾃｷｽﾄﾎﾞｯｸｽ文字列消去

		//allMessages = [{ msg: "" , key: 0 }];
		allMessages = []; //上記のように1行目に空の行が無いとflatlistRef.current.scrollToIndex()でスクロール時にエラーになるが、FlatListにgetItemLayout=を入れるとエラーは出なくなったのでこれで行く
		setItemList( allMessages );
		msgNo=0;
		//setListUpdate( msgNo );	//ﾒｯｾｰｼﾞ番号をリスト更新フラグにへ書き込み
	}
	
	const [text, setText] = useState('');	//2023.11.29 ito テキストボックスの文字列
	const [sendDisable, setSendDisable] = useState(true);	//2023.12.9 送信ボタン使用可／不可
	const [conDisable,setConDisable] = useState(false);	//2023.12.9 接続ボタン使用可／不可
	const [disconDisable, setDisconDisable] = useState(true);	//2023.12.9 切断ボタン使用可／不可
	const [cmdMsg, setCmdMsg] = useState('接続してください');	//2023.12.9 指示メッセージ
	const {height, width} = Dimensions.get('window');
	/*
	const [itemList, setItemList] = React.useState( [ { msg:"あ", key: 1 },
												 		{ msg:"い", key: 2 }, 
											 			{ msg:"う", key: 3 }, ] );	//FlatList動作確認用
													 */
	//const [itemList, setItemList] = useState( [ { msg:"",key: 0	} ] );	//FlatList用
	const [itemList, setItemList] = useState( [ ] );	//FlatList用
	//const [listUpdate, setListUpdate] = useState('');	//2023.12.14 itoFlatList表示行更新用フラグ なくても更新されるようにできた為コメントアウト
		
	const flatlistRef = useRef();	//FlastListの自動スクロール等に使用
	
	//2023.12.7
	const namae = props.route.params.p_name;	//前のページからのパラメータ取り出し
	const res = props.route.params.p_res;	//前のページからのパラメータ取り出し
	console.dir(props);
	//console.log("JSON.stringify props:"+JSON.stringify(props));
	//console.log("props.route.params.data:"+props.route.params.data);
	
	//Object.keys(props).forEach(function (key) {
	//	console.log("結合stringify:" + JSON.stringify(props[key]));
	//});
	
	return (
	<SafeAreaView style={styles.container} >
				
		<View style={styles.rowButtonLayout}>
			<TouchableOpacity onPress={ connect } disabled={conDisable} style={{opacity:conDisable ? 0.5 : 1 , flex: 1,}}>
				<Text style={styles.button}> 接 続 </Text>
			</TouchableOpacity>
				
			<TouchableOpacity onPress={ disconnect } disabled={disconDisable} style={{opacity:disconDisable ? 0.5 : 1 , flex: 1,}}>
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
		
		<TouchableOpacity onPress={ sendMessage } disabled={sendDisable}	style={{ opacity:sendDisable ? 0.5 : 1 , width: width-20, marginHorizontal:10, }}>
		<Text style={styles.button}> 送 　信 </Text>
		</TouchableOpacity>
		
		<FlatList onLayout={e => console.log("e.nativeEvent.layout.height="+e.nativeEvent.layout.height)} 
			/* scrollEnabled={false} */
			scrollEnabled={true} 
			/*nestedScrollEnabled*/
			data={itemList}
			removeClippedSubviews={false}
			/*execData={msgNo}*/
			/*extraData={listUpdate}*/
			ref={flatlistRef}
			//ref={this.flatListRef}
			/*renderItem={({ item, index, separators }) => (*/
			renderItem={( {item} ) => (
				<Text style={styles.contentText}>{item.msg}</Text>
			)}
			keyExtractor={(item) => item.key}
			onEndReached={() => console.log('End of list reached.')}
			getItemLayout={(data, index) => ( //これを入れるとscrollToIndex()でのスクロール時のエラーは出なくなった https://stackoverflow.com/questions/48679272/flatlist-getitemlayout-usecase　https://cpoint-lab.co.jp/article/202106/20351/
				{length: 366 , offset: 366 * index, index}	// 366 はItemの高さ
			)}
			/*
			onScrollToIndexFailed={(error) => {
				console.log("★スクロール時エラー発生！！"+error.index);
				this.flatListRef.scrollToOffset({ offset: error.averageItemLength * error.index, animated: true });
				setTimeout(() => {
					if (this.state.data.length !== 0 && this.flatListRef !== null) {
						this.flatListRef.scrollToIndex({ index: error.index, animated: true });
					}
				}, 100);
			}}
			*/
		></FlatList>
					
	</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		/*alignItems: 'center',
		justifyContent: 'center',*/
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
		marginVertical: 5,
		paddingVertical:0,
		fontSize: 16,
	},
	rowButtonLayout: {
	 	flexDirection: "row",
		margin: 5,
	},

});

export default AddScreen;
