import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

// Define a type for the slice state
interface BannerState {
    isOpen: boolean;
}

// Define the initial state using that type
const initialState: BannerState = {
    isOpen: true,
};

export const bannerSlice = createSlice({
    name: 'banner',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        toggleBannerIsOpen: (state: BannerState) => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { toggleBannerIsOpen } = bannerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBannerIsOpen = (state: RootState) => state.banner.isOpen;

export default bannerSlice.reducer;
