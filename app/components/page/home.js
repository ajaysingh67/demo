import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';

export default class Home extends Component {
	
	
  render() {
	  var {navigate} = this.props.navigation ;
    return (
      <View>
        <Text>
          Welcome to Home Page
        </Text>
		<Button
          onPress={() => navigate('About')}
          title="Go to About Page"
        />
      </View>
    );
  }
}
AppRegistry.registerComponent('Home', () => Home);
