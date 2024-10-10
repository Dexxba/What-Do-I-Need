// Importing necessary libraries and components from React Native and the icon library
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Icon library for UI enhancement

// Main HomeScreen component
const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            {/* Displaying an icon at the top of the screen */}
            <MaterialCommunityIcons name="cart-outline" size={80} color="#007bff" />

            {/* Displaying the main title of the app */}
            <Text style={styles.title}>Welcome to "What do I need"</Text>

            {/* Button to navigate to the shopping screen */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Start Shopping"
                    onPress={() => navigation.navigate('Shop')} // Navigates to the 'Shop' screen when pressed
                    color="#007bff" // Primary blue color for consistency with the icon
                />
            </View>

            {/* Button to navigate to the purchase history screen */}
            <View style={styles.buttonContainer}>
                <Button
                    title="View Purchase History"
                    onPress={() => navigation.navigate('History')} // Navigates to the 'History' screen when pressed
                    color="#28a745" // Green color to differentiate from the first button
                />
            </View>
        </View>
    );
};

// Defining styles for the HomeScreen using StyleSheet from React Native
const styles = StyleSheet.create({
    container: {
        flex: 1, // Makes the container take up the entire available screen space
        justifyContent: 'center', // Centers the content vertically
        alignItems: 'center', // Centers the content horizontally
        backgroundColor: '#f8f9fa', // Light background color for a clean look
        padding: 20, // Adds padding inside the container for better spacing
    },
    title: {
        fontSize: 24, // Larger font size for the main title
        fontWeight: 'bold', // Bold font to emphasize the title
        color: '#343a40', // Dark gray color for the title text
        marginBottom: 20, // Adds space below the title
        textAlign: 'center', // Centers the text horizontally
    },
    buttonContainer: {
        width: '80%', // Makes the buttons take up 80% of the screen's width
        marginBottom: 15, // Adds space below each button
    },
});

// Exporting the HomeScreen component for use in other parts of the app
export default HomeScreen;
