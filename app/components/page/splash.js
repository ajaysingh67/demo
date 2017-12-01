import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View,Button,TouchableOpacity} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class Splash extends Component {
	
	
  openDrawer = () => {
    Actions.userlist();
  }
  render() {
	   var {navigate} = this.props.navigation ;
    return (
      <View style={styles.boxcontainer}>
          <Text style={styles.title}>Ajay App</Text>
		  <Text style={styles.subtitle}>Welcome to Demo App </Text>
			  <Button
			  onPress={() => navigate('login')}
			  title="Go to Login Page"
			  style={styles.buttonclass}
			/>
			<Button
			  onPress={() => navigate('register')}
			  title="Go to Register Page"
			  buttonStyle={styles.buttonclass}
			/>
			<Button
			  onPress={() => navigate('tabbar')}
			  title="Go to Tab Pages"
			  buttonStyle={styles.buttonclass}
			/>
			<TouchableOpacity onPress={this.openDrawer}>
			  <Text style={styles.buttonclass}>
				Open Menu
			  </Text>
			</TouchableOpacity>
			
      </View>
    );
  }
}
AppRegistry.registerComponent('Splash', () => Splash);
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
  buttonclass:{ marginTop: 10,padding: 10}
  
});