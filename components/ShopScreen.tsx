import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Alert } from 'react-native';

const predefinedCategories = ['Bakery', 'Fruit', 'Vegetables', 'Drinks', 'Meat', 'Sweets', 'Frozen'];
// Define category icons
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

const ShopScreen = () => {
    const [category, setCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [product, setProduct] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState(predefinedCategories);
    const [products, setProducts] = useState<{ [key: string]: { product: string, description: string, bought: boolean }[] }>({});
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [showMenu, setShowMenu] = useState(true);

    const swipeableRefs = useRef<{ [key: string]: Swipeable | null }>({});

    // Load data from AsyncStorage when the component is mounted
    useEffect(() => {
        loadData();
    }, []);

    // Save data to AsyncStorage when products or categories change
    useEffect(() => {
        saveData();
    }, [categories, products]);

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

    const saveData = async () => {
        try {
            await AsyncStorage.setItem('categories', JSON.stringify(categories));
            await AsyncStorage.setItem('products', JSON.stringify(products));
        } catch (error) {
            console.log('Failed to save data to storage', error);
        }
    };

    const clearData = () => {
        Alert.alert(
            "Confirm Deletion",
            "Are you sure you want to delete all data?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Deletion cancelled"),
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await AsyncStorage.clear();
                            setCategories(predefinedCategories);
                            setProducts({});
                            setSelectedCategory('');
                            console.log("All data cleared");
                        } catch (error) {
                            console.log('Failed to clear data from storage', error);
                        }
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const addProduct = () => {
        if (selectedCategory !== '' && product !== '') {
            const newProducts = [...(products[selectedCategory] || []), { product, description, bought: false }];
            setProducts({ ...products, [selectedCategory]: newProducts });
            setProduct('');
            setDescription('');
        }
    };

    const removeProduct = (category: string, index: number) => {
        const updatedProducts = products[category].filter((_, i) => i !== index);
        const newProducts = { ...products, [category]: updatedProducts };
        if (updatedProducts.length === 0) {
            delete newProducts[category];
        }
        setProducts(newProducts);
    };

    const markAsBought = (category: string, index: number) => {
        const updatedProducts = products[category].map((item, i) => {
            if (i === index) {
                return { ...item, bought: true };
            }
            return item;
        });
        setProducts({ ...products, [category]: updatedProducts });
    };

    const addCategory = () => {
        if (category !== '' && !categories.includes(category)) {
            setCategories([...categories, category]);
            setCategory('');
        }
    };

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Swipeable actions
    const renderRightActions = () => (
        <View style={[styles.swipeActionFull, { backgroundColor: 'green', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name="check-circle" size={24} color="white" />
            <Text style={styles.swipeActionText}>Bought</Text>
        </View>
    );

    const renderLeftActions = () => (
        <View style={[styles.swipeActionFull, { backgroundColor: 'red', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
            <MaterialCommunityIcons name="trash-can" size={24} color="white" />
            <Text style={styles.swipeActionText}>Remove</Text>
        </View>
    );

    // Handle swipe gestures
    const handleSwipeRight = (category: string, index: number) => {
        markAsBought(category, index);
        swipeableRefs.current[`${category}-${index}`]?.close();
    };

    const handleSwipeLeft = (category: string, index: number) => {
        swipeableRefs.current[`${category}-${index}`]?.close();
        removeProduct(category, index);
    };

    return (
        <ScrollView style={{ padding: 20 }}>
            <Button title="Clear All Data" onPress={clearData} color="red" />
            <Button title={showMenu ? 'Hide Menu' : 'Show Menu'} onPress={() => setShowMenu(!showMenu)} />
            {showMenu && (
                <>
                    <Text style={styles.sectionTitle}>Pick Purchase Date:</Text>
                    <Button title={format(date, 'dd-MM-yyyy')} onPress={() => setShowPicker(true)} />
                    {showPicker && (
                        <DateTimePicker
                            value={date}
                            mode="date"
                            display="default"
                            onChange={onChangeDate}
                        />
                    )}
                    <Text style={styles.sectionTitle}>Choose or Add Category:</Text>

                    <ScrollView horizontal={true} style={{ maxHeight: 60, marginBottom: 20 }}>
                        {categories.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setSelectedCategory(item)}
                                style={[
                                    styles.categoryButton,
                                    selectedCategory === item ? styles.selectedCategory : {},
                                ]}
                            >
                                {getCategoryIcon(item)}
                                <Text style={styles.categoryButtonText}>{item}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <TextInput
                        value={category}
                        onChangeText={setCategory}
                        placeholder="Add new category"
                        style={styles.input}
                    />
                    <Button title="Add Category" onPress={addCategory} />
                </>
            )}

            {selectedCategory !== '' && showMenu && (
                <>
                    <Text style={styles.sectionTitle}>Add Product to {selectedCategory}:</Text>
                    <TextInput
                        value={product}
                        onChangeText={setProduct}
                        placeholder="Enter product name"
                        style={styles.input}
                    />

                    <Text style={styles.sectionTitle}>Product Description:</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Enter description (optional)"
                        style={styles.input}
                    />

                    <Button title="Add Product" onPress={addProduct} />
                </>
            )}

            <ScrollView horizontal={false} style={styles.productScroll}>
                {Object.keys(products).map((cat) => (
                    <View key={cat} style={{ marginTop: 20 }}>
                        <Text style={styles.categoryTitle}>
                            {getCategoryIcon(cat)}
                            {cat}:
                        </Text>
                        {products[cat].map((item, index) => (
                            <Swipeable
                                key={index}
                                ref={(ref) => {
                                    if (ref) swipeableRefs.current[`${cat}-${index}`] = ref;
                                }}
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

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
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
    productScroll: {
        maxHeight: 900,
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
