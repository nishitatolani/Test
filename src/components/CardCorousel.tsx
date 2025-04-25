import React, {useRef} from 'react';
import {StyleSheet, View, ScrollView, Dimensions, Text} from 'react-native';
import {CardData} from '../types';
import Card from './Card';

interface CardCarouselProps {
  cards: CardData[];
  onToggleFreeze: (id: string, frozen: boolean) => void;
}

const {width} = Dimensions.get('window');
const CARD_WIDTH = 320;
const CARD_MARGIN = 8;

const CardCarousel: React.FC<CardCarouselProps> = ({cards, onToggleFreeze}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No cards available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={CARD_WIDTH + CARD_MARGIN * 2}
        decelerationRate="fast">
        {cards.map(card => (
          <Card key={card.id} card={card} onToggleFreeze={onToggleFreeze} />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {cards.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === 0 && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  scrollContent: {
    paddingHorizontal: (width - CARD_WIDTH) / 2 - CARD_MARGIN,
    paddingVertical: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D8D8D8',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#2C365A',
    width: 16,
  },
  emptyContainer: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default CardCarousel;
