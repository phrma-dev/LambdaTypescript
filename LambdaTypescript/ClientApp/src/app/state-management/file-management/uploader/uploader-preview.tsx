import * as mui from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setPreviewImageDataObjectUrl, setPreviewFiles } from './uploader-slice';
import './uploader.css';
// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';

import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize);

export default function UploaderPreview() {
    const state: any = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const updatePreviewObjectDataUrl = () => {
        if (state.uploader.previewFiles.length > 0) {
            const reader = new FileReader();
            reader.onload = () => {
                dispatch(setPreviewImageDataObjectUrl(reader.result as any));
            };
            reader.readAsDataURL(state.uploader.previewFiles[0].file);
        }
    };

    const updatePreviewFileList = (fileList: FilePondFile[]) => {
        dispatch(setPreviewFiles(fileList));
        if (fileList.length > 0) {
            updatePreviewObjectDataUrl();
        }
    };
    updatePreviewObjectDataUrl();

    return (
        <mui.Stack direction="column" spacing={3}>
            <>
                <div>
                    {
                        <FilePond
                            files={state.uploader.previewFiles.length === 0 ? [] : state.uploader.previewFiles}
                            onupdatefiles={(fileList: FilePondFile[]) => {
                                updatePreviewFileList(fileList);
                            }}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            labelIdle="Drag and Drop your files or <span class='browse'>browse</span>"
                        />
                    }
                </div>
            </>
        </mui.Stack>
    );
}
