/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/10/18
---------------
----------------
--Date Last Modified:
--03/4/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

TODO: implement search bar
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
  ActivityIndicator,
  FlatList
} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


/**
  TODO: pull to refresh, give alert saying pull to refresh
**/

export default class Employees extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        data: [],
        emp: '',
        refreshing: false
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('user').then( (value) => this.setState({ emp: value })).then(this.getList);
  }

  getList = () => {
    return fetch('http://127.0.0.1:3000/employees', {
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
        data: res.message,
        refreshing: false
      });
      console.log(this.state.data)
    })
    .done();
  }

  handleRefresh = () => {
    this.setState({
      refreshing: true
    }, () => {
      this.getList();
      }
    );
  }

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.isloading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
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
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data = {this.state.data}
            renderItem = {({ item }) => (

            <TouchableOpacity onPress = { () => Actions.empProf({ callz: 'evan' }) }>
              <ListItem
                roundAvatar
                title = {item.name}
                subtitle = {item.name}
              />
            </TouchableOpacity>

            )}
            keyExtractor = {item => item.e_ID}
            refreshing = {this.state.refreshing}
            onRefresh = {this.handleRefresh}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
          />

        </List>
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
