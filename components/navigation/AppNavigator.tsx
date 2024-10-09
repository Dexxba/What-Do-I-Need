import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen';
import ShopScreen from '../ShopScreen';
import HistoryScreen from '../HistoryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Shop" component={ShopScreen}/>
            <Stack.Screen name="History" component={HistoryScreen}/>
        </Stack.Navigator>
    );
};

export default AppNavigator;