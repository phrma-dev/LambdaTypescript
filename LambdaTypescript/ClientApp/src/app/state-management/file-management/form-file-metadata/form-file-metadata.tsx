import { useEffect, useState } from 'react';
import * as mui from '@mui/material';
import * as muiIcon from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { setDepartment, setFileMetadataTags, setFileFriendlyName } from '../uploader/uploader-slice';
import { PDFToText } from '../uploader/uploader-services';

const departmentOptions = [
    {
        key: 1,
        label: 'Human Resources',
        value: 1,
    },
    {
        key: 2,
        label: 'Information Technology',
        value: 2,
    },
];

const tagOptions = [
    {
        key: 1,
        label: 'Billing',
        value: 1,
    },
    {
        key: 2,
        label: 'Walkthrough',
        value: 2,
    },
];

export default function FileMetadataForm() {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const [text, setText] = useState('');

    useEffect(() => {
        PDFToText(state.uploader.files).then((data) => {
            console.log(data);
            setText(data.toString());
        });
    }, [state.uploader.files]);

    return (
        <mui.FormGroup>
            <mui.FormControl sx={{ m: 1 }}>
                <mui.TextField
                    label="Friendly File Name"
                    placeholder={state.uploader.files[0].filename.split('.')[0]}
                    value={state.uploader.fileMetadata.friendlyFileName}
                    onChange={(ev: any) => {
                        dispatch(setFileFriendlyName(ev.target.value));
                    }}
                    InputProps={{
                        endAdornment: (
                            <mui.InputAdornment position="end">
                                {state.uploader.fileMetadata.friendlyFileName !== '' ? (
                                    <muiIcon.CheckCircleOutlineOutlined color="success" />
                                ) : (
                                    <></>
                                )}
                            </mui.InputAdornment>
                        ),
                    }}
                />
            </mui.FormControl>
            <mui.FormGroup>
                <mui.FormControl sx={{ m: 1 }}>
                    <mui.Autocomplete
                        disablePortal
                        id="category"
                        options={departmentOptions}
                        multiple={false}
                        renderInput={(params) => <mui.TextField {...params} label="Category" />}
                        onChange={(ev: any, value: any) => {
                            if (value) {
                                dispatch(setDepartment(value.value));
                            } else {
                                dispatch(setDepartment(0));
                            }
                        }}
                    />
                </mui.FormControl>
                <mui.FormControl sx={{ m: 1 }}>
                    <mui.Autocomplete
                        disablePortal
                        id="tags"
                        options={tagOptions}
                        multiple={true}
                        renderInput={(params) => <mui.TextField {...params} label="Tags" />}
                        onChange={(ev: any, values: any) => {
                            if (values) {
                                dispatch(setFileMetadataTags(values));
                            } else {
                                dispatch(setFileMetadataTags(values));
                            }
                        }}
                    />
                </mui.FormControl>
            </mui.FormGroup>
            <mui.FormControl>
                <mui.FormLabel>Extracted Text</mui.FormLabel>
                <div
                    style={{
                        maxHeight: 300,
                        width: '100%',
                        borderTop: '1px solid lightgray',
                        borderBottom: '1px solid lightgray',
                        overflow: 'scroll',
                        overflowWrap: 'normal',
                    }}
                >
                    <mui.TextField disabled sx={{ width: '100%' }} multiline value={text} />
                </div>
            </mui.FormControl>
        </mui.FormGroup>
    );
}
