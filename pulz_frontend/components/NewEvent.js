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
  DatePickerIOS,
  ScrollView,
  Switch,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Actions } from 'react-native-router-flux';

export default class NewEvent extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      repeat: false,
    }
  }



  render() {
    return(

      <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>

        <ScrollView style = {styles.container}>

          <TouchableOpacity>
            <Text>Date:   {this.state.chosenDate.toString()}</Text>
          </TouchableOpacity>
          <DatePickerIOS
            date={this.state.chosenDate}
            onDateChange={(date) => this.setState({chosenDate: date})}
            mode = 'date'
          />






          <TextInput
            style = {styles.TextInput}
            placeholder = 'Full Name'
            onChangeText = { (name) => this.setState({name})}
          />


          <TouchableOpacity
            style = {styles.botton}
            onPress = { this.submit }
          >
          <View>
            <Text>Schedule Event</Text>
          </View>
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>




    );
  }
/*
  submit = () => {
    fetch('http://127.0.0.1:3000/addEmployee', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name: this.state.name
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
  */
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
    /*alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue',
    paddingLeft: 50,
    paddingRight: 50
    */
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
