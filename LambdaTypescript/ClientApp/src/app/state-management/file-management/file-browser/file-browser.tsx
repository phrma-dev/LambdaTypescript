/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { setFiles, setCurrentFilePath } from './file-browser-slice';
import { useAppSelector, useAppDispatch } from '../../hooks';
import * as _uploaderServices from '../uploader/uploader-services';
import * as muiIcon from '@mui/icons-material';
import * as mui from '@mui/material';
import styles from './file-browser.module.scss';

export default function FileBrowser() {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();
    const initFiles = _uploaderServices.GetItems(null);

    const _getFiles = (direction: string, path: any) => {
        let newPathString: any = '';
        let temp = state.fileBrowser.currentFilePath;
        let newPathArray: any[] = [];
        temp.forEach((t) => {
            newPathArray.push(t);
        });
        if (path) {
            if (direction === 'forward') {
                newPathArray.push(path);
                newPathString = newPathArray.join('/');
            } else {
                newPathArray = path;
                newPathString = newPathArray.join('/');
            }
        } else {
            newPathArray.pop();
            newPathString = newPathArray.length === 0 ? null : newPathArray.join('/');
        }
        dispatch(setCurrentFilePath(newPathArray));
        _uploaderServices.GetItems(newPathString).then((data: any) => {
            dispatch(setFiles(data));
        });
    };
    const _setFiles = (files: any) => {
        files.then((data: any) => {
            dispatch(setFiles(data));
        });
    };
    const getFileBrowserIcon = (isDirectory: boolean) => {
        let returnIcon: any;
        switch (isDirectory) {
            case false:
                returnIcon = <muiIcon.FileCopyOutlined className={styles.muiIcon} />;
                break;

            case true:
                returnIcon = (
                    <img
                        height="30"
                        width="30"
                        src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20220127.003/assets/item-types/20/folder.svg"
                        alt="folder"
                    />
                );
                break;
            //<muiIcon.Folder className={styles.muiIcon} />;
        }
        return returnIcon;
    };
    const FileListAppBar = () => {
        return (
            <mui.AppBar color="default" position="sticky" className={styles.muiAppBar}>
                <mui.Toolbar className={styles.muiToolbar}>
                    <mui.Breadcrumbs aria-label="breadcrumb">
                        <mui.Link
                            href="#"
                            color="inherit"
                            underline="hover"
                            onClick={() => {
                                _getFiles('reverse', []);
                            }}
                        >
                            <muiIcon.Home className={styles.muiIcon} />
                        </mui.Link>

                        {state.fileBrowser.currentFilePath.map((dir, i, elements) => (
                            <mui.Link
                                key={i}
                                underline={i !== elements.length - 1 ? 'hover' : 'none'}
                                color="inherit"
                                href="#"
                                onClick={() => {
                                    _getFiles('reverse', elements.slice(0, i + 1));
                                }}
                            >
                                {dir}
                            </mui.Link>
                        ))}
                    </mui.Breadcrumbs>
                </mui.Toolbar>
            </mui.AppBar>
        );
    };
    const FileList = () => {
        return (
            <mui.List sx={{ bgcolor: 'background.paper' }} className={styles.muiList}>
                {state.fileBrowser.files.length > 0 ? (
                    state.fileBrowser.files.map((item, index) => (
                        <>
                            <mui.Divider />
                            <mui.CardActionArea>
                                <mui.ListItem
                                    alignItems="flex-start"
                                    className={styles.muiListItem}
                                    onClick={() => {
                                        if (item.isDirectory) {
                                            _getFiles('forward', item.name);
                                        } else {
                                            //	this.getFile(item.name);
                                        }
                                    }}
                                >
                                    <mui.ListItemIcon>{getFileBrowserIcon(item.isDirectory)}</mui.ListItemIcon>
                                    <mui.ListItemText>{item.name}</mui.ListItemText>
                                </mui.ListItem>
                            </mui.CardActionArea>
                        </>
                    ))
                ) : (
                    <mui.Typography>No Files Found</mui.Typography>
                )}
            </mui.List>
        );
    };
    useEffect(() => {
        _setFiles(initFiles);
    }, []);

    return (
        <mui.Box className={styles.fileBrowser}>
            {[
                <FileListAppBar />,
                <mui.Box sx={{ p: 1 }}>
                    <FileList />
                </mui.Box>,
            ].map((item) => (
                <>{item}</>
            ))}
        </mui.Box>
    );
}
