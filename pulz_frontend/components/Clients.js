/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/15/18
---------------
----------------
--Date Last Modified:
--03/4/18
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
  ActivityIndicator,
  FlatList
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class Clients extends Component<{}> {

    constructor(props) {
      super(props);
      this.state = {
          isLoading: true,
          data: [],
          emp: ''
      }
    }

    componentWillMount() {
      AsyncStorage.getItem('user').then( (value) => this.setState({ emp: value })).then(this.getList);
    }

    getList = () => {
      return fetch('http:/127.0.0.1:3000/clients', {
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

    render() {

      if (this.state.isLoading) {
        return(

            <View style = {{flex: 1, paddingTop: 20}}>
              <ActivityIndicator />
            </View>

        );
      }

      return(

        <View>

          <List>

            <FlatList
              data = {this.state.data}
              renderItem = {({ item }) => (
                <ListItem
                  roundAvatar
                  title = {item.name}
                  subtitle = {item.adress}
                  keyExtractor = {(item) => item.name}
                />
              )}
              keyExtractor = {item => item.c_ID}
            />

          </List>

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
