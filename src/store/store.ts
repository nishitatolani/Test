import {legacy_createStore as createStore, combineReducers} from 'redux';
import cardReducer from './reducer';

const rootReducer = combineReducers({
  cards: cardReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
