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


            <Text style = {styles.header}>- SignUp -</Text>


          <TextInput
            style = {styles.TextInput}
            placeholder = 'Email'
            onChangeText = { (email) => this.setState({email})}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Password'
            onChangeText = { (password) => this.setState({password})}
            secureTextEntry = {true}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Business Name'
            onChangeText = { (bname) => this.setState({bname})}
          />

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Full Name'
            onChangeText = { (name) => this.setState({name})}
          />

          <TouchableOpacity
            style = {styles.botton}
            onPress = { this.register }
          >
          <View>
            <Text>Register</Text>
          </View>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>




    );
  }

  register = () => {
    fetch('http://127.0.0.1:3000/signup', {
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
        this.props.navigation.navigate('NavBar');
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
  }
});
