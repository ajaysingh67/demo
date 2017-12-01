import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Image,TextInput,TouchableOpacity,StatusBar,TouchableHighlight,KeyboardAvoidingView,AsyncStorage} from 'react-native';

const ACCESS_TOKEN = 'access_token';
export default class Register extends Component {
	  static navigationOptions ={
		title:'Register',
	 } ;
	  constructor(){
		   super();
		   this.state={
			   name:'',
			   email:'',
			   password:'',
			   password_confirmation:'',
			   error:[],
		   }
	  }
	  
	  async storeToken(accessToken) {
			try {
				await AsyncStorage.setItem(ACCESS_TOKEN, accessToken);
				console.log("Token was stored successfull ");
			} catch(error) {
				console.log("Something went wrong");
			}
		}
	  async onsubmitRegister(){
		  try{
			   
			    let response = await fetch('http://162.243.2.155/blog1/react/api/register.php', {
                              method: 'POST',
                              headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                user:{
                                  name: this.state.name,
                                  email: this.state.email,
                                  password: this.state.password,
                                  password_confirmation: this.state.password_confirmation,
                                }
                              })
                            });
			  let res = await response.text();
			  if (response.status >= 200 && response.status < 300) {
				  var data = JSON.parse(res);
				  console.log(data.token);
				  
				    let accessToken = data.token;
					console.log(accessToken);
					this.storeToken(accessToken);
					 this.redirect('login');
				  
				  } else {
						  //Handle error
						  let error = res;
						  throw error;
				}
			 
		  } catch(error) {
			  console.log(error);
			  
		  }
	  }
	
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.boxcontainer}>
	  <StatusBar barStyle="light-content" />
          <View style={styles.logoContainer}>
				<Image source={require('../../../assect/img/logo.png')} style={styles.logo} />
				<Text style={styles.title}>Welcome to Demo App </Text>
		  </View>
		  <View style={styles.formcontainer}>
				<TextInput style={styles.input}  placeholder="Name" placeholderTextColor='#fff' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({name: text}) } />
				<TextInput style={styles.input}  placeholder="Email" placeholderTextColor='#fff' keyboardType="email-address" underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({email: text}) } />
				<TextInput style={styles.input}  secureTextEntry placeholder="Password" placeholderTextColor='#fff' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({password: text}) } />
				<TextInput style={styles.input}  secureTextEntry placeholder="Conform Password" placeholderTextColor='#fff' underlineColorAndroid='transparent' onChangeText={ (text)=> this.setState({password_confirmation: text}) } />
				<TouchableHighlight style={styles.buttonContainer} onPress={this.onsubmitRegister.bind(this)}>
				    <Text style={styles.buttonText}>Register</Text>
				</TouchableHighlight>
		  </View>
		  
      </KeyboardAvoidingView>
    );
  }
}
AppRegistry.registerComponent('Register', () => Register);
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