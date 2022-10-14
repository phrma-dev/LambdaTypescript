import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface UserState {
    profile: any;
    teams: any;
    channels: any;
    currentGroupId: string;
    accessToken: string;
}

// Define the initial state using that type
const initialState: UserState = {
    profile: {},
    teams: [],
    channels: [],
    currentGroupId: '',
    accessToken: '',
};

export const userSlice = createSlice({
    name: 'user',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setUserProfile: (state: UserState, action: PayloadAction<any>) => {
            state.profile = action.payload;
        },
        setUserTeams: (state: UserState, action: PayloadAction<any>) => {
            state.teams = action.payload;
        },
        setUserCurrentFileItems: (state: UserState, action: PayloadAction<any>) => {
            state.channels = action.payload;
        },
        setCurrentGroupId: (state: UserState, action: PayloadAction<any>) => {
            state.currentGroupId = action.payload;
        },
        setAccessToken: (state: UserState, action: PayloadAction<any>) => {
            state.accessToken = action.payload;
        },
    },
});

export const { setUserProfile, setUserTeams, setUserCurrentFileItems, setCurrentGroupId, setAccessToken } =
    userSlice.actions;

export default userSlice.reducer;
