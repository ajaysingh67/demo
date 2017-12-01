import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,TextInput,TouchableOpacity,StatusBar,TouchableHighlight,KeyboardAvoidingView,AsyncStorage,ActivityIndicator} from 'react-native';
import { Actions } from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';
export default class Updateprofile extends Component {
	  static navigationOptions ={
		title:'Update Profile',
	 } ;
	  constructor(props){
		   super(props);
		   this.state={
			   name:'',
			   email:'',
			   password:'',
			   password_confirmation:'',
			   error: [],
			   showProgress: false,
			   accessToken: this.props.accessToken,
		   }
	  }
	  
	    componentWillMount() {
			this.fetchUserData();
		}
		
		async getToken() {
			try {
			  let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
			  if(!accessToken) {
				  console.log("Token not set");
			  } else {
				  console.log(accessToken);
				//  this.verifyToken(accessToken)
			  }
			} catch(error) {
				console.log("Something went wrong");
			}
	   }
		async fetchUserData() {
			let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
			console.log(access_token);
			
			try {
			  let response = await fetch("http://162.243.2.155/blog1/react/api/getuser.php?access_token="+access_token);
			  let res = await response.text();
			 
			  if (response.status >= 200 && response.status < 300) {
				  //Handle success
				  let responceData = JSON.parse(res);
				  let userData =responceData.userdata ;
				 //  console.log("data is: " + userData[0]['id']);
				   
				   for(let data in userData) {
						 console.log("data is1: " + userData[data]);
						 this.setState({[data]:userData[data]});
					} 
				  // self.setState({[data]:userData});
				   console.log(this.state.email);
				   
			  } else {
				  //Handle error
				  let error = res;
				  throw err;
			  }
			} catch(error) {
				//If something went wrong we will redirect to the login page
				//this.redirect('login');
			}
			
		}
		
		async onUpdatePressed() {
				 this.setState({showProgress: true});
				let access_token = await AsyncStorage.getItem(ACCESS_TOKEN);
				try {
				  let response = await fetch("http://162.243.2.155/blog1/react/api/updateuser.php?access_token="+access_token, {
										  method: 'PATCH',
										  headers: {
											'Accept': 'application/json',
											'Content-Type': 'application/json',
										  },
										  body: JSON.stringify({
											user:{
											  id: this.state.id,	
											  name: this.state.name,
											  email: this.state.email,
											}
										  })
									   });
				  let res = await response.text();
				  console.log(res);
				  if (response.status >= 200 && response.status < 300) {
					  let responceData = JSON.parse(res);
					  this.setState({error: responceData.message})
					  //On success we redirect to home with flash success message
					  // this.redirect('home', res)
				  } else {
					  //Handle errors
					  let error = res;
					  throw error
				  }
				} catch(error) {
					//errors are in JSON form so we must parse them first.
					/* let formErrors = JSON.parse(errors);
					//We will store all the errors in the array.
					let errorsArray = [];
					for(var key in formErrors) {
					  //If array is bigger than one we need to split it.
					  if(formErrors[key].length > 1) {
						formErrors[key].map(error => errorsArray.push(key + " " + error));
					  } else {
						errorsArray.push(key + " " + formErrors[key]);
					  }
					} */
					this.setState({error: errors})
					 this.setState({showProgress: false});
				
				}
      }
	  
	
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.boxcontainer}>
	  <StatusBar barStyle="light-content" />
          <View style={styles.logoContainer}>
				<Image source={require('../../../assect/img/logo.png')} style={styles.logo} />
				<Text style={styles.title}>Welcome to Demo App </Text>
				<Text >{this.state.error}</Text>
		  </View>
		  <View style={styles.formcontainer}>
				<TextInput style={styles.input}  placeholder="Name" placeholderTextColor='#fff' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({name: text}) } value={this.state.name} />
				<TextInput style={styles.input}  placeholder="Email" placeholderTextColor='#fff' keyboardType="email-address" underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({email: text}) } value={this.state.email} />
				<TouchableHighlight style={styles.buttonContainer} onPress={this.onUpdatePressed.bind(this)}>
				    <Text style={styles.buttonText}>Register</Text>
				</TouchableHighlight>
		  </View>
		  <ActivityIndicator animating={this.state.showProgress} size="large" style={styles.loader} />
      </KeyboardAvoidingView>
    );
  }
}
AppRegistry.registerComponent('Updateprofile', () => Updateprofile);


const styles = StyleSheet.create({
  boxcontainer: {
     flex: 1,
     backgroundColor: '#3498db',
  },
  logo: {
   width:400,
   height:100
  },
  logoContainer: {
     justifyContent: 'center',
	 flexGrow:1,
	 alignItems:'center'
  },
  formcontainer:{padding:20},
  title:{color:'#ffffff',marginTop:10,textAlign:'center',fontSize:20,opacity:.5},
  input:{color:'#ffffff',height:50,backgroundColor: '#2ecc71',paddingHorizontal:10,marginBottom:5},
  buttonContainer:{paddingVertical:15, backgroundColor: '#2980b9'},
  buttonText:{textAlign:'center',color:'#ffffff'}
});