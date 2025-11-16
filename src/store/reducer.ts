// src/store/reducer.ts
import { combineReducers } from 'redux';
import { contactsReducer } from './contacts';
import { groupsReducer } from './groups';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;