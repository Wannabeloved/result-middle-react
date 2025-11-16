import { ContactDto } from "src/types/dto/ContactDto";

export interface ContactsState {
    items: ContactDto[];
    loading: boolean;
    error: string | null;
};

const initialState: ContactsState = {
    items: [],
    loading: false,
    error: null,
};

export const ActionTypes = {
    FETCH_REQUEST: 'contacts/FETCH_REQUEST',
    FETCH_SUCCESS: 'contacts/FETCH_SUCCESS',
    FETCH_FAILURE: 'contacts/FETCH_FAILURE',
    ADD: 'contacts/ADD',
    DELETE: 'contacts/DELETE',
    TOGGLE_FAVORITE: 'contacts/TOGGLE_FAVORITE',
} as const;

export const contactsActions = {
    fetchRequest: () => ({ type: ActionTypes.FETCH_REQUEST }),
    fetchSuccess: (contacts: ContactDto[]) => ({ type: ActionTypes.FETCH_SUCCESS, payload: contacts }),
    fetchFailure: (error: string) => ({ type: ActionTypes.FETCH_FAILURE, payload: error }),
    add: (contact: ContactDto) => ({ type: ActionTypes.ADD, payload: contact }),
    delete: (contactId: string) => ({ type: ActionTypes.DELETE, payload: contactId }),
    toggleFavorite: (contactId: string) => ({ type: ActionTypes.TOGGLE_FAVORITE, payload: contactId }),
};

type ContactAction = ReturnType<typeof contactsActions[keyof typeof contactsActions]>;

export const contactsReducer = (state = initialState, action: ContactAction): ContactsState => {
    switch (action.type) {
        case ActionTypes.FETCH_REQUEST:
            return { ...state, loading: true, error: null };
        case ActionTypes.FETCH_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case ActionTypes.FETCH_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ActionTypes.ADD:
            return { ...state, items: [...state.items, action.payload] };
        case ActionTypes.DELETE:
            return { ...state, items: state.items.filter(contact => contact.id !== action.payload) };
        case ActionTypes.TOGGLE_FAVORITE:
            return (console.log("toggle"), {
                ...state,
                items: state.items.map(contact =>
                    contact.id === action.payload
                        ? { ...contact, isFavorite: !contact.isFavorite }
                        : contact
                ),
            });
        default:
            return state;
    }
}