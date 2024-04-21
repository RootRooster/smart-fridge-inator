import { StatusBar } from 'expo-status-bar';

// Navigation
import { StyleSheet, Text, View, Button, FlatList, TouchableOpacity } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {NavigationContainer} from '@react-navigation/native';

import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import LinearGradient from 'react-native-gradients';

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
        <View style={styles.navigationBar}>
          <Text style={styles.navigationIcon}><FontAwesome6 name="rocket" size={30} color={'white'}/></Text>
          <Text style={styles.navigationIcon}><FontAwesome6 name="shopping-basket" size={30} color={'white'}/></Text>
          <Text style={styles.navigationIcon}><FontAwesome6 name="git" size={30} color={'white'}/></Text>
        </View>
      </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  navigationBar: {
    backgroundColor: '#020202',
    color: '#fff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  navigationIcon: {
    color: '#fff',
    fontSize: 20,
    marginHorizontal: 30,
  },
  container: {
    flex: 1,
    backgroundColor: '#FF9900',
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
