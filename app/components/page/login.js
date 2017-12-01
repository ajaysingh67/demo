import React, { Component } from 'react';
//import { Redirect } from 'react-router';
// import { browserHistory } from 'react-router';
// import { DrawerNavigator } from "react-navigation";
import Drawers from './drawer'
import { Actions } from 'react-native-router-flux'; // New code
import {AppRegistry,StyleSheet,Text,View,Image,TextInput,TouchableOpacity,StatusBar,TouchableHighlight,AsyncStorage,Picker} from 'react-native';
const ACCESS_TOKEN = 'access_token';

export default class Login extends Component {
	 
	 constructor(){
			super();
            //  console.log("testttttttt");
			this.state = {
			  loader:false,
			  email: "",
			  password: "",
			  error: "",
			}
		}
	
	componentDidMount() {
		var that = this;
		setTimeout( () => {
		   that.setTimePassed();
		},400);
	}	
	setTimePassed = ()=>{
		console.log('setTimepassed');
		this.setState({
		  loader:true,
		})
	  }
	storeToken(responseData){
		AsyncStorage.setItem(ACCESS_TOKEN, responseData, (err)=> {
		  if(err){
			console.log("an error");
			throw err;
		  }
		  this.getToken();
		}).catch((err)=> {
			console.log("error is: " + err);
		});
	}
	async deleteToken() {
		try {
			await AsyncStorage.removeItem(ACCESS_TOKEN)
			this.redirect('root');
		} catch(error) {
			console.log("Something went wrong");
		}
	}
	
	async getToken() {
    try {
		  let accessToken = await AsyncStorage.getItem(ACCESS_TOKEN);
		  if(!accessToken) {
			  console.log(" error is" + accessToken);
			 // this.redirect('login');
		  } else {
			  console.log("accessToken" + accessToken);
			  this.setState({accessToken: accessToken})
		  }
		} catch(error) {
			console.log("Something went wrong");
			//this.redirect('login');
		}
	}
	
	 async onsubmitLogin(){
		  try{
			  
			  //  Actions.gray() ;
			  //  this.redirect('register');
			    let response = await fetch('http://162.243.2.155/blog1/react/api/login.php', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  email: this.state.email,
                                  password: this.state.password,
                                }
                              })
                            });
			  let res = await response.text();
			  if (response.status >= 200 && response.status < 300) {
				  var data = JSON.parse(res);
				    if(data.status==1){
						 let accessToken = data.token;
						 console.log(data.userdata);
						 let userInfo = JSON.stringify(data.userdata);
						 AsyncStorage.setItem('userInfo',userInfo) ;
						// console.log(userInfo.email);
						 this.storeToken(accessToken);
						
						// alert(accessToken);
						 Actions.userlist();
						this.setState({error:''});
					} else {
						  this.deleteToken();
						  let error = data.message;
						  throw error;
					} 
				  } else {
						  //Handle error
						  let error = res;
						  throw error;
						  
				} 
			 
		  } catch(error) {
			   this.setState({error: error});
				console.log("error " + error);
			  //	this.setState({showProgress: false});
			  
		  }
	  }
	
  render() {
    var contents = (
      <View style={styles.boxcontainer}>
		<StatusBar barStyle="light-content" />
          <View style={styles.logoContainer}>
				<Image source={require('../../../assect/img/logo.png')} style={styles.logo} />
				<Text style={styles.title}>Welcome to Demo App </Text>
				<Text style={styles.error} >
						  {this.state.error}
				</Text>
		  </View>
		  
		  <View style={styles.formcontainer}>
				<TextInput style={styles.input}  placeholder="Email" placeholderTextColor='#fff' keyboardType="email-address" underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({email: text}) }/>
				<TextInput style={styles.input}  secureTextEntry placeholder="Password" placeholderTextColor='#fff' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({password: text}) } />
				<Picker
				  selectedValue={this.state.language}
				  onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
				  <Picker.Item label="Java" value="java" />
				  <Picker.Item label="JavaScript" value="js" />
				</Picker> 
				
				<TouchableHighlight style={styles.buttonContainer} onPress={this.onsubmitLogin.bind(this)}>
				    <Text style={styles.buttonText}>Login</Text>
				</TouchableHighlight>
				 
		  </View>
      </View>
    );
	if(this.state.loader){
    return (
		<Drawers data={contents} screentitle={'Login'}/>
    )}else {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#FFFFFF'}}>
            <Image
              style={{width: 70, height: 70,}}
              source={require('../img/V_loading_.gif')} />
          </View>
      )
    }
  }
}
AppRegistry.registerComponent('Login', () => Login);
const styles = StyleSheet.create({
  boxcontainer: {
     flex: 1,
     backgroundColor: '#3498db',
  },
  logo: {
   width:320,
   height:100
  },
  logoContainer: {
     justifyContent: 'center',
	 flexGrow:1,
	 alignItems:'center'
  },
  formcontainer:{padding:20},
  title:{color:'#ffffff',marginTop:10,textAlign:'center',fontSize:20,opacity:.5},
  input:{color:'#ffffff',height:40,backgroundColor: '#2ecc71',paddingHorizontal:30,marginBottom:30},
  buttonContainer:{paddingVertical:15, backgroundColor: '#2980b9'},
  buttonText:{textAlign:'center',color:'#ffffff'},
  error: {
    color: 'red',
    paddingTop: 10
  },
  success: {
    color: 'green',
    paddingTop: 10
  },
  loader: {
    marginTop: 20
  }
});