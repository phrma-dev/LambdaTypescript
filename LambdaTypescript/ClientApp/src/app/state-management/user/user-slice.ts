import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IUserProfile {
	firstName : string,
	lastName: string,
	userEmail: string,
	officeLocation: string,
	jobTitle: string,
	userPhoto: string
}

interface IUserPreferences {
	themeMode: string;
}
const initUserPreferences = {
	themeMode: 'light'
}

const initProfile = {
	firstName: '',
	lastName: '',
	userEmail: '',
	officeLocation: '',
	jobTitle: '',
	userPhoto: ''
}

// Define a type for the slice state
interface UserState {
	profile: IUserProfile;
	userEmail: string;
	userPreferences: any;
	teams: any;
	channels: any;
	currentGroupId: string;
	accessToken: string;

	//userPhoto: string;
}

// Define the initial state using that type
const initialState: UserState = {
	profile: initProfile,
	userEmail: '',
	userPreferences: initUserPreferences,
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
				setUserEmail: (state: UserState, action: PayloadAction<any>) => {
					state.userEmail = action.payload;
				},
				setPreferredTheme: (state: UserState, action: PayloadAction<any>) => {
					state.userPreferences.themeMode = action.payload;
				},
				//setUserPhoto: (state: UserState, action: PayloadAction<any>) => {
				//	state.userPhoto = action.payload;
				//},
		},
});

export const { setUserProfile, setUserTeams, setUserCurrentFileItems, setCurrentGroupId, setAccessToken, setUserEmail, setPreferredTheme
//	, setUserPhoto
} = userSlice.actions;

export default userSlice.reducer;
