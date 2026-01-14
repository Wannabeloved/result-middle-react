import { combineReducers } from 'redux';
import { contactsReducer } from './contacts/contacts';
import { groupsReducer } from './contacts/groups';
import { filterReducer } from './contacts/filter';

const rootReducer = combineReducers({
  contacts: contactsReducer,
  groups: groupsReducer,
  filter: filterReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;