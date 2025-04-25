import {CardData} from '../types';
import * as types from './actionTypes';

interface CardState {
  cards: CardData[];
  loading: boolean;
  error: string | null;
}

const initialState: CardState = {
  cards: [],
  loading: false,
  error: null,
};

const cardReducer = (state = initialState, action: any): CardState => {
  switch (action.type) {
    case types.FETCH_CARDS_REQUEST:
    case types.ADD_CARD_REQUEST:
    case types.TOGGLE_CARD_FREEZE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case types.FETCH_CARDS_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: action.payload,
      };

    case types.ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: [...state.cards, action.payload],
      };

    case types.TOGGLE_CARD_FREEZE_SUCCESS:
      return {
        ...state,
        loading: false,
        cards: state.cards.map(card =>
          card.id === action.payload.id
            ? {...card, frozen: action.payload.frozen}
            : card,
        ),
      };

    case types.FETCH_CARDS_FAILURE:
    case types.ADD_CARD_FAILURE:
    case types.TOGGLE_CARD_FREEZE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default cardReducer;
