import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface DrawerState {
    leftDrawerIsOpen: boolean;
    rightDrawerIsOpen: boolean;
    bottomDrawerIsOpen: boolean;
    drawerLinkGroups: { isOpen: boolean }[];
}

// Define the initial state using that type
const initialState: DrawerState = {
    leftDrawerIsOpen: false,
    rightDrawerIsOpen: false,
    bottomDrawerIsOpen: false,
    drawerLinkGroups: [{ isOpen: false }, { isOpen: false }],
};

export const drawerSlice = createSlice({
    name: 'drawer',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleLeftDrawerIsOpen: (state: DrawerState) => {
            state.leftDrawerIsOpen = !state.leftDrawerIsOpen;
        },
        toggleRightDrawerIsOpen: (state: DrawerState) => {
            state.rightDrawerIsOpen = !state.rightDrawerIsOpen;
        },
        toggleBottomDrawerIsOpen: (state: DrawerState) => {
            state.bottomDrawerIsOpen = !state.bottomDrawerIsOpen;
        },
        toggleLinkGroup: (state: DrawerState, action: PayloadAction<number, any>) => {
            state.drawerLinkGroups[action.payload].isOpen = !state.drawerLinkGroups[action.payload].isOpen;
        },
        setLinkGroups: (state: DrawerState, action: PayloadAction<any, any>) => {
            state.drawerLinkGroups = action.payload;
        },
    },
});

export const {
    toggleLeftDrawerIsOpen,
    toggleRightDrawerIsOpen,
    toggleBottomDrawerIsOpen,
    toggleLinkGroup,
    setLinkGroups,
} = drawerSlice.actions;

export default drawerSlice.reducer;
