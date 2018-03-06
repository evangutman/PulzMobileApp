/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/11/18
---------------
----------------
--Date Last Modified:
--02/27/18
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
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class NewEmployee extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      emp: '',
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then( (emp) => this.setState({emp}));
  }

  render() {
    return(

      <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>

        <View style = {styles.container}>

            <Text style = {styles.header}>- Add an Employee -</Text>

          <TextInput
            style = {styles.TextInput}
            placeholder = 'Full Name'
            onChangeText = { (name) => this.setState({name})}
          />


          <TouchableOpacity style = {styles.botton} onPress = { this.submit }>

            <View>
              <Text>Add Employee</Text>
            </View>

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>

    );
  }

  submit = () => {
    fetch('http://127.0.0.1:3000/employees/add', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        emp: this.state.emp
      })
    })
    .then((response) => response.json())
    .then((res) => {
      console.log(res);
      if (res.success === true) {
        Actions.pop();
      } else {
        console.log(res.message);
        //Alert.alert(res.message);
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
