// Importing necessary React and React Native libraries and components
import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // For local data persistence
import { useNavigation } from '@react-navigation/native'; // Navigation hook for moving between screens
import { HistoryScreenNavigationProp } from './navigation/AppNavigator'; // Type for navigation

// Defining interfaces for the structure of a product and saved shopping list
interface Product {
    product: string;
    description: string;
    bought: boolean;
}

interface SavedList {
    date: string;
    products: { [category: string]: Product[] };
}

// Main component for displaying saved shopping lists
const HistoryScreen = () => {
    const navigation = useNavigation<HistoryScreenNavigationProp>(); // Navigation hook to enable moving to ShopScreen
    const [savedLists, setSavedLists] = useState<SavedList[]>([]); // State to store lists of saved shopping trips

    // Load saved lists from AsyncStorage when the component is mounted
    useEffect(() => {
        loadSavedLists();
    }, []);

    // Function to load saved lists from AsyncStorage
    const loadSavedLists = async () => {
        try {
            const lists = await AsyncStorage.getItem('savedLists');
            if (lists !== null) {
                setSavedLists(JSON.parse(lists)); // Parse and set saved lists into the state
            }
        } catch (error) {
            console.log('Error loading saved lists:', error);
        }
    };

    // Function to clear all saved lists from AsyncStorage and reset state
    const clearHistory = async () => {
        Alert.alert(
            "Confirm Deletion", // Alert title
            "Are you sure you want to delete all saved lists?", // Alert message
            [
                { text: "Cancel", style: "cancel" }, // Option to cancel the deletion
                {
                    text: "OK", onPress: async () => {
                        try {
                            await AsyncStorage.removeItem('savedLists'); // Remove the 'savedLists' from storage
                            setSavedLists([]); // Clear the state
                            alert('History cleared successfully!');
                        } catch (error) {
                            console.log('Error clearing history:', error);
                        }
                    }
                }
            ]
        );
    };

    // Function to delete a specific list by its index
    const deleteList = async (index: number) => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete this list?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK", onPress: async () => {
                        const updatedLists = [...savedLists]; // Make a copy of the current saved lists
                        updatedLists.splice(index, 1); // Remove the list at the given index
                        setSavedLists(updatedLists); // Update state with the modified list
                        await AsyncStorage.setItem('savedLists', JSON.stringify(updatedLists)); // Save the updated list in storage
                    }
                }
            ]
        );
    };

    // Function to navigate to the ShopScreen with the selected list's details
    const openList = (list: SavedList) => {
        navigation.navigate('Shop', { savedList: list }); // Pass the selected list to ShopScreen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Saved Lists</Text>
            <ScrollView>
                {savedLists.length > 0 ? (
                    // Map over the saved lists and display each one
                    savedLists.map((list, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            {/* List item with date and number of categories */}
                            <TouchableOpacity
                                style={styles.listItem}
                                onPress={() => openList(list)} // Open the selected list when clicked
                            >
                                <Text style={styles.listText}>Date: {list.date}</Text>
                                <Text style={styles.listText}>
                                    Items: {Object.keys(list.products).length} categories
                                </Text>
                            </TouchableOpacity>
                            {/* Delete button to remove a specific list */}
                            <TouchableOpacity style={styles.deleteButton} onPress={() => deleteList(index)}>
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noListsText}>No saved lists found</Text> // Displayed if no lists are saved
                )}
            </ScrollView>
            {/* Button to clear all saved lists */}
            <TouchableOpacity onPress={clearHistory} style={styles.clearButton}>
                <Text style={styles.clearButtonText}>Clear All History</Text>
            </TouchableOpacity>
        </View>
    );
};

// Defining styles for the HistoryScreen components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f9f9f9', // Light background for the screen
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 15,
        shadowColor: '#000', // Shadow styling for a card effect
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 10,
        elevation: 5, // Elevation for Android shadow
    },
    listItem: {
        flex: 1, // Allows the list item to expand and fill available space
    },
    listText: {
        fontSize: 18,
        color: '#555', // Gray text color
    },
    deleteButton: {
        backgroundColor: '#ff4e4e', // Red color for the delete button
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    noListsText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#888', // Gray color for the text indicating no lists
        marginVertical: 20,
    },
    clearButton: {
        backgroundColor: '#ff4e4e', // Red color for the clear all button
        paddingVertical: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default HistoryScreen;
