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
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
//solving module issues with : rm node_modules/react-native/local-cli/core/__fixtures__/files/package.json


export default class Profile extends Component<{}> {

  render() {
    return(
      <View style = {styles.container}>
        <Text>- Profile -</Text>
        <Icon.Button name = 'calendar' onPress = { () => this.props.navigation.navigate('Calendar')}/>
        <Icon.Button name = 'address-book-o' onPress = { () => this.props.navigation.navigate('Clients')}/>
        <Icon.Button name = 'user-circle-o' onPress = { () => this.props.navigation.navigate('Employees')}/>
        <Icon name = 'bars' />
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
