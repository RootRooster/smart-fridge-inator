import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';


const recipeIds = ['1', '2', '3', '4', '5'];

const foodItems = [
  { id: '1', name: 'Apple' },
  { id: '2', name: 'Banana' },
  { id: '3', name: 'Orange' },
  { id: '4', name: 'Strawberry' },
  { id: '5', name: 'Mango' },
];

const FoodList = () => {
    const renderFoodItem = ({ item }) => (
        <View style={{ padding: 10 }}>
        <Text>{item.name}</Text>
        </View>
    );

    return (
        <View>
        <FlatList
            data={foodItems}
            renderItem={renderFoodItem}
            keyExtractor={item => item.id}
        />
        </View>
    );
};

const ImageGallery = () => {
    const navigation = useNavigation();
    const [meals, setMeals] = useState([]);

    useEffect(() => {
      fetchMeals();
    }, []);
  
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://fridge.montalabs.com/meals/meals/');
        const data = await response.json();
  
        // Extract ingredients from the first 10 items
        const mealsList = data.slice(0, 20).flatMap((item) => item);
  
        setMeals(mealsList);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
  
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {meals.map((meal, index) => (
            <TouchableOpacity 
            style={styles.button}
            onPress={() =>
                navigation.navigate('Recipe', {id: meal.tmdb_id})
            }
            >
            <View key={index} style={styles.imageContainer}>
                <Image source={{ uri: meal.image_url }} style={styles.image} />
                <Text style={styles.title}>{meal.name}</Text>
                {/* <Text>Description</Text> */}
            </View>
            </TouchableOpacity>
        ))}
      </ScrollView>
    );
  };

const RecipePage = ({navigation, route}) => {
    return (
        <View>
            <Text>Recepie ID: {route.params.id}</Text>
        </View>
    ); 
    // <Text>Recepie ID: {route.params.id}</Text>;
}

// recommended, filtri (azijska, ), => recept
const RecipeScreen = ({navigation, route}) => {
return (
    <View>
        <ImageGallery />
    </View>
); 
// <Text>Recepie ID: {route.params.id}</Text>;
};

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 20,
    },
    imageContainer: {
      marginBottom: 20,
      alignItems: 'center',
    },
    image: {
      width: '90%',
      height: 300,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });

export default RecipeScreen;