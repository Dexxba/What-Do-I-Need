// Importing necessary modules and components from React and React Navigation libraries
import React from 'react';
import HomeScreen from '../HomeScreen'; // Importing the HomeScreen component
import ShopScreen from '../ShopScreen'; // Importing the ShopScreen component
import HistoryScreen from '../HistoryScreen'; // Importing the HistoryScreen component
import { RouteProp } from '@react-navigation/native'; // Importing RouteProp for type safety with route parameters
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'; // Stack navigation components

// Creating a stack navigator instance
const Stack = createStackNavigator(); // Stack navigator is used to define the screen flow within the app

// Main component responsible for defining the navigation flow
const AppNavigator = () => {
    return (
        // Stack.Navigator is the container that manages the navigation between screens
        <Stack.Navigator>
            {/* Defining the "Home" screen in the navigation stack */}
            <Stack.Screen
                name="Home"
                component={HomeScreen} // Renders the HomeScreen component when this route is accessed
            />
            {/* Defining the "Shop" screen in the navigation stack */}
            <Stack.Screen
                name="Shop"
                component={ShopScreen} // Renders the ShopScreen component when this route is accessed
            />
            {/* Defining the "History" screen in the navigation stack */}
            <Stack.Screen
                name="History"
                component={HistoryScreen} // Renders the HistoryScreen component when this route is accessed
            />
        </Stack.Navigator>
    );
};

// Exporting the AppNavigator component so it can be used in other parts of the app
export default AppNavigator;
