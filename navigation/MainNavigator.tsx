import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import HealthyMealScreen from '../screens/HealthyMealScreen';
import RecipeScreen from '../screens/RecipeScreen';
import { Ionicons } from '@expo/vector-icons';

export type MainNavParam = {
  Home: undefined;
  HealthyMeal: undefined;
  Recipe: undefined;
};
const MainTabNavigator = createMaterialBottomTabNavigator<MainNavParam>();

export const MainNavigator = () => {
  return (
    <MainTabNavigator.Navigator
      activeColor='#3e2465' 
      inactiveColor='#f0edf6'
      barStyle={{ backgroundColor: '#8e86a1', borderRadius: 40 }}
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
        component={RecipeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='ios-book-outline' color={color} size={26} />
          ),
        }}
      />
    </MainTabNavigator.Navigator>
  );
};
