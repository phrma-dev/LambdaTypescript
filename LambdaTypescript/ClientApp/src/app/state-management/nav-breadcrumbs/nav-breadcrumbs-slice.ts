import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface State {
    navPath: any[];
}

// Define the initial state using that type
const initialState: State = {
    navPath: [],
};

export const navBreadcrumbsSlice = createSlice({
    name: 'navbreadcrumbs',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        updateNavBreadcrumbs: (state: State, action: PayloadAction<string[]>) => {
            state.navPath = action.payload;
        },
    },
});

export const { updateNavBreadcrumbs } = navBreadcrumbsSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export default navBreadcrumbsSlice.reducer;
