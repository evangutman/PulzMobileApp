/*---------
--Author:
--Evan Gutman
---------------
---------------
--Date Started:
--2/26/18
---------------
----------------
--Date Last Modified:
--03/05/18
----------------
----------------
--Version:
--Alpha 1.0
----------------

TODO: 1. Make time and repeat modal
      2. Make client/employee selection pages
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
  DatePickerIOS,
  ScrollView,
  Modal,
  Picker,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class NewCalendarEvent extends Component<{}> {

  constructor(props) {
    super(props);
    this.state = {
      chosenDate: new Date(),
      dateModalVisible: false,
      specificTime: 'None',
      timeModalVisible: false,
      repeat: 'Never',
      repeatModalVisible: false,
      service: '',
      specialNotes: ''
    }
  }

  setModalVisible(selected, visible){
    if (selected == 'dateModal'){
      this.setState({
        dateModalVisible: visible
      });
    } else if (selected == 'timeModal'){
      this.setState({
        timeModalVisible: visible
      });
    } else if (selected == 'repeatModal'){
      this.setState({
        repeatModalVisible: visible
      });
    }
  }



  render() {
    return(

      <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>

        <ScrollView style = {styles.container}>

          <TouchableOpacity style = {styles.selectors} onPress = { () => {this.setModalVisible('dateModal', true)}}>
            <Text style = {{textDecorationLine: 'underline'}}>Date:    {this.state.chosenDate.toString().slice(0,16)}</Text>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.selectors} onPress = { () => {this.setModalVisibility('timeModal', true)}}>
            <Text style = {{textDecorationLine: 'underline'}}>Specific Time:    {this.state.specificTime}</Text>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.selectors} onPress = { () => {this.setModalVisibility('repeatModal', true)}}>
            <Text style = {{textDecorationLine: 'underline'}}>Repeat:    {this.state.repeat}</Text>
          </TouchableOpacity>


          <View flexDirection = {'row'} style = {styles.selectors}>
            <Text>Service Type:    </Text>
            <TextInput
              placeholder = 'Enter Service Here...'
              onChangeText = { (serviceName) => this.setState({service: serviceName})}
            />
          </View>

          <View flexDirection = {'row'} style = {styles.selectors}>
            <Text>Special Notes:    </Text>
            <TextInput
              placeholder = 'Type Any Notes for this Customer Here...'
              onChangeText = { (serviceName) => this.setState({service: serviceName})}
              miltiline = {true}
            />
          </View>

          {/*Modal used for date selection*/}
          <Modal
            animationType = 'slide'
            visible = {this.state.dateModalVisible}
            transparent = {true}
          >
            <View backgroundColor = {'#00000080'} margin = {10}>
              <View backgroundColor = {'#fff'} padding = {20}>
                <DatePickerIOS
                  date={this.state.chosenDate}
                  onDateChange={(date) => this.setState({chosenDate: date})}
                  mode = 'date'
                />
                <TouchableOpacity onPress = { () => {this.setModalVisible('repeatModal', false)}} style = {{alignSelf: 'center'}}>
                  <Text>Set Date</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>


          {/*Modal used for time selection will go here*/}



          <TouchableOpacity style = {styles.botton} onPress = {this.submit}>

            <View>
              <Text>Schedule Event</Text>
            </View>

          </TouchableOpacity>

        </ScrollView>

      </KeyboardAvoidingView>

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  container: {
    flex: 1,
  },
  botton: {
    alignSelf: 'stretch',
    backgroundColor: '#d5928d',
    padding: 20,
    alignItems: 'center'
  },
  selectors: {
    padding: 20,
    flexDirection: 'row'
  },
  modals: {
    backgroundColor: 'white',
    margin: 15,
    alignItems: 'center',
    justifyContent: undefined
  }
});
