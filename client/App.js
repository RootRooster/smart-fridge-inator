import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';

import MealPlanScreen from './components/mealplan';
import ShoppingListScreen from './components/shoppinglist';
import FridgeScreen from './components/fridge';
import RecipeScreen from './components/recipes';
import RecipePage from './components/recipe';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.button}            
            onPress={() =>
              navigation.navigate('Shopping List', {id: '100'})
            }
          >
            <Text style={styles.buttonText}>Shopping List</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() =>
            navigation.navigate('Recipes')
          }
        >
        <Text style={styles.buttonText}>Recipes from ingredients</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() =>
          navigation.navigate('Meal Plan')
        }
        >
        <Text style={styles.buttonText}>Meal plan</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() =>
            navigation.navigate('Fridge')
          }
        >
          <Text style={styles.buttonText}>Fridge</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // recepti, meal plan, shopping list
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'SFI'}}
        />
        <Stack.Screen name="Shopping List" component={ShoppingListScreen} />
        <Stack.Screen name="Fridge" component={FridgeScreen} />
        <Stack.Screen name="Recipes" component={RecipeScreen}/>
        <Stack.Screen name="Recipe" component={RecipePage}/>
        <Stack.Screen name="Meal Plan" component={MealPlanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
    marginTop: 0,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    margin: 10,
    width: '48%',
    height: 100,
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    padding: 10,
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
