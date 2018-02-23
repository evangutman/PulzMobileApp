

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login from './components/Login';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Calendar from './components/Calendar';
import Clients from './components/Clients';
import Employees from './components/Employees';
import NavBar from './components/NavBar';
import NewEmployee from './components/NewEmployee';
import NewEvent from './components/NewEvent';

const ModelStack = StackNavigator({
  Home: { screen: Login },
  Profile: { screen: Profile },
  Signup: {screen: Signup },
  Calendar: {screen: Calendar },
  Employees: {screen: Employees },
  Clients: {screen: Clients },
  NavBar: {screen: NavBar },
  NewEmployee: {screen: NewEmployee }
}, {
    navigationOptions: {
      header: false,
    }
});

export default class App extends Component<{}> {
  render() {
    return (
      <ModelStack />
    );
  }
}
