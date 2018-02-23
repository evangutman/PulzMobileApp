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
  ActivityIndicator,
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class EmployeeProfile extends Component<{}> {

    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          data: [],
          emp: ''
      }
    }


    componentWillMount() {
      AsyncStorage.getItem('user').then( (value) => this.setState({ emp: value }));//.then(this.getList);
    }

    /*getList = () => {
      return fetch('http:/127.0.0.1:3000/client', {
        method: 'POST',
        headers: {
          'Accept': 'Application/json',
          'Content-Type': 'Application/json',
        },
        body: JSON.stringify({
          emp: this.state.emp
        })
      })
      .then((response) => response.json())
      .then((res) => {
        this.setState({
          isLoading: false,
          data: res.message
        });
        console.log(this.state.data)
      })
      .done();
    }
    */

    render() {
      return(
        <View>
          <Text>{this.props.callz}</Text>
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
