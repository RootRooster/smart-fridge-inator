import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CalendarPicker from "react-native-calendar-picker";

import React, { Component } from 'react';

export default class MealPlanScreen extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedStartDate: null,
      };
      this.onDateChange = this.onDateChange.bind(this);
    }
  
    onDateChange(date) {
      this.setState({
        selectedStartDate: date,
      });
    }
    render() {
      const { selectedStartDate } = this.state;
      const startDate = selectedStartDate ? selectedStartDate.toString() : '';
      return (
        <View style={styles.container}>
            <Text>Meal Plan</Text>
          <CalendarPicker
            onDateChange={this.onDateChange}
          />
  
          <View>
            <Text>SELECTED DATE:{ startDate }</Text>
          </View>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
  });
// const MealPlanScreen = ({navigation}) => {
//     constructor(props) {
//         super(props);
//         this.state = {
//           selectedStartDate: null,
//         };
//         this.onDateChange = this.onDateChange.bind(this);
//       }
    
//       onDateChange(date) {
//         this.setState({
//           selectedStartDate: date,
//         });
//       }
//       render() {
//         const { selectedStartDate } = this.state;
//         const startDate = selectedStartDate ? selectedStartDate.toString() : '';
//         return (
//           <View style={styles.container}>
//             <CalendarPicker
//               onDateChange={this.onDateChange}
//             />
    
//             <View>
//               <Text>SELECTED DATE:{ startDate }</Text>
//             </View>
//           </View>
//         );
//       }
//   };


// export default MealPlanScreen;