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

export const intranetDocumentsSlice = createSlice({
    name: 'intranetDocuments',
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

export const { setFiles, setCurrentFilePath } = intranetDocumentsSlice.actions;

export default intranetDocumentsSlice.reducer;
