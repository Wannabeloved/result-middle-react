import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  name: string;
  groupId: string;
}

const initialState: FilterState = {
  name: '',
  groupId: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setNameFilter: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setGroupFilter: (state, action: PayloadAction<string>) => {
      state.groupId = action.payload;
    },
    clearFilters: (state) => {
      state.name = '';
      state.groupId = '';
    },
  },
});

export const { setNameFilter, setGroupFilter, clearFilters } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
