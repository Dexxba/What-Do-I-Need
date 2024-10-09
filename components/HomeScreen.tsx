import React from 'react';
import { View, Text, Button } from 'react-native';


const HomeScreen =({ navigation }: { navigation: any }) => {
    return (
        <View>
            <Text>Welcome to "What do i need"</Text>
            <Button title="Start SHopping" onPress={() => navigation.navigate('Shop')} />
            <Button title="View Purches History" onPress={() => navigation.navigate('History')} />
        </View>
    );
};

export default HomeScreen;