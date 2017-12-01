import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,TouchableOpacity,ListView,TouchableHighlight,AsyncStorage,ActivityIndicator} from 'react-native';
// import { List, ListItem, SearchBar } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
var userArray = [];
export default class Userlist extends Component {
	constructor(){
		   super();
		// this.state={users:[]};
		   var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
		   this.state = {
			  dataSource: dataSource.cloneWithRows(userArray),
			  isLoading:true
		   }

	}
		componentDidMount() {
		     //	var dataSource = new ListView.DataSource({rowHasChanged:(r1,r2) => r1.guid != r2.guid});
			// console.log("componentDidMount");
			this.getTheData(function(json){
			 userArray = json.userdata;
			 // console.warn(userArray);
			 this.setState({
				  dataSource:this.state.dataSource.cloneWithRows(userArray),
				  isLoading:false
			   })
			}.bind(this));   
			// console.warn("component ->  " + this.state.isLoading);
		  }

	
	  async getTheData(callback) {
			
			let userInfo = await AsyncStorage.getItem('userInfo');
			var userData = JSON.parse(userInfo);
			var userId = userData.id ;
		//	var url = "https://raw.githubusercontent.com/darkarmyIN/React-Native-DynamicListView/master/appledata.json";
		fetch("http://162.243.2.155/blog1/react/api/users.php?userId="+userId)
			 .then(response => response.json())
			 .then(json => callback(json))
			 .catch(error => console.warn("error"));
	    }
		
		openChat(friendId){
			  
			  Actions.chatroom({friendId:friendId});
		}

	/* async fetchUsers() {
		let userInfo = await AsyncStorage.getItem('userInfo');
		var userData = JSON.parse(userInfo);
		var userId = userData.id ;
			console.log(userData.email);
			try {
			  let response = await fetch("http://162.243.2.155/blog1/react/api/users.php?userId="+userId);
			  let res = await response.text();
			   // let responceData = JSON.parse(res);
				  console.log(res);
			  if (response.status >= 200 && response.status < 300) {
				  let responceData = JSON.parse(res);
				  //Handle success
				  this.setState({
					users: responceData.userdata ,
				  });
				   
			  } else {
				  //Handle error
				  let error = res;
				  throw err;
			  }
			} catch(error) {
				//If something went wrong we will redirect to the login page
				//this.redirect('login');
			}
	} */
	
	 renderRow(rowData, sectionID, rowID) {
		 //	console.warn(rowData);
			return (
				<TouchableHighlight underlayColor='#dddddd'  onPress={() => this.openChat(rowData.id)}>
					 <View style={{marginBottom:20,marginTop:2,paddingBottom:20}}>
					 <Text style={styles.text} numberOfLines={1}>{rowData.name}</Text>
					 <Text style={styles.text} numberOfLines={1}>{rowData.email}</Text>
					 <View style={{height: 1, backgroundColor: '#dddddd'}}/>
					</View>
			   </TouchableHighlight>
		   );
		}
  render() {
	     var currentView = (this.state.isLoading) ? <View style={{height: 110, backgroundColor: '#dddddd'}} /> : <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} enableEmptySections={true} />
    return (
        <View> 
              {currentView}
         </View>
    );
  }
}

AppRegistry.registerComponent('Userlist', () => Userlist);
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
});
