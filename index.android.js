/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
import App from './app/components/index';

import Home from './app/components/page/home';
import About from './app/components/page/about';
import Products from './app/components/page/products';
import Splash from './app/components/page/splash';
import Login from './app/components/page/login';
import Register from './app/components/page/register';

export default class app4 extends Component {
	
  render() {
    return (
        <Login />
     
    );
  }
}
// const app4 = StackNavigator({ Home: { screen: Splash }, About: { screen: About }, Products: { screen: Products }, login: { screen: Login }, register: { screen: Register }});
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('app4', () => App);
