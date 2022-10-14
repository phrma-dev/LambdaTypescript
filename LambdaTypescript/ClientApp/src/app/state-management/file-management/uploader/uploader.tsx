import * as mui from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { uploadFiles } from './uploader-slice';
import './uploader.css';

// Import React FilePond //
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileValidateSize);
// End React FilePond //

export default function Uploader() {
    const state: any = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const updateFileList = (fileList: FilePondFile[]) => {
        dispatch(uploadFiles(fileList));
    };

    return (
        <mui.Stack direction="column" spacing={3}>
            <div>
                <FilePond
                    files={state.uploader.files.length === 0 ? [] : state.uploader.files}
                    onupdatefiles={(fileList: FilePondFile[]) => {
                        updateFileList(fileList);
                    }}
                    allowMultiple={false}
                    maxFiles={1}
                    name="files"
                    labelIdle="Drag and Drop your files or <span class='browse'>browse</span>"
                />
            </div>
        </mui.Stack>
    );
}
