import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilePondFile } from 'filepond';

interface IFileMetadata {
    friendlyFileName: string;
    metadataTags: any[];
}
interface UploaderState {
    files: FilePondFile[];
    currentFilePath: string[];
    previewImageDataObjectUrl: string;
    isCreatingPreviewImage: boolean;
    previewFiles: FilePondFile[];
    cropData: any;
    cropper: any;
    department: number;
    fileMetadata: IFileMetadata;
}

// Define the initial state using that type
const initialState: UploaderState = {
    files: [],
    currentFilePath: [],
    previewImageDataObjectUrl: '',
    isCreatingPreviewImage: false,
    previewFiles: [],
    cropData: '#',
    cropper: null,
    fileMetadata: {
        friendlyFileName: '',
        metadataTags: [],
    },
    department: 0,
};

export const uploaderSlice = createSlice({
    name: 'uploader',
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        uploadFiles: (state: UploaderState, action: PayloadAction<FilePondFile[]>) => {
            state.files = action.payload;
        },
        setCurrentFilePath: (state: UploaderState, action: PayloadAction<string[]>) => {
            state.currentFilePath = action.payload;
        },
        setPreviewImageDataObjectUrl: (state: UploaderState, action: PayloadAction<string>) => {
            state.previewImageDataObjectUrl = action.payload;
        },
        toggleIsCreatingPreviewImage: (state: UploaderState, action: PayloadAction<boolean>) => {
            state.isCreatingPreviewImage = action.payload;
        },
        setPreviewFiles: (state: UploaderState, action: PayloadAction<FilePondFile[]>) => {
            state.previewFiles = action.payload;
        },
        setCropData: (state: UploaderState, action: PayloadAction<any>) => {
            state.cropData = action.payload;
        },
        setCropper: (state: UploaderState, action: PayloadAction<any>) => {
            state.cropper = action.payload;
        },
        setFileMetadataTags: (state: UploaderState, action: PayloadAction<any>) => {
            state.fileMetadata.metadataTags = action.payload;
        },
        setFileFriendlyName: (state: UploaderState, action: PayloadAction<string>) => {
            state.fileMetadata.friendlyFileName = action.payload;
        },
        setDepartment: (state: UploaderState, action: PayloadAction<number>) => {
            state.department = action.payload;
        },
    },
});

export const {
    setCropData,
    setCropper,
    setCurrentFilePath,
    setDepartment,
    setFileFriendlyName,
    setFileMetadataTags,
    setPreviewFiles,
    setPreviewImageDataObjectUrl,
    toggleIsCreatingPreviewImage,
    uploadFiles,
} = uploaderSlice.actions;
export default uploaderSlice.reducer;
