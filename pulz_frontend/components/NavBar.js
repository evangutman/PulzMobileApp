/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/1/18
---------------
----------------
--Date Last Modified:
--03/5/18
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
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';

import Login from './Login';
import Signup from './Signup';
import Todo from './Todo';
import Calendar from './Calendar';
import Employees from './Employees';
import Clients from './Clients';
import NewEmployee from './NewEmployee';
import NewCalendarEvent from './NewCalendarEvent';
import NewClient from './NewClient';
import EmployeeProfile from './EmployeeProfile';

export default class NavBar extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    }
  }

  componentDidMount() {
    this.loadInitialState;
  }

  loadInitialState = async() => {
    var checkedState = this.AsyncStorage.getItem('user');
    if (checkedState !== null) {
      this.setState({
        loggedIn: true
      });
      Actions.todo();
    }
  }

  render () {

    loginSelector = () => {
      this.state.loggedIn ? 'login' : 'todo';
    }

    TabIcon = ({ selected, name }) => {
      return (
        <Icon style = {{color : selected ? 'red' : 'black'}} name = {name} />
      );
    }

    return(

      <Router>

        <Scene key = 'root' hideNavBar = {true} selector = {loginSelector}>

          <Scene
            key = 'login'
            title = 'Login'
            component = {Login}
            initial = {true}
          />

          <Scene
            key = 'signup'
            title = 'Sign Up'
            component = {Signup}
            />

          <Scene key = 'tabbar' tabs = {true} tabBarStyle = {{ backgroundColor: '#FFFFFF'}}>

            <Scene key = 'todo' title = 'TODO' name = 'bars' icon = {TabIcon}>

                <Scene
                  component = {Todo}
                />

            </Scene>

            <Scene key = 'cal' title = 'Calendar' name = 'calendar' icon = {TabIcon}>

                <Scene
                  component = {Calendar}
                  renderRightButton = {
                    <TouchableOpacity
                      style = {styles.addEmployees}
                      onPress = { () => Actions.addEvent()}
                    >
                    <Text>+</Text>
                    </TouchableOpacity>
                  }
                  initial = {true}
                />

                <Scene
                  key = 'addEvent'
                  title = 'Add an Event'
                  component = {NewCalendarEvent}
                  renderRightButton = {
                    <TouchableOpacity
                      style = {styles.addEmployees}
                      onPress = { () => Actions.pop()}
                    >
                    <Text>Cancel</Text>
                    </TouchableOpacity>
                  }
                />

            </Scene>

            <Scene key = 'emp' title = 'Employees' name = 'user-circle-o' icon = {TabIcon}>

                <Scene
                  key = 'emplist'
                  component = {Employees}
                  renderRightButton = {
                    <TouchableOpacity
                      style = {styles.addEmployees}
                      onPress = { () => Actions.addEmp()}
                    >
                    <Text>+</Text>
                    </TouchableOpacity>
                  }
                  initial = {true}
                />

                <Scene
                  key = 'addEmp'
                  component = {NewEmployee}
                />

                <Scene
                  key = 'empProf'
                  component = {EmployeeProfile}
                />

            </Scene>

            <Scene key = 'cli' title = 'Clients' name = 'address-book-o' icon = {TabIcon}>

                <Scene
                  key = 'clilist'
                  component = {Clients}
                  renderRightButton = {
                    <TouchableOpacity
                      style = {styles.addEmployees}
                      onPress = { () => Actions.addClient()}
                    >
                    <Text>+</Text>
                    </TouchableOpacity>
                  }
                  initial = {true}
                />

                <Scene
                  key = 'addClient'
                  component = {NewClient}
                />

            </Scene>

          </Scene>

        </Scene>

      </Router>
    );
  }
}



const styles = StyleSheet.create({
  addEmployees: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 20,
  }
});
