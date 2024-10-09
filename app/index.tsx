import React from 'react';
import { registerRootComponent } from 'expo';
import AppNavigator from '../components/navigation/AppNavigator';



const App = () =>{
    return <AppNavigator/>;
};

export default App;
registerRootComponent(App)