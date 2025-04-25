import {CardData} from '../types/index';

// Generate random card number
const generateCardNumber = (): string => {
  const prefix = '4111';
  let number = prefix;
  for (let i = 0; i < 12; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }

  // Format as XXXX XXXX XXXX XXXX
  return number.replace(/(.{4})/g, '$1 ').trim();
};

// Generate random expiry date (between now and 4 years from now)
const generateExpiryDate = (): string => {
  const now = new Date();
  const month = Math.floor(Math.random() * 12) + 1;
  const year = now.getFullYear() + Math.floor(Math.random() * 4) + 1;
  return `${month.toString().padStart(2, '0')}/${(year % 100).toString()}`;
};

// Initial dummy data
const initialCards: CardData[] = [
  {
    id: '1',
    cardNumber: '4111 1111 1111 1111',
    cardholderName: 'John Doe',
    expiryDate: '12/25',
    frozen: false,
  },
  {
    id: '2',
    cardNumber: '4111 2222 3333 4444',
    cardholderName: 'Jane Smith',
    expiryDate: '06/26',
    frozen: true,
  },
  {
    id: '3',
    cardNumber: '4111 5555 6666 7777',
    cardholderName: 'Robert Johnson',
    expiryDate: '09/24',
    frozen: false,
  },
];

// Mock API functions
export const fetchCards = (): Promise<CardData[]> => {
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      resolve(initialCards);
    }, 500);
  });
};

export const addCard = (cardholderName: string): Promise<CardData> => {
  return new Promise(resolve => {
    const newCard: CardData = {
      id: Date.now().toString(),
      cardNumber: generateCardNumber(),
      cardholderName,
      expiryDate: generateExpiryDate(),
      frozen: false,
    };

    // Simulate API delay
    setTimeout(() => {
      resolve(newCard);
    }, 500);
  });
};

export const toggleCardFreeze = (
  cardId: string,
  frozen: boolean,
): Promise<{id: string; frozen: boolean}> => {
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      resolve({id: cardId, frozen});
    }, 300);
  });
};
