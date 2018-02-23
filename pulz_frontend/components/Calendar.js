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
--02/13/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

TODO: check if loaded items for month already. ****maybe not
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
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { CalendarList, Agenda } from 'react-native-calendars';

export default class Calendar extends Component<{}> {

  constructor(props){
    super(props);
    this.state = {
      //SELECT EXTRACT(YEAR_MONTH FROM "2017-06-15 09:34:21");
      month: '',
      emp: '',
      items: {}
    }
  }

  componentWillMount(){
    //var formatDate = (this.state.date.getFullYear() + 1) + '-' + (this.state.date.getMonth() + 1) + '-' + (this.state.date.getDate());
    //console.log("date from componentWillMount:" + formatDate);
    AsyncStorage.getItem('user').then( (value) => this.setState({emp: value})) //.then(this.loadMonthItems(formatDate));
  }


  loadMonthItems(theDate) {
    //adjusting for javascript date object
    if(theDate == 12){
      theDate = 1;
    } else {
      theDate++;
    }

    console.log("LoadMonthItems says: " + theDate);
    this.setState({month: String(theDate)});

    return fetch('http://127.0.0.1:3000/calendar', {
      method: 'POST',
      headers: {
        'Accept': 'Application/json',
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        emp: this.state.emp,
        month: this.state.month
      })
    })
    .then( (response) => response.json())
    .then( (res) => {
      console.log(res.message);
      var dat = res.message;
      var obj = {}
      for (i = 0; i < dat.length; i++) {
        tempDate = dat[i]['date'];
        tempDate = tempDate.slice(0,10);

        if (obj.hasOwnProperty(tempDate)){  //if date already exists in object, append to value array
          obj[tempDate].push({apt_ID: dat[i]['apt_ID'], b_ID: dat[i]['b_ID'], e_ID: dat[i]['e_ID'], c_ID: dat[i]['c_ID'], details: dat[i]['details']});
        } else {
          obj[tempDate] = [{apt_ID: dat[i]['apt_ID'], b_ID: dat[i]['b_ID'], e_ID: dat[i]['e_ID'], c_ID: dat[i]['c_ID'], details: dat[i]['details']}];
        }

      }
      console.log(obj);
      this.setState({
        items: Object.assign({}, this.state.items, obj)
      })
      console.log(this.state.items);
    })
    .done();

  }


  render() {
    //this.loadMonthItems(month['month'])
    return(
      <View style = {styles.container}>
        <Agenda
          items = {this.state.items}
          loadItemsForMonth = { (month) => {this.loadMonthItems(month['month'])} }
          onDayPress = { (day) => {console.log("day pressed")}}
          renderItem={(item, firstItemInDay) => {
            return (
              <View >
                <Text>{item.text}</Text>
              </View>);}}
          rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
          renderEmptyDate={() => {return (<View><Text>No Jobs Scheduled Today</Text></View>);}}
          renderEmptyData = {() => {return (<View><Text>No Jobs Scheduled Today</Text></View>);}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
