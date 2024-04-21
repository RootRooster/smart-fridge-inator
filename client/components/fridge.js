import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckBox} from '@react-native-community/checkbox';
import React, { useState, useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import SelectDropdown from 'react-native-select-dropdown';



const FridgeListScreen = ({navigation, route}) => {
    const filterCategories = ['All', 'Vegetable', 'Meat', 'Dairy'];
    const [selectedFilter, setSelectedFilter] = useState('All');
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      fetchIngredients();
    }, []);
  
    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://fridge.montalabs.com/meals/ingredients/');
        const data = await response.json();
  
        // Extract ingredients from the first 10 items
        const ingredientList = data.slice(20, 40).flatMap((item) => item);
  
        setIngredients(ingredientList);
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    console.log(ingredients);
  
    
    // const filteredIngredients = (selectedFilter == 'All' ? ingredients : ingredients.filter(item => item.category === selectedFilter));
    
    // console.log(filteredIngredients);

    const renderIngredientItem = ({ item }) => (
        // <CheckBox
        //     style={styles.itemText}
        //     checked={item.checked}
        //     onPress={() => this.checkThisBox(item.id)}
        // />
        <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name}</Text>
        </TouchableOpacity>
    );
    
    return (
      <View style={styles.container}>
        <Text style={styles.title} >Items in fridge</Text>
        <FlatList
          data={ingredients}
          renderItem={renderIngredientItem}
        //   keyExtractor={item => item.name}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterText: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    justifyContent: 'center',
    height: 40,
  },
  dropdownButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
  },
  dropdownRow: {
    backgroundColor: '#f2f2f2',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  dropdownRowText: {
    fontSize: 16,
    textAlign: 'left',
    marginVertical: 10,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
  },
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    // marginBottom: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
});


export default FridgeListScreen;