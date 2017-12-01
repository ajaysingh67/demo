import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Button,AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
const ACCESS_TOKEN = 'access_token';
export default class About extends Component {
	componentWillMount() {
		this.getToken();
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
   
   async verifyToken(token) {
    let accessToken = token

    try {
      let response = await fetch('http://162.243.2.155/blog1/react/api/login.php?ACCESS_TOKEN='+accessToken);
      let res = await response.text();
      if (response.status >= 200 && response.status < 300) {
        //Verified token means user is logged in so we redirect him to home.
        // this.navigate('home');
      } else {
          //Handle error
          let error = res;
          throw error;
      }
    } catch(error) {
        console.log("error response: " + error);
    }
   }
	
  render() {
    return (
      <View>
        <Text>
          Welcome to About Page
        </Text>
		<Button
			  onPress={() => Actions.updateprofile()}
			  title="Go to Update Page"
			  style={styles.buttonclass}
			/>
      </View>
    );
  }
}


AppRegistry.registerComponent('About', () => About);
const styles = StyleSheet.create({
  boxcontainer: {
     flex: 1,
     backgroundColor: 'red',
	 alignItems: 'center',
	 justifyContent: 'center',
  },
  title: {
   color:'white',
   fontSize:35,
   fontWeight:'bold',
  },
  subtitle: {
     fontSize:15,
	 color:'white',
  },
  buttonclass:{marginBottom:40,paddingBottom:40}
  
});
