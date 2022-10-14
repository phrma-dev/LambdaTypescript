import * as React from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    Breadcrumbs,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Link,
    Menu,
    MenuItem,
    Slide,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';

import 'filepond/dist/filepond.min.css';
import { FilePond, registerPlugin } from 'react-filepond';
import { FilePondFile } from 'filepond';

import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginImageEdit from 'filepond-plugin-image-edit';

import * as Icons from '@mui/icons-material';
import $ from 'jquery';

registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageExifOrientation,
    FilePondPluginFileValidateSize,
    FilePondPluginImageEdit
);

export interface IManagePhRMAInsideProps {}
export interface IManagePhRMAInsideState {
    files: any[];
    filePath: string[];
    anchorEl: any;
    dialogIsOpen: boolean;
    fileName: string;
    pondFiles: any[];
    showSuccessAlert: boolean;
    successAlertMessage: any;
    isLoading: boolean;
}

export default class FileManager extends React.Component<IManagePhRMAInsideProps, IManagePhRMAInsideState> {
    constructor(props: IManagePhRMAInsideProps) {
        super(props);

        this.state = {
            files: [],
            filePath: [],
            anchorEl: null,
            dialogIsOpen: false,
            fileName: '',
            pondFiles: [],
            isLoading: false,
            showSuccessAlert: false,
            successAlertMessage: <></>,
        };

        this.uploadFile = this.uploadFile.bind(this);
        this.getFile = this.getFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
        this.updateItems = this.updateItems.bind(this);
        this.toggleDialog = this.toggleDialog.bind(this);
        this.setFiles = this.setFiles.bind(this);
        this.showSuccessAlert = this.showSuccessAlert.bind(this);
        this.toggleLoader = this.toggleLoader.bind(this);
        this.getItems('forward');
    }
    public toggleLoader(state: boolean) {
        this.setState({ isLoading: state });
    }
    public toggleMenu(event: any) {
        if (this.state.anchorEl) {
            this.setState({ anchorEl: null });
        } else {
            this.setState({ anchorEl: event.currentTarget });
        }
    }
    public toggleDialog() {
        let isOpen = this.state.dialogIsOpen;
        this.setState({ dialogIsOpen: !isOpen });
    }
    public showSuccessAlert() {
        this.setState({ showSuccessAlert: true });
        setTimeout(() => {
            this.setState({ showSuccessAlert: false });
        }, 7000);
    }
    public uploadFile() {
        var formData = new FormData();
        console.log(this.state.pondFiles);
        formData.append('ifile', this.state.pondFiles[0].file);
        //formData.append("ifile", $("#file")[0].files[0]);
        //console.log($("#file")[0].files[0]);

        console.log($('#pondFiles'));
        let path = this.state.filePath.length === 0 ? 'root' : this.state.filePath.join('/');
        formData.append('path', path);
        $.ajax({
            url: 'https://phrmadataapi.azurewebsites.net/Document/UploadFile',
            contentType: false,
            data: formData,
            processData: false,
            type: 'POST',
            success: (data: string) => {
                console.log(data);

                this.getItems('reverse', this.state.filePath.join('/'));
                this.setState({ pondFiles: [] });

                let successMessage = (
                    <>
                        <strong>{this.state.fileName}</strong> was successfully uploaded.
                    </>
                );
                this.setState({ successAlertMessage: successMessage });
                this.showSuccessAlert();
            },
        });
    }
    public deleteFile(fileName: string) {
        var formData = new FormData();
        formData.append('fileName', fileName);
        let path = this.state.filePath.length === 0 ? 'root' : this.state.filePath.join('/');
        formData.append('path', path);
        $.ajax({
            url: `https://phrmadataapi.azurewebsites.net/Document/DeleteFile`,
            //url: "https://localhost:44311/Document/DeleteFile",
            contentType: false,
            data: formData,
            processData: false,
            type: 'POST',
            success: (data: any) => {
                this.getItems('reverse', this.state.filePath.join('/'));

                let successMessage = (
                    <>
                        <strong>{this.state.fileName}</strong> was successfully deleted.
                    </>
                );
                this.setState({ successAlertMessage: successMessage });
                this.showSuccessAlert();
            },
        });
    }
    public getFile(fileName: string) {
        let formData = new FormData();
        console.log(this.state.filePath);
        let newPath: string = this.state.filePath.length === 0 ? 'root' : this.state.filePath.join('/');
        formData.append('path', newPath);
        formData.append('fileName', fileName);

        $.ajax({
            url: 'https://phrmadataapi.azurewebsites.net/Document/GetFile',
            //url: "https://localhost:44311/Document/GetFile",
            contentType: false,
            data: formData,
            processData: false,
            type: 'POST',
            success: (data: any) => {
                window.open(data, '_blank');

                console.log(data);
            },
        });
    }
    public updateItems(items: any) {
        this.setState({ files: items });
    }
    public getItems(direction: string, path?: any) {
        this.toggleLoader(true);
        let formData = new FormData();
        let newPath: string[];

        if (path) {
            if (direction === 'forward') {
                newPath = this.state.filePath;
                newPath.push(path);
                formData.append('path', newPath.join('/'));
                this.setState({ filePath: newPath });
            } else {
                formData.append('path', path);
            }
        } else {
            formData.append('path', 'root');
        }
        $.ajax({
            url: 'https://phrmadataapi.azurewebsites.net/Document/GetItems',
            contentType: false,
            data: formData,
            processData: false,
            type: 'POST',
            success: (data: any) => {
                this.setState({ files: data });
                setTimeout(() => {
                    this.toggleLoader(false);
                }, 1000);
            },
        });
    }
    public setFiles(pondFiles: any) {
        this.setState({ pondFiles: pondFiles });
        if (pondFiles.length > 0) {
            this.setState({ fileName: pondFiles[0].file.name });
        }
    }
    public render(): React.ReactElement<IManagePhRMAInsideProps> {
        return (
            <>
                <Stack direction="column" spacing={2}>
                    {this.state.showSuccessAlert ? (
                        <Slide direction="down" in={true} timeout={{ enter: 1000, exit: 1000 }}>
                            <Alert severity="success">
                                <AlertTitle>Success</AlertTitle>
                                {this.state.successAlertMessage}
                            </Alert>
                        </Slide>
                    ) : (
                        <div>
                            <FilePond
                                files={this.state.pondFiles}
                                onupdatefiles={(files: FilePondFile[]) => {
                                    this.setFiles(files);
                                }}
                                allowMultiple={true}
                                maxFiles={3}
                                id="pondFiles"
                                name="files"
                                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                            />

                            <Button
                                fullWidth
                                disabled={this.state.pondFiles.length === 0}
                                size="large"
                                onClick={this.uploadFile}
                                endIcon={<Icons.CloudUploadOutlined />}
                                color="primary"
                            >
                                Submit
                            </Button>
                        </div>
                    )}
                </Stack>
                <Stack direction="column" spacing={2}>
                    <div>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                style={{ color: 'black !important' }}
                                href="#"
                                onClick={() => {
                                    this.setState({ filePath: [] });
                                    this.getItems('forward');
                                }}
                            >
                                <Icons.Home style={{ height: 20, width: 20, left: 0, top: 0 }} />
                            </Link>

                            {this.state.filePath.map((dir, index) => (
                                <Link
                                    key={index}
                                    style={{
                                        textDecoration: this.state.filePath.length !== index + 1 ? 'normal' : 'none',
                                        color: 'black !important',
                                    }}
                                    href="#"
                                    onClick={() => {
                                        this.getItems('reverse', this.state.filePath.slice(0, index + 1).join('/'));
                                        this.setState({
                                            filePath: this.state.filePath.slice(0, index + 1),
                                        });
                                    }}
                                >
                                    {dir}
                                </Link>
                            ))}
                        </Breadcrumbs>
                    </div>

                    {this.state.isLoading ? (
                        <Box sx={{ display: 'flex' }} justifyContent="center" alignItems={'middle'}>
                            <Stack direction="column" spacing={2}>
                                <Box sx={{ display: 'flex' }} justifyContent="center" alignItems={'middle'}>
                                    <CircularProgress />
                                </Box>
                                <Typography>Loading...</Typography>
                            </Stack>
                        </Box>
                    ) : (
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell></TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.state.files.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell style={{ width: 50 }}>
                                                {item.isDirectory ? (
                                                    <Icons.Folder style={{ fontSize: 35, left: 0, top: 0 }} />
                                                ) : (
                                                    <Icons.FileCopyOutlined style={{ fontSize: 35, left: 0, top: 0 }} />
                                                )}
                                            </TableCell>
                                            <TableCell
                                                style={{ width: 350 }}
                                                onClick={() => {
                                                    if (item.isDirectory) {
                                                        this.getItems('forward', item.name);
                                                    } else {
                                                        this.getFile(item.name);
                                                    }
                                                }}
                                            >
                                                <Button style={{ textTransform: 'none', textAlign: 'left' }}>
                                                    {item.name}
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                {!item.isDirectory ? (
                                                    <>
                                                        <IconButton
                                                            aria-label="more"
                                                            aria-controls="long-menu"
                                                            aria-haspopup="true"
                                                            onClick={(event: any) => {
                                                                this.toggleMenu(event);
                                                            }}
                                                        >
                                                            <Icons.More style={{ left: 0, top: 0 }} />
                                                        </IconButton>
                                                        <Menu
                                                            id="long-menu"
                                                            anchorEl={this.state.anchorEl}
                                                            keepMounted
                                                            open={this.state.anchorEl !== null}
                                                            onClick={(ev: any) => {
                                                                this.setState({ fileName: item.name });
                                                                this.toggleMenu(ev);
                                                            }}
                                                            PaperProps={{
                                                                style: {
                                                                    width: '20ch',
                                                                },
                                                            }}
                                                        >
                                                            <MenuItem
                                                                key={1}
                                                                onClick={(ev: any) => {
                                                                    this.toggleMenu(ev);

                                                                    this.toggleDialog();
                                                                }}
                                                            >
                                                                <Icons.DeleteForever style={{ left: 0, top: 0 }} />
                                                                <Typography style={{ marginLeft: 7 }}>
                                                                    Delete
                                                                </Typography>
                                                            </MenuItem>
                                                        </Menu>
                                                    </>
                                                ) : (
                                                    <></>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Stack>
                <Dialog
                    open={this.state.dialogIsOpen}
                    onClose={this.toggleDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{'Are you sure you want to delete this file?'}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">{this.state.fileName}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                this.toggleDialog();
                            }}
                            color="primary"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                this.deleteFile(this.state.fileName);
                                this.toggleDialog();
                            }}
                            color="error"
                            autoFocus
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}
