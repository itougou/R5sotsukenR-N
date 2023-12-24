import React,{ useState,useEffect,useRef,Component,useContext } from 'react';
import type {Node} from 'react';

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

/*
 * BBS画面
 */
const AddScreen_2: () => Node = (props) => {
	

	const {height, width} = Dimensions.get('window'); 
	/*
	const [itemList, setItemList] = React.useState([ {name:"あ",id: 1},
													 {name:"い",id: 2},
													 {name:"う",id: 3},]);*/	//FlatList用
													 
	const [itemList, setItemList] = React.useState( [{name:"" , id:0 ,text:"", time:"" }] );	 //FlatList用
	
	const [text, setText] = useState('');	//テキストボックスの文字列
		
	const name = props.route.params.p_name;	//前のページからのパラメータ取り出し
	const res = props.route.params.p_res;	//前のページからのパラメータ取り出し
	
	const flatlistRef = useRef();	//FlastListの自動スクロール等に使用
	/*
	 * 初回レンダリング後と、useした値の更新後に自動で実行する処理
	 */
	useEffect(() => {
		// レンダリング後なので、xは更新後の値
		//document.title = `App | ${x}`;
		
		//fetch("http://192.168.1.186:8080/J/get/bbslist",
		fetch("http://192.168.11.113:8080/J/get/bbslist?name=これは仮のパラメータ(GETのテスト用)",
		{
			method: 'GET' , 
			headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
			//body: JSON.stringify( { name: "" } )
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
			if( data.length === 0 ){
				alert("セッション切れと思われます");
				props.navigation.goBack();	//前のページに戻る
			}else{
				setItemList(data);
			}
			//console.log("Button2 clicked! 受信データ："+data.list );
		})
		.catch((error) => {console.error("エラーです:", error);});
	 }, [] )	//fetch()の第2引数 空の配列[]は、ロード時１回だけ実行の意味

	/*
	 *BBS書き込み送信処理
	 */
	const sendMessage = () => {	//2023.11.29 ito
		//2023.11.29 ito

		//fetch("http://192.168.1.186:8080/J/post",
		fetch("http://192.168.11.113:8080/J/post/bbs",
		{
			method: 'POST' , 
			headers: { 'Accept': 'application/json','Content-Type': 'application/json' },
			body: JSON.stringify( { text: text , name: name  } )
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
				if(data.length===0){
					alert("サーバーでエラーが発生しました");
				}else{
					setItemList(data);	//受信データをFlatListへ書き込み
					flatlistRef.current.scrollToIndex({index: 0 });	//先頭行へスクロール
				}
				setText( "" );	//変数text消去＝ﾃｷｽﾄﾎﾞｯｸｽ文字列消去
				console.log("投稿clicked!");
		})
		.catch((error) => console.error("エラーです:", error));

	}
	
	return (
		
	<View>
				
		<TextInput 
			style={ [ styles.input ,style={ backgroundColor: '#FFF' , width: width-20, marginHorizontal:10, } ] } 
			onChangeText={ (input_text) => setText(input_text)}
			value={text}  
			//editable={!sendDisable}
			underlineColorAndroid='transparent'
			placeholder={ "This input is possible" }
		/>

		<TouchableOpacity onPress={ sendMessage } style={{width: width-20, marginHorizontal:10, }}>
			<Text style={styles.button}> 投　稿 </Text>
		</TouchableOpacity>

		<Text style={styles.title}>{res}</Text>
		<FlatList
			/* scrollEnabled={false} */
			scrollEnabled={true} 
			/*nestedScrollEnabled*/
			ref={flatlistRef}
			data={itemList}
			/*renderItem={({ item, index, separators }) => (*/
			renderItem={( {item} ) => (
				<View style={{marginVertical:5}}>
					<Text style={[styles.contentText,style={ fontSize:20 }]}>{item.name} さん</Text>
					<Text style={styles.contentText}>{
						item.time==="" ? "":new Date(item.time).toLocaleString("ja-JP", { timeZone: 'Asia/Tokyo' })	//timeZone指定しないとグリニッジ標準時刻が表示される
					}</Text>
					<Text style={styles.contentText}>{item.text}</Text>
				</View>
			)}
			keyExtractor={(item) => item.id}
		></FlatList>

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

export default AddScreen_2;
