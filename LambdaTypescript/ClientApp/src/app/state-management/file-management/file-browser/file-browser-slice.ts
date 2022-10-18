import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IState {
    files: any[];
    currentFilePath: any[];
}
// Define the initial state using that type
const initialState: IState = {
    files: [],
    currentFilePath: [],
};

export const fileBrowserSlice = createSlice({
    name: 'uploader',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        setFiles: (state: IState, action: PayloadAction<any[]>) => {
            state.files = action.payload;
        },
        setCurrentFilePath: (state: IState, action: PayloadAction<string[]>) => {
            state.currentFilePath = action.payload;
        },
    },
});

export const { setFiles, setCurrentFilePath } = fileBrowserSlice.actions;

export default fileBrowserSlice.reducer;
