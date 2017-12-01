import React, { Component } from 'react';
import {StyleSheet, Text,View,Navigator} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import Home from './page/home';
import About from './page/about';
import Products from './page/products';
import Splash from './page/splash';
import Login from './page/login';
import Register from './page/register';
import Updateprofile from './page/updateprofile';
import Userlist from './page/userlist';
import Chatroom from './page/chatroom';
import Drawers from './page/drawer';
// import Drawer from 'react-native-drawer';

import {StackNavigator,TabNavigato,DrawerNavigator} from 'react-navigation';
const TabIcon = ({ selected, title }) => {
  return (
    <Text style={{color: selected ? 'red' :'black'}}>{title}</Text>
  );
}
const App = () => {
	
  return (
    <Router>
      <Scene key="root">
		<Scene
          key="home"
          component={Splash}
          title="Home"
		  hideNavBar={true}
		  initial
        />
		<Scene
          key="register"
          component={Register}
          title="Register"
        />
		<Scene
			  key="login"
			  component={Login}
			  title="Login"
			  hideNavBar={true}
			/>
		<Scene key="drawers" component={Drawers}  hideNavBar={true}  />
		     
         <Scene
          key="updateprofile"
          component={Updateprofile}
          title="Update Profile"
        />
	
		 <Scene
          key="userlist"
          component={Userlist}
          title="Userlist"
        />
		 <Scene
          key="chatroom"
          component={Chatroom}
          title="chatroom"
        />
         <Scene
          key="tabbar"
          tabs={true}
		  title="Demo"
          tabBarStyle={{ backgroundColor: '#FFFFFF' }}
         >
			  <Scene key="osu1" title="About 1" icon={TabIcon} >
					<Scene key="about" title="" component={About} />
			  </Scene>
			   <Scene key="osu2" title="Products" icon={TabIcon} >
					<Scene key="products" title="Products" component={Products} />
			   </Scene>
				<Scene key="osu3" title="Home" icon={TabIcon}>
					<Scene key="home1" title="Home" component={Home} />
				</Scene>
		</Scene>
		
      </Scene>
      </Router>
  );
}

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
});

export default App;