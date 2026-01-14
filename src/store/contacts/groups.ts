import { GroupContactsDto } from "src/types/dto/GroupContactsDto";

export interface GroupsState {
    items: GroupContactsDto[];
    loading: boolean;
    error: string | null;
}

const initialState: GroupsState = {
    items: [],
    loading: false,
    error: null,
};

export const ActionTypes = {
    FETCH_REQUEST: 'groups/FETCH_REQUEST',
    FETCH_SUCCESS: 'groups/FETCH_SUCCESS',
    FETCH_FAILURE: 'groups/FETCH_FAILURE',
    ADD: 'groups/ADD',
    DELETE: 'groups/DELETE',
} as const;

export const groupsActions = {
    fetchRequest: () => ({ type: ActionTypes.FETCH_REQUEST }),
    fetchSuccess: (groups: GroupContactsDto[]) => ({ type: ActionTypes.FETCH_SUCCESS, payload: groups }),
    fetchFailure: (error: string) => ({ type: ActionTypes.FETCH_FAILURE, payload: error }),
    add: (group: GroupContactsDto) => ({ type: ActionTypes.ADD, payload: group }),
    delete: (groupId: string) => ({ type: ActionTypes.DELETE, payload: groupId }),
};

type GroupAction = ReturnType<typeof groupsActions[keyof typeof groupsActions]>;

export const groupsReducer = (state = initialState, action: GroupAction): GroupsState => {
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
            return { ...state, items: state.items.filter(group => group.id !== action.payload) };
        default:
            return state;
    }
}