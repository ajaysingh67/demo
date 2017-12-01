import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,TouchableOpacity,ListView,Input,TouchableHighlight,AsyncStorage,ActivityIndicator,TextInput} from 'react-native';
// import { List, ListItem, SearchBar } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
var userArray = [];
export default class Chatroom extends Component {
	constructor(){
		   super();
		// this.state={users:[]};
		   var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
		   this.state = {
			  dataSource: dataSource.cloneWithRows(userArray),
			  isLoading:true,
			  textmessage:'',
		   }

	}
		componentWillMount(){
			   this.getTheData();
		} 
		componentDidMount() {
			  
			this.timerID = setInterval(() => {
				  this.getTheData();
			     
			 }, 3000);
		}
		 componentWillUnmount() {
			clearInterval(this.timerID);
	     }

		 async  getTheData() { 
		    let userInfo = await AsyncStorage.getItem('userInfo');
			var userData = JSON.parse(userInfo);
			var userId = userData.id ;
			let friendId = parseInt(this.props.friendId) ;
			
			 try { let response = await fetch("http://162.243.2.155/blog1/react/api/messages.php?userId="+userId+"&friendId="+friendId);
				let responseJson = await response.json(); 
				 var responcestatus =responseJson.status ;
				
				// console.log(responseJson);
				  if(responcestatus==1){
					   var userArray = [];
					   this.setState({
						  dataSource:this.state.dataSource.cloneWithRows(userArray),
						  isLoading:true
					   }) 
					   let userArray =responseJson.userdata ;
					    
						this.setState({
						  dataSource:this.state.dataSource.cloneWithRows(userArray),
						  isLoading:false
					   }) 
					  // console.log(this.state.dataSource);
				  }
			 } 
			catch(error) { console.error(error); }
		 }
		
	
	 renderRow(rowData, sectionID, rowID) {
		 //	console.warn(rowData);
			return (
				<TouchableHighlight underlayColor='#dddddd' >
					 <View>
					 <Text style={styles.text} numberOfLines={1}>{rowData.messagnername}</Text>
					 <Text style={styles.text} numberOfLines={1}>{rowData.message}</Text>
					 
					 <View style={{height: 1, backgroundColor: '#dddddd'}}/>
					</View>
			   </TouchableHighlight>
		   );
		}
		
    async onsubmitMessage(){
		   let textmessage = this.state.textmessage ;
		   if((textmessage=='') || (textmessage==' ')) {
			   
		   } else {
					try{
					 	let userInfo = await AsyncStorage.getItem('userInfo');
						var userData = JSON.parse(userInfo);
						var userId = userData.id ;
						let friendId = parseInt(this.props.friendId) ;
						let response = await fetch('http://162.243.2.155/blog1/react/api/savemessage.php', {
									  method: 'POST',
									  headers: {
										'Accept': 'application/json',
										'Content-Type': 'application/json',
									  },
									  body: JSON.stringify({
										user:{
										  userfrom: userId,
										  userto: friendId,
										  message: this.state.textmessage,
										}
									  })
									});
					  let res = await response.text();
					 
					  if (response.status >= 200 && response.status < 300) {
						  var data = JSON.parse(res);
							if(data.status==1){
								
								var userArray = data.userdata ;
								this.setState({
								  dataSource:this.state.dataSource.cloneWithRows(userArray),
								  isLoading:false,
								  error :''
							   }) 
							} else {
								  this.deleteToken();
								  let error = data.message;
								  throw error;
							} 
						  } else {
								  let error = res;
								  throw error;
						} 
					 
				   } catch(error) {
					   this.setState({error: error});
						console.log("error " + error);
				   }
		   }
		 
	 }	
	
   render() {
	     var currentView = (this.state.isLoading) ? <View style={{height: 110, backgroundColor: '#dddddd'}} /> : <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} />
    return (
          <View> 
              {currentView}
			  <View style={styles.formcontainer}>
		         <TextInput style={styles.input}  placeholder="Message...." placeholderTextColor='#000' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({textmessage: text}) } />
				 <TouchableHighlight style={styles.buttonContainer} onPress={this.onsubmitMessage.bind(this)}>
				    <Text style={styles.buttonText}>Submit</Text>
				 </TouchableHighlight>
				 
		      </View>
         </View>
		  
    );
  }
}

AppRegistry.registerComponent('Chatroom', () => Chatroom);
const styles = StyleSheet.create({
	  container: {
		flex: 1,
		padding: 12,
		flexDirection: 'row',
		alignItems: 'center',
	  },
	  text: {
		marginLeft: 12,
		fontSize: 16,
	  },
	  photo: {
		height: 40,
		width: 40,
		borderRadius: 20,
		
	},
	 buttonText:{borderColor: '#000',borderWidth: 1,height: 50,backgroundColor:'#3498db',textAlign:'center',padding: 12,marginTop:40},
	 input:{height: 40, borderColor: 'gray', borderWidth: 1},
	 formcontainer:{padding:20,borderColor:'#e1e1e1'},
});
