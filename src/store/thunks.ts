import { Dispatch } from 'redux';
import { contactsActions } from './contacts/contacts';
import { groupsActions } from './contacts/groups';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

// Mock API call
const fetchApi = (data: any, delay = 500) => new Promise(resolve => {
    setTimeout(() => resolve(data), delay);
});

export const fetchContacts = () => async (dispatch: Dispatch) => {
    dispatch(contactsActions.fetchRequest());
    try {
        const contacts = (await fetchApi(DATA_CONTACT) as ContactDto[]).map((c, index) => ({
            ...c,
            isFavorite: index < 3, // Set first 3 contacts as favorite
        }));
        dispatch(contactsActions.fetchSuccess(contacts));
    } catch (error: any) {
        dispatch(contactsActions.fetchFailure(error.message));
    }
};

export const fetchGroups = () => async (dispatch: Dispatch) => {
    dispatch(groupsActions.fetchRequest());
    try {
        const groups = await fetchApi(DATA_GROUP_CONTACT) as GroupContactsDto[];
        dispatch(groupsActions.fetchSuccess(groups));
    } catch (error: any) {
        dispatch(groupsActions.fetchFailure(error.message));
    }
};
