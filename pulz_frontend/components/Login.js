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
import Icon from 'react-native-vector-icons/FontAwesome';


export default class Login extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    }
  }

  componentDidMount() {

    this.loadInitialState;
  }

  loadInitialState = async() => {
    var checkedState = this.AsyncStorage.getItem('user');
    if (checkedState !== null) {
      this.props.navigation.navigate('Profile');
    }

  }

  render() {
    return (

      <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>

        <View style = {styles.container}>

          <Image
            source = {require('../img/logo_black.png')}
          />


          <Text style = {styles.header}>- Login -</Text>

            <TextInput
              style = {styles.TextInput}
              placeholder = 'Email'
              onChangeText = { (email) => this.setState({email})}
            />

            <TextInput
              style = {styles.TextInput}
              placeholder = 'Password'
              onChangeText = { (password) => this.setState({password})}
              secureTextEntry = { true }
            />

            <TouchableOpacity
              style = {styles.botton}
              onPress = { this.login }
            >
            <View>
              <Text>Log In</Text>
            </View>
            </TouchableOpacity>

            <View style = {styles.signup}>
            <Text>Not registered yet? Sign up </Text>
            <Text style = {styles.here} onPress = { () => this.props.navigation.navigate('Signup') }>here.</Text>
            </View>

        </View>
      </KeyboardAvoidingView>
    );
  }
  //http://169.254.205.42 --my IP address
    login = () => {
      fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => response.json())
      .then((res) => {

        if (res.success === true) {
          AsyncStorage.setItem('user', res.user);
          console.log(res.user);
          console.log(AsyncStorage.getItem('user'));
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
    },
    signup: {
      padding: 20,
      flexDirection: 'row'
    },
    here: {
      color: '#E91E63',
      textDecorationLine: 'underline'
    }
});
