import React, { Component } from 'react';
import {AppRegistry,StyleSheet,Text,View} from 'react-native';

export default class Products extends Component {
	static navigationOptions={
		title:'Product Page'
	} ;
  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.box1}>Welcome to Product Page</Text>
		<Text style={styles.box2} >Lux Product Text</Text>
      </View>
    );
  }
}

AppRegistry.registerComponent('Products', () => Products);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
	//flexDirection:'row'
  },
  box1: {
    flex: 1,
    justifyContent: 'center',
	alignItems: 'flex-end',
  },
  box2: {
    flex: 2,
	alignItems: 'flex-end',
	justifyContent: 'center',
    backgroundColor: '#e1e1e1',
  },
  
});