import { CardData } from '../types';
import * as types from './actionTypes';

// Action Creators (Pure only)
export const fetchCardsRequest = () => ({
  type: types.FETCH_CARDS_REQUEST,
});

export const fetchCardsSuccess = (cards: CardData[]) => ({
  type: types.FETCH_CARDS_SUCCESS,
  payload: cards,
});

export const fetchCardsFailure = (error: string) => ({
  type: types.FETCH_CARDS_FAILURE,
  payload: error,
});

export const addCardRequest = (cardholderName: string) => ({
  type: types.ADD_CARD_REQUEST,
  payload: cardholderName,
});

export const addCardSuccess = (card: CardData) => ({
  type: types.ADD_CARD_SUCCESS,
  payload: card,
});

export const addCardFailure = (error: string) => ({
  type: types.ADD_CARD_FAILURE,
  payload: error,
});

export const toggleCardFreezeRequest = (cardId: string, frozen: boolean) => ({
  type: types.TOGGLE_CARD_FREEZE_REQUEST,
  payload: { cardId, frozen },
});

export const toggleCardFreezeSuccess = (id: string, frozen: boolean) => ({
  type: types.TOGGLE_CARD_FREEZE_SUCCESS,
  payload: { id, frozen },
});

export const toggleCardFreezeFailure = (error: string) => ({
  type: types.TOGGLE_CARD_FREEZE_FAILURE,
  payload: error,
});
