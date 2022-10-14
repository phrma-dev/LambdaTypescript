import { useContext } from 'react';
import { Box, Button, Table, TableCell, TableRow } from '@mui/material';
import { directoryContext } from '../contexts/directoryContext';
import { toggleRightDrawerIsOpen } from '../../app/state-management/drawer/drawer-slice';
import { useAppDispatch } from '../../app/state-management/hooks';

/**
 * Component for the right nav bar
 */
const RightPanel = () => {
    const { selectedFile } = useContext(directoryContext);
    const dispatch = useAppDispatch();

    const toggleDrawer = () => {
        dispatch(toggleRightDrawerIsOpen());
    };

    return (
        <Box sx={{ overflow: 'auto', mt: 1 }}>
            <Table>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>{selectedFile?.id}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>{selectedFile?.name}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>File Type</TableCell>
                    <TableCell>{selectedFile?.name.split('.')[1]}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Location</TableCell>
                    <TableCell>{selectedFile?.webUrl}</TableCell>
                </TableRow>
            </Table>
            <Button variant="contained" onClick={toggleDrawer}>
                Done
            </Button>
        </Box>
    );
};

export default RightPanel;
