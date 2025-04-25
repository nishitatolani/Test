import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, SafeAreaView, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState, store} from '../store/store';
import {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCardRequest,
  addCardSuccess,
  addCardFailure,
  toggleCardFreezeRequest,
  toggleCardFreezeSuccess,
  toggleCardFreezeFailure,
} from '../store/actions';
import CardCarousel from '../components/CardCorousel';
import Button from '../components/Button';
import AddCardModal from '../components/AddCardModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as cardService from '../api/cardService';
import {CardData} from '../types';

const HomeScreen: React.FC = () => {
  const {cards, loading} = useSelector((state: RootState) => state.cards);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Utility: Load cards from AsyncStorage
  const loadCardsFromStorage = async (): Promise<CardData[]> => {
    try {
      const json = await AsyncStorage.getItem('cards');
      return json ? JSON.parse(json) : [];
    } catch (err) {
      console.error('Failed to load from AsyncStorage', err);
      return [];
    }
  };

  const saveCardsToStorage = async (cardss: CardData[]) => {
    try {
      await AsyncStorage.setItem('cards', JSON.stringify(cardss));
    } catch (err) {
      console.error('Failed to save to AsyncStorage', err);
    }
  };

  // Load cards on mount
  useEffect(() => {
    const fetchCards = async () => {
      store.dispatch(fetchCardsRequest());

      try {
        let storedCards = await loadCardsFromStorage();

        if (storedCards.length === 0) {
          storedCards = await cardService.fetchCards();
          await saveCardsToStorage(storedCards);
        }

        store.dispatch(fetchCardsSuccess(storedCards));
      } catch (err: any) {
        store.dispatch(fetchCardsFailure(err.message || 'Error loading cards'));
      }
    };

    fetchCards();
  }, []);

  const handleAddCard = async (cardholderName: string) => {
    store.dispatch(addCardRequest(cardholderName));

    try {
      const newCard = await cardService.addCard(cardholderName);
      const updatedCards = [...cards, newCard];
      await saveCardsToStorage(updatedCards);

      store.dispatch(addCardSuccess(newCard));
    } catch (err: any) {
      store.dispatch(addCardFailure(err.message || 'Failed to add card'));
    }
  };

  const handleToggleFreeze = async (cardId: string, frozen: boolean) => {
    store.dispatch(toggleCardFreezeRequest(cardId, frozen));

    try {
      const result = await cardService.toggleCardFreeze(cardId, frozen);
      const updatedCards = cards.map(card =>
        card.id === result.id ? {...card, frozen: result.frozen} : card,
      );
      await saveCardsToStorage(updatedCards);

      store.dispatch(toggleCardFreezeSuccess(result.id, result.frozen));
    } catch (err: any) {
      store.dispatch(
        toggleCardFreezeFailure(err.message || 'Failed to toggle freeze'),
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Debit Cards</Text>
          <Text style={styles.subtitle}>
            {cards.length} {cards.length === 1 ? 'card' : 'cards'} available
          </Text>
        </View>

        <CardCarousel cards={cards} onToggleFreeze={handleToggleFreeze} />

        <View style={styles.buttonContainer}>
          <Button
            title="+ Add New Card"
            onPress={() => setIsModalVisible(true)}
            loading={loading}
          />
        </View>

        <AddCardModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddCard={handleAddCard}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C365A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
});

export default HomeScreen;
