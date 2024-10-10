// Importing React library to use JSX and create components
import React from 'react';

// Importing the 'registerRootComponent' from Expo to register the main component as the root component
import { registerRootComponent } from 'expo';

// Importing the AppNavigator component from its relative path
import AppNavigator from '../components/navigation/AppNavigator';

// Main App component definition
const App = () => {
    // This component simply renders the AppNavigator, which manages the navigation between screens
    return <AppNavigator />;
};

// Exporting the App component as the default export
export default App;

// Registering the App component as the root component so that it becomes the entry point of the application
registerRootComponent(App);
