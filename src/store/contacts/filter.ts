const initialState = {
    name: '',
    groupId: '',
};

export const ActionTypes = {
    SET_NAME_FILTER: 'filter/SET_NAME_FILTER',
    SET_GROUP_FILTER: 'filter/SET_GROUP_FILTER',
    CLEAR_FILTERS: 'filter/CLEAR_FILTERS',
} as const;

export const filterActions = {
    setNameFilter: (name: string) => ({
        type: ActionTypes.SET_NAME_FILTER,
        payload: name,
    }),
    setGroupFilter: (groupId: string) => ({
        type: ActionTypes.SET_GROUP_FILTER,
        payload: groupId,
    }),
    clearFilters: () => ({
        type: ActionTypes.CLEAR_FILTERS,
    }),
};

type FilterAction = ReturnType<typeof filterActions[keyof typeof filterActions]>;

export const filterReducer = (state = initialState, action: FilterAction): typeof initialState => {
    switch (action.type) {
        case ActionTypes.SET_NAME_FILTER:
            return { ...state, name: action.payload };

        case ActionTypes.SET_GROUP_FILTER:
            return { ...state, groupId: action.payload };

        case ActionTypes.CLEAR_FILTERS:
            return initialState;

        default:
            return state;
    }
};

export type FiltersState = typeof initialState;