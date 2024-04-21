import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, ScrollView, Image, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import React, { useState, useEffect } from 'react';

function get_ingrediend(url) {

}

const RecipePage = ({navigation, route}) => {
  const recipe = {
    title: 'Delicious Pasta Dish',
    description: 'This is a mouth-watering pasta dish that will leave you craving for more. It combines perfectly cooked pasta with a rich and flavorful sauce, creating a satisfying and comforting meal.',
    ingredients: [
      '8 oz pasta',
      '1 tbsp olive oil',
      '2 cloves garlic, minced',
      '1 cup tomato sauce',
      '1/2 cup heavy cream',
      '1/4 cup grated Parmesan cheese',
      'Fresh basil leaves',
      'Salt and pepper to taste',
    ],
    image: 'https://example.com/pasta-dish.jpg',
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const [meal, setMeal] = useState({name: "", instructions: "", amount_ingredients_str: []});

  const fetchMeals = async () => {
    try {
      const response = await fetch('https://fridge.montalabs.com/meals/meals/');
      const data = await response.json();
      setMeal(data.results.filter((item) => item.tmdb_id === route.params.id)[0]);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };
  console.log(meal);

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: meal.image_url }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{meal.name}</Text>
        <Text style={styles.description}>{meal.instructions}</Text>
        <Text style={styles.ingredientsTitle}>Ingredients:</Text>
        {meal.amount_ingredients_str.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            - {ingredient}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  ingredientsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default RecipePage;