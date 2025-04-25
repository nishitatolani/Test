import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {CardData} from '../types';
import {logo} from '../assets';

interface CardProps {
  card: CardData;
  onToggleFreeze: (id: string, frozen: boolean) => void;
}

const Card: React.FC<CardProps> = ({card, onToggleFreeze}) => {
  const {id, cardNumber, cardholderName, expiryDate, frozen} = card;

  return (
    <View style={[styles.cardContainer, frozen && styles.frozenCard]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardholderInfo}>
          <Text style={styles.cardholderName}>{cardholderName}</Text>
        </View>
        <Image source={logo} style={styles.chip} resizeMode="contain" />
      </View>

      <Text style={styles.cardNumber}>{cardNumber}</Text>

      <View style={styles.cardFooter}>
        <View style={styles.expiryInfo}>
          <Text style={styles.expiryLabel}>Thru: </Text>
          <Text style={styles.expiryDate}>{expiryDate}</Text>
        </View>
        <View style={styles.expiryInfo}>
          <Text style={styles.expiryLabel}>CVV: </Text>
          <Text style={styles.expiryDate}>{678}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.freezeButton}
        onPress={() => onToggleFreeze(id, !frozen)}>
        <Text style={styles.freezeButtonText}>
          {frozen ? 'UNFREEZE' : 'FREEZE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: 320,
    height: 200,
    borderRadius: 16,
    backgroundColor: '#01D167',
    padding: 24,
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  frozenCard: {
    opacity: 0.7,
    backgroundColor: '#4A5579',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  bankName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  chip: {
    width: 50,
    height: 30,
    borderRadius: 4,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 22,
    letterSpacing: 2,
    marginBottom: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardholderInfo: {},
  cardholderLabel: {
    color: '#FFFFFF',
    fontSize: 10,
    opacity: 0.7,
  },
  cardholderName: {
    color: '#FFFFFF',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  expiryInfo: {
    flexDirection: 'row',
  },
  expiryLabel: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  expiryDate: {
    color: '#FFFFFF',
    fontSize: 12,
  },

  freezeButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  freezeButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Card;
