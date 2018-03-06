/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/3/18
---------------
----------------
--Date Last Modified:
--03/1/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

*/


import React, { Component } from 'react';
import {
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
import { Actions } from 'react-native-router-flux';

export default class Signup extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      bname: '',
      name: ''
    }
  }

  render() {
    return(

      <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>

        <View style = {styles.container}>

          <Text style = {styles.cancel} onPress = { () => Actions.pop() }>Cancel</Text>

          <Text style = {styles.header}>- SignUp -</Text>

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Email'
            onChangeText = { (eMail) => this.setState({email: eMail})}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Password'
            onChangeText = { (pass) => this.setState({password: pass})}
            secureTextEntry = {true}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Business Name'
            onChangeText = { (businessName) => this.setState({bname: businessName})}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Full Name'
            onChangeText = { (fullName) => this.setState({name: fullName})}
          />

          <TouchableOpacity style = {styles.botton} onPress = { this.register }>

            <View>
              <Text>Register</Text>
            </View>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    );
  }

  register = () => {
    fetch('http://127.0.0.1:3000/users/add', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        bname: this.state.bname,
        name: this.state.name
      })
    })
    .then((response) => response.json())
    .then((res) => {

      if (res.success === true) {
        AsyncStorage.setItem('user', res.user);
        Actions.login();
      } else {
        Alert.alert(res.message);
      }
    })
    .done();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingLeft: 50,
    paddingRight: 50
  },
  header: {
    fontSize: 24,
    marginBottom: 60,
    color: 'white',
    fontWeight: 'bold'
  },
  TextInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 30,
    backgroundColor: 'white'
  },
  botton: {
    alignSelf: 'stretch',
    backgroundColor: '#d5928d',
    padding: 20,
    alignItems: 'center'
  },
  cancel: {
    alignSelf: 'flex-end',
    marginTop: 0,
  }
});
