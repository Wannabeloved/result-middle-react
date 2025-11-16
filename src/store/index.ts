import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Corrected import
import rootReducer, { type RootState } from './reducer'; // Import RootState

// @ts-ignore
const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type { RootState }; // Export RootState

export default store;
