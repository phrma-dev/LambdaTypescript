import React, { useContext } from 'react';
import { Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { FileDownload } from '@mui/icons-material';
import { Route, Routes } from 'react-router-dom';
import FileBrowser from '../../app/state-management/file-management/file-browser/file-browser';
import BasicTimeline from '../../app/state-management/timeline/timeline';
import HorizontalLinearStepper from '../../app/state-management/file-management/form-stepper/form-stepper';
import { setCurrentGroupId } from '../../app/state-management/user/user-slice';
import styles from './FileTable.module.scss';
import { directoryContext, Folder } from '../contexts/directoryContext';
import useApi from '../../hooks/useApi';
import { toggleRightDrawerIsOpen } from '../../app/state-management/drawer/drawer-slice';

interface FileTableProps {
    state: any;
}

const FOLDER_IMAGE = 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20220127.003/assets/item-types/20/folder.svg';
const TEAMS_IMAGE =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/2203px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png';

/**
 * Component to display a table of files and folders in the current directory
 *
 * @param state
 */
const FileTable: React.FC<FileTableProps> = ({ state }) => {
    const { dispatch, _getTeamDriveRootItems, _getTeamChannelDriveItems, _getUserTeams } = useApi(state);
    const { setCurrentFolder, isHome, setIsHome, setSelectedFile } = useContext(directoryContext);

    // Mock file structure
    // TODO: remove when API is functional
  React.useEffect(() => {
    _getUserTeams();
  }, []);
    const items: [] = isHome ? state.user.teams : state.user.channels;
  
    const toggleDrawer = () => {
        dispatch(toggleRightDrawerIsOpen());
    };

    const handleClick = (item: any) => {
        let folder: Folder;
        if (isHome) {
            dispatch(setCurrentGroupId(item.id));
            setIsHome(false);
            _getTeamDriveRootItems(item.id);
            folder = { name: item.displayName, id: item.id };
        } else if (item.file) {
            console.log(item);
            setSelectedFile(item);
            return;
        } else {
            _getTeamChannelDriveItems(item.id);
            folder = { name: item.name, id: item.id };
        }
        setCurrentFolder(folder);
    };

    return (
        <>
            <Box sx={{ m: 1, transitionDurations: '1s' }}>
                {/* <OverviewBanner /> */}
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className={styles.tableCell}></TableCell>
                                <TableCell className={styles.tableCell}>Name</TableCell>
                                <TableCell className={styles.tableCell}>Id</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item: any, index: number) => (
                                <TableRow
                                    key={index}
                                    className={styles.tableRow}
                                    onClick={() => {
                                        handleClick(item);
                                    }}
                                >
                                    <TableCell className={styles.tableCell}>
                                        {item.file ? (
                                            <FileDownload />
                                        ) : (
                                            <img
                                                height={30}
                                                width={30}
                                                src={isHome ? TEAMS_IMAGE : FOLDER_IMAGE}
                                                alt="folder"
                                            />
                                        )}
                                    </TableCell>
                                    <TableCell className={styles.tableCell}>
                                        {isHome ? item.displayName : item.name}
                                    </TableCell>
                                    <TableCell className={styles.tableCell}>{item.id}</TableCell>
                                    {
                                        // Test button on files to open right drawer
                                        item.file && (
                                            <TableCell className={styles.tableCell}>
                                                <Button variant="contained" onClick={toggleDrawer}>
                                                    Properties
                                                </Button>
                                            </TableCell>
                                        )
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ p: 0, transitionDuration: '1s' }}>
                    <Routes>
                        <Route path="upload" element={<HorizontalLinearStepper />} />
                        <Route path="on" element={<BasicTimeline />} />
                        <Route path="files" element={<FileBrowser />} />
                    </Routes>
                </Box>
            </Box>
        </>
    );
};

export default FileTable;
