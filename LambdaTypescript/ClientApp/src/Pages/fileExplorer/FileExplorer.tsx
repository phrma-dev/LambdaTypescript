import { useEffect, useState } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Container,
    Divider,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import DirectoryProvider from '../../Components/contexts/directoryContext';
import DirectoryBreadcrumbs from '../../Components/directoryBreadcrumbs/DirectoryBreadcrumbs';
import FileTable from '../../Components/table/FileTable';
import { toggleBottomDrawerIsOpen } from '../../app/state-management/drawer/drawer-slice';
import { useAppSelector } from '../../app/state-management/hooks';
import useApi from '../../hooks/useApi';
import LeftPanel from '../../Components/sidePanel/LeftPanel';
import styles from './FileExplorer.module.scss';

const FileExplorer = () => {
    const state = useAppSelector((state) => state);
    const { dispatch } = useApi(state);
    const [leftPanelSize, setLeftPanelSize] = useState<number>(1);
    const [rightPanelSize, setRightPanelSize] = useState<number>(1);
    const [bottomPanelSize, setBottomPanelSize] = useState<number>(1);
    const toggleDrawer = () => {
        dispatch(toggleBottomDrawerIsOpen());
    };

    useEffect(() => {
        // Restore the persistent state from local/session storage
        const value = globalThis.sessionStorage.getItem('dismiss-banner');

        if (value === 'true') {
            // setDisplayBanner(false);
        }
    }, []);

    // Function to close side panel
    const onMinimize = (panel: number, setPanel: React.Dispatch<React.SetStateAction<number>>) => {
        const update = (size: number) => {
            setPanel(size < 1 ? 1 : size);
        };

        const done = (from: number, to: number) => {
            return from < to;
        };

        animate(panel, 1, -8, done, update);
    };

    // Function to open side panel
    const onMaximize = (panel: number, setPanel: React.Dispatch<React.SetStateAction<number>>) => {
        console.log(panel);
        const update = (size: number) => {
            setPanel(size);
        };

        const done = (from: number, to: number) => {
            return from > to;
        };

        animate(panel, 240, 8, done, update);
    };

    // Animation for opening and closing of side panels
    const animate = (
        start: number,
        end: number,
        step: number,
        done: (start: number, end: number) => boolean,
        update: (size: number) => void
    ) => {
        const stepFn = () => {
            if (!done(start, end)) {
                update((start += step));

                window.requestAnimationFrame(stepFn);
            }
        };

        stepFn();
    };

    useEffect(() => {
        if (state.drawer.bottomDrawerIsOpen) {
            onMaximize(bottomPanelSize, setBottomPanelSize);
        } else if (!state.drawer.bottomDrawerIsOpen) {
            onMinimize(bottomPanelSize, setBottomPanelSize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.drawer.bottomDrawerIsOpen]);

    return (
        <DirectoryProvider>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                }}
            >
                <Container maxWidth="xl">
                    <DirectoryBreadcrumbs state={state} />
                    <FileTable state={state} />
                </Container>
            </Box>
        </DirectoryProvider>
    );
};
export default FileExplorer;
