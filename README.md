# Credit Card Management App

A React Native application for managing credit cards with features like adding new cards and freezing/unfreezing existing cards.

## Features

- View all your credit cards in a carousel
- Add new cards with automatically generated card numbers and expiry dates
- Freeze and unfreeze cards
- Persistent storage using AsyncStorage
- Cross-platform (iOS and Android)

## Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/yourusername/credit-card-app.git
cd credit-card-app
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install iOS dependencies (iOS only):
\`\`\`bash
cd ios && pod install && cd ..
\`\`\`

## Running the App

### iOS

\`\`\`bash
npx react-native run-ios
\`\`\`

### Android

\`\`\`bash
npx react-native run-android
\`\`\`

## Mock API

The app uses a mock API implementation that simulates backend functionality:

- `fetchCards()`: Retrieves all cards
- `addCard(cardholderName)`: Creates a new card with the provided cardholder name
- `toggleCardFreeze(cardId, frozen)`: Toggles the frozen status of a card

## Project Structure

- `src/api`: Mock API implementation
- `src/components`: Reusable UI components
- `src/screens`: App screens
- `src/store`: Redux store and slices
- `src/types`: TypeScript type definitions
- `src/utils`: Utility functions

## Technologies Used

- React Native
- TypeScript
- Redux Toolkit for state management
- React Navigation for navigation
- AsyncStorage for local data persistence
- React Native Modal for modals

## Testing

Run the tests with:

\`\`\`bash
npm test
\`\`\`

## License

MIT
\`\`\`

## Unit Tests

Let's add some basic unit tests for our components:
