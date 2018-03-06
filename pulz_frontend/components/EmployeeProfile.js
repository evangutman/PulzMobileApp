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

TODO:
*/

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';

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
      AsyncStorage.getItem('user').then( (value) => this.setState({ emp: value }));
    }

    render() {
      return(

        <View style = {styles.container}>
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
