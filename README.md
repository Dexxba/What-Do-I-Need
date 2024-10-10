Here is the English translation of your text:

# What do I need - Shopping List App

This is a mobile application for managing shopping lists, allowing users to categorize their purchases, save lists, and browse the history of their shopping activities.

## Features
- Add categories for purchases
- Add products to categories
- Save shopping lists for a specific date
- View shopping list history and load individual lists
- Ability to delete individual lists or the entire history
- Simple and user-friendly interface with swipe gestures

## Installation

### Requirements
- Installed Node.js and npm
- Installed Expo CLI

### Installation steps

1. **Clone the repository**

   First, clone the project repository to your local system:
   ```bash
   git clone https://github.com/Dexxba/What-Do-I-Need.git
   ```

2. **Navigate to the project directory**

   Change into the cloned directory:
   ```bash
   cd What-Do-I-Need
   ```

3. **Install dependencies**

   Install the necessary packages and dependencies:
   ```bash
   npm install
   ```

4. **Start Expo**

   Start Expo to run the app on a device or emulator:
   ```bash
   npm start
   ```

5. **Run the app on a device**

   - Use the Expo Go app on your mobile device to test the app. Scan the QR code displayed in the browser or use the emulator.

### App Structure
- **HomeScreen**: The home page where the user can choose to create a new shopping list or view the shopping history.
- **ShopScreen**: This is where the user creates a shopping list, adds categories and products, and saves the list.
- **HistoryScreen**: Displays all saved lists. The user can load old lists, delete individual lists, or clear the entire history.

## Available Commands

- `npm start`: Starts the development server.
- `npm run android`: Builds and runs the app on an Android emulator.
- `npm run ios`: Builds and runs the app on an iOS simulator (available only on macOS).
- `npm run build`: Builds a production version of the app.

## Technologies
- **React Native**: For cross-platform development.
- **Expo**: For rapid development and testing of the app.
- **AsyncStorage**: For local storage of shopping data on the device.
- **DateTimePicker**: For selecting shopping dates.
- **React Navigation**: For navigating between screens.
- **MaterialCommunityIcons**: For appealing icons within the app.

## Further Development

If you wish to contribute to the app's development, feel free to submit a pull request or contact us. Changes and improvements are always welcome!

## License

This project is licensed under the MIT license. For more details, refer to the `LICENSE` file.