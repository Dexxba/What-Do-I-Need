// Importing necessary React and React Native libraries and components
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns'; // Utility library for date formatting
import DateTimePicker from "@react-native-community/datetimepicker"; // For selecting dates
import AsyncStorage from '@react-native-async-storage/async-storage'; // For storing and retrieving data locally
import { Swipeable } from 'react-native-gesture-handler'; // Enables swipe actions on list items
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // For icons
import { RouteProp, useNavigation } from '@react-navigation/native'; // Navigation helpers
import { RootStackParamList } from './navigation/AppNavigator'; // Type definitions for navigation
import { useRoute } from "@react-navigation/core"; // Hook for accessing route parameters

// Type definition for route prop, defining what parameters ShopScreen can receive
type ShopScreenRouteProp = RouteProp<RootStackParamList, 'Shop'>;

// Predefined categories of items for shopping
const predefinedCategories = ['Bakery', 'Fruit', 'Vegetables', 'Drinks', 'Meat', 'Sweets', 'Frozen'];

// Function to get the appropriate icon for each category
const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'Bakery':
            return <MaterialCommunityIcons name="bread-slice" size={24} color="wheat" />;
        case 'Fruit':
            return <MaterialCommunityIcons name="fruit-cherries" size={24} color="orange" />;
        case 'Vegetables':
            return <MaterialCommunityIcons name="carrot" size={24} color="green" />;
        case 'Drinks':
            return <MaterialCommunityIcons name="cup" size={24} color="blue" />;
        case 'Meat':
            return <MaterialCommunityIcons name="food-steak" size={24} color="red" />;
        case 'Sweets':
            return <MaterialCommunityIcons name="candy" size={24} color="pink" />;
        case 'Frozen':
            return <MaterialCommunityIcons name="snowflake" size={24} color="lightblue" />;
        default:
            return <MaterialCommunityIcons name="food" size={24} color="brown" />;
    }
};

// Main component for the shopping screen
const ShopScreen = () => {
    // Access route params to check if a saved list is passed when navigating to this screen
    const route = useRoute<ShopScreenRouteProp>();
    const savedList = route.params?.savedList;

    // State variables to manage user inputs and current data
    const [category, setCategory] = useState(''); // New category input
    const [selectedCategory, setSelectedCategory] = useState(''); // Currently selected category
    const [product, setProduct] = useState(''); // New product input
    const [description, setDescription] = useState(''); // Description for the product
    const [categories, setCategories] = useState(predefinedCategories); // List of categories (default + added)
    const [products, setProducts] = useState<{ [key: string]: { product: string, description: string, bought: boolean }[] }>({}); // List of products grouped by categories
    const [date, setDate] = useState(new Date()); // Purchase date
    const [showPicker, setShowPicker] = useState(false); // Date picker visibility toggle
    const [showMenu, setShowMenu] = useState(true); // Toggle to show or hide the menu
    const navigation = useNavigation(); // Navigation object to navigate between screens

    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({}); // Refs for swipeable components

    // When a saved list is passed via navigation, populate the products and date accordingly
    useEffect(() => {
        if (savedList) {
            setProducts(savedList.products);
            setDate(new Date(savedList.date));
        }
    }, [savedList]);

    // Automatically save the data to AsyncStorage whenever categories or products are updated
    useEffect(() => {
        saveData();
    }, [categories, products]);

    // Function to load saved data from AsyncStorage (local storage)
    const loadData = async () => {
        try {
            const savedCategories = await AsyncStorage.getItem('categories');
            const savedProducts = await AsyncStorage.getItem('products');
            if (savedCategories !== null) {
                setCategories(JSON.parse(savedCategories));
            }
            if (savedProducts !== null) {
                setProducts(JSON.parse(savedProducts));
            }
        } catch (error) {
            console.log('Failed to load data from storage', error);
        }
    };

    // Function to save current categories and products into AsyncStorage
    const saveData = async () => {
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(categories));
            await AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (error) {
            console.log('Failed to save data to storage', error);
        }
    };

    // Function to save the current shopping list to AsyncStorage
    const saveList = async () => {
        try {
            const list = {
                date: format(date, 'dd-MM-yyyy'),
                products: products,
            };
            const savedLists = await AsyncStorage.getItem('savedLists');
            const parsedLists = savedLists ? JSON.parse(savedLists) : [];
            parsedLists.push(list);
            await AsyncStorage.setItem('savedLists', JSON.stringify(parsedLists));
            alert('List saved successfully!');
        } catch (error) {
            console.log('Error saving the list:', error);
        }
    };

    // Function to clear all input fields and reset the screen
    const clearData = () => {
        Alert.alert(
            "Confirm Clear",
            "Are you sure you want to clear the current inputs?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Clear cancelled"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: () => {
                        setCategories(predefinedCategories);
                        setProducts({});
                        setSelectedCategory('');
                        setProduct('');
                        setDescription('');
                        console.log("Shop window cleared");
                    }
                }
            ],
            { cancelable: false }
        );
    };

    // Function to add a new product to the selected category
    const addProduct = () => {
        if (selectedCategory !== '' && product !== '') {
            const newProducts = [...(products[selectedCategory] || []), { product, description, bought: false }];
            setProducts({ ...products, [selectedCategory]: newProducts });
            setProduct('');
            setDescription('');
        }
    };

    // Function to add a new category to the list
    const addCategory = () => {
        if (category !== '' && !categories.includes(category)) {
            setCategories([...categories, category]);
            setCategory('');
        }
    };

    // Render the right swipeable action to mark a product as bought
    const renderRightActions = () => (
        <View style={[styles.swipeActionFull, {
            backgroundColor: 'green',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }]}>
            <MaterialCommunityIcons name="check-circle" size={24} color="white" />
            <Text style={styles.swipeActionText}>Bought</Text>
        </View>
    );

    // Render the left swipeable action to remove a product
    const renderLeftActions = () => (
        <View style={[styles.swipeActionFull, {
            backgroundColor: 'red',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
        }]}>
            <MaterialCommunityIcons name="trash-can" size={24} color="white" />
            <Text style={styles.swipeActionText}>Remove</Text>
        </View>
    );

    // Handle swipe right action (mark product as bought)
    const handleSwipeRight = (category: string, index: number) => {
        const updatedProducts = products[category].map((item, i) => {
            if (i === index) {
                return { ...item, bought: true };
            }
            return item;
        });
        setProducts({ ...products, [category]: updatedProducts });
        swipeableRefs.current[`${category}-${index}`]?.close();
    };

    // Handle swipe left action (remove product)
    const handleSwipeLeft = (category: string, index: number) => {
        const updatedProducts = products[category].filter((_, i) => i !== index);
        const newProducts = { ...products, [category]: updatedProducts };
        setProducts(newProducts);
        swipeableRefs.current[`${category}-${index}`]?.close();
    };

    return (
        <ScrollView style={styles.container}>
            {/* Clear all data button */}
            <TouchableOpacity style={styles.clearButton} onPress={clearData}>
                <Text style={styles.clearButtonText}>Clear All Data</Text>
            </TouchableOpacity>

            {/* Toggle menu visibility button */}
            <TouchableOpacity style={styles.toggleButton} onPress={() => setShowMenu(!showMenu)}>
                <Text style={styles.toggleButtonText}>{showMenu ? 'Hide Menu' : 'Show Menu'}</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Save Your List for Later</Text>

            {/* Save list button */}
            <TouchableOpacity style={styles.saveButton} onPress={saveList}>
                <Text style={styles.saveButtonText}>Save List</Text>
            </TouchableOpacity>

            {/* Conditional rendering for the menu */}
            {showMenu && (
                <>
                    {/* Date selection section */}
                    <Text style={styles.sectionTitle}>Pick Purchase Date:</Text>
                    <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(true)}>
                        <Text style={styles.dateButtonText}>{format(date, 'dd-MM-yyyy')}</Text>
                    </TouchableOpacity>
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowPicker(false);
                                if (selectedDate) {
                                    setDate(selectedDate);
                                }
                            }}
                        />
                    )}

                    {/* Category selection or addition */}
                    <Text style={styles.sectionTitle}>Choose or Add Category:</Text>
                    <ScrollView horizontal={true} style={styles.categoryScroll}>
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedCategory(item)}
                                style={[styles.categoryButton, selectedCategory === item ? styles.selectedCategory : {}]}
                            >
                                {getCategoryIcon(item)}
                                <Text style={styles.categoryButtonText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Input for adding a new category */}
                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="Add new category"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addCategory}>
                        <Text style={styles.addButtonText}>Add Category</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Conditional rendering for adding products */}
            {selectedCategory !== '' && showMenu && (
                <>
                    <Text style={styles.sectionTitle}>Add Product to {selectedCategory}:</Text>
                    <TextInput
                        value={product}
                        onChangeText={setProduct}
                        placeholder="Enter product name"
                        style={styles.input}
                    />
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description (optional)"
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.addButton} onPress={addProduct}>
                        <Text style={styles.addButtonText}>Add Product</Text>
                    </TouchableOpacity>
                </>
            )}

            {/* Product display and swipe actions */}
            <ScrollView horizontal={false} style={styles.productScroll}>
                {Object.keys(products).map((cat) => (
                    <View key={cat} style={styles.productCategory}>
                        <Text style={styles.categoryTitle}>{getCategoryIcon(cat)} {cat}:</Text>
                        {products[cat].map((item, index) => (
                            <Swipeable
                                key={index}
                                ref={(ref) => swipeableRefs.current[`${cat}-${index}`] = ref}
                                renderRightActions={renderRightActions}
                                renderLeftActions={renderLeftActions}
                                onSwipeableRightOpen={() => handleSwipeRight(cat, index)}
                                onSwipeableLeftOpen={() => handleSwipeLeft(cat, index)}
                            >
                                <View style={[styles.productItem, item.bought ? styles.boughtItem : {}]}>
                                    <MaterialCommunityIcons name="cart" size={20} color="black" />
                                    <Text style={[styles.productText, item.bought ? styles.boughtText : {}]}>
                                        {item.product} <Text style={styles.productDescription}>({item.description})</Text>
                                    </Text>
                                </View>
                            </Swipeable>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </ScrollView>
    );
};

// Styles for various components in the screen
const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    clearButton: {
        backgroundColor: 'red',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    clearButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    toggleButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    toggleButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    saveButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dateButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        textAlign: 'center',
    },
    dateButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    categoryScroll: {
        maxHeight: 60,
        marginBottom: 20,
    },
    categoryButton: {
        backgroundColor: '#d3d3d3',
        padding: 10,
        borderRadius: 20,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedCategory: {
        backgroundColor: '#007bff',
    },
    categoryButtonText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#000',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
    },
    addButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    productScroll: {
        maxHeight: 900,
    },
    productCategory: {
        marginTop: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    productItem: {
        padding: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
    },
    productText: {
        fontSize: 16,
        marginLeft: 8,
    },
    productDescription: {
        fontSize: 14,
        fontStyle: 'italic',
    },
    boughtItem: {
        backgroundColor: '#e0ffe0',
    },
    boughtText: {
        textDecorationLine: 'line-through',
        color: 'green',
    },
    swipeActionFull: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 5,
    },
    swipeActionText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default ShopScreen;
