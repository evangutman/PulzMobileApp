/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/7/18
---------------
----------------
--Date Last Modified:
--02/7/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

TODO: List unfinished jobs at the top followed by jobs to do on current date
*/

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Image,
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class Clients extends Component<{}> {
  render() {
    return(

      <View style = {styles.container}>

        <Text>- TODO -</Text>

      </View>

    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingLeft: 50,
    paddingRight: 50
  }
});
