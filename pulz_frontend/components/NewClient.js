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
import { Actions } from 'react-native-router-flux';

export default class NewClient extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: '',
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


            <Text style = {styles.header}>- Add a Client -</Text>


          <TextInput
            style = {styles.TextInput}
            placeholder = 'Full Name'
            onChangeText = { (name) => this.setState({name})}
          />

          <TextInput
          style = {styles.TextInput}
          placeholder = 'Address'
          onChangeText = { (address) => this.setState({address})}
          />

          <TouchableOpacity
            style = {styles.botton}
            onPress = { this.submit }
          >
          <View>
            <Text>Add Client</Text>
          </View>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>




    );
  }

  submit = () => {
    fetch('http://127.0.0.1:3000/client/addClient', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        address: this.state.address,
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
