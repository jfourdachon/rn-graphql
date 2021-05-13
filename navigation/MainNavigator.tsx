import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HomeScreen from '../screens/HomeScreen';
import HealthyMealScreen from '../screens/HealthyMealScreen';
import { Ionicons } from '@expo/vector-icons';
import BreakfastScreen from '../screens/recipe/BreakfastScreen';
import SnackScreen from '../screens/recipe/Snack';
import MealScreen from '../screens/recipe/MealScreen';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export type MainNavParam = {
  Home: undefined;
  HealthyMeal: undefined;
  Recipe: undefined;
};

const RecipeTopTabNavigator = createMaterialTopTabNavigator();

const RecipeNavigator = () => {
  return (
    <RecipeTopTabNavigator.Navigator>
      <RecipeTopTabNavigator.Screen
        name='Breakfast'
        component={BreakfastScreen}
      />
      <RecipeTopTabNavigator.Screen name='Snack' component={SnackScreen} />
      <RecipeTopTabNavigator.Screen name='Meal' component={MealScreen} />
    </RecipeTopTabNavigator.Navigator>
  );
};

const MainTabNavigator = createMaterialBottomTabNavigator<MainNavParam>();

export const MainNavigator = () => {
  return (
    <MainTabNavigator.Navigator
      activeColor='#3e2465'
      inactiveColor='#f0edf6'
      barStyle={{
        backgroundColor: '#8e86a1',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
      }}
      labeled={false}
    >
      <MainTabNavigator.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-home' color={color} size={26} />
          ),
        }}
      />
      <MainTabNavigator.Screen
        name='HealthyMeal'
        component={HealthyMealScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-leaf-outline' color={color} size={26} />
          ),
        }}
      />
      <MainTabNavigator.Screen
        name='Recipe'
        component={RecipeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-book-outline' color={color} size={26} />
          ),
        }}
      />
    </MainTabNavigator.Navigator>
  );
};
