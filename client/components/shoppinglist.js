import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {CheckBox} from '@react-native-community/checkbox';
import React, { useState, useEffect } from 'react';

import {NavigationContainer} from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import SelectDropdown from 'react-native-select-dropdown';



const ShoppingListScreen = ({navigation, route}) => {
    const filterCategories = ['All', 'Vegetable', 'Meat', 'Dairy'];
    const [selectedFilter, setSelectedFilter] = useState('All');
    // const [ingredients, setIngredients] = useState([
    //   { id: '1', name: 'Tomato', category: 'Vegetable', checked:false },
    //   { id: '2', name: 'Chicken', category: 'Meat', checked:false },
    //   { id: '3', name: 'Cheese', category: 'Dairy', checked:false },
    //   { id: '4', name: 'Garlic', category: 'Vegetable', checked:false },
    //   { id: '5', name: 'Beef', category: 'Meat', checked:false },
    //   { id: '6', name: 'Milk', category: 'Dairy', checked:false },
    // ]);

    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
      fetchIngredients();
    }, []);
  
    const fetchIngredients = async () => {
      try {
        const response = await fetch('https://fridge.montalabs.com/meals/ingredients/');
        const data = await response.json();
  
        // Extract ingredients from the first 10 items
        const ingredientList = data.slice(0, 20).flatMap((item) => item);
  
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
    //     <View style={styles.filterContainer}>
    //     <Text style={styles.filterText}>Filter by Category:</Text>
    //     <Picker
    //       selectedValue={selectedFilter}
    //       onValueChange={(itemValue) => setSelectedFilter(itemValue)}
    //       style={styles.picker}
    //     >
    //       {filterCategories.map(category => (
    //         <Picker.Item key={category} label={category} value={category} />
    //       ))}
    //     </Picker>
    //     {/* <SelectDropdown
    //       data={filterCategories}
    //       onSelect={(selectedItem) => setSelectedFilter(selectedItem)}
    //       defaultValue={selectedFilter}
    //       buttonTextAfterSelection={(selectedItem) => selectedItem}
    //       rowTextForSelection={(item) => item}
    //       buttonStyle={styles.dropdownButton}
    //       buttonTextStyle={styles.dropdownButtonText}
    //       rowStyle={styles.dropdownRow}
    //       rowTextStyle={styles.dropdownRowText}
    //   /> */}
    //   </View>
    
    return (
      <View style={styles.container}>
        <Text style={styles.title} >Shopping List</Text>
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


export default ShoppingListScreen;