import React, { Component } from 'react'
import { ToolbarAndroid,StyleSheet, View,} from 'react-native'


export default class Toolbar extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
        title: this.props.title,
    };
  }
  render(){
    return(
      <ToolbarAndroid
      title={this.state.title}
      style = {styles.toolbar}
      navIcon={require('../img/drawer.png')}
      onIconClicked = {this.props.reference}
      titleColor = {"#ffffff"}
      />
    );
  }
}

var styles = StyleSheet.create({
  toolbar: {
   backgroundColor: '#953163',
   height: 56,
   flex:0,

  },
 });
