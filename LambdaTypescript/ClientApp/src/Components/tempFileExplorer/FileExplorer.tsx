import { useEffect, useState } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import { useAppSelector } from '../../app/state-management/hooks';
import DirectoryBreadcrumbs from '../directoryBreadcrumbs/DirectoryBreadcrumbs';
import FileTable from '../table/FileTable';
import styles from './FileExplorer.module.scss';
import DirectoryProvider from '../contexts/directoryContext';
import LeftPanel from '../sidePanel/LeftPanel';
import RightPanel from '../sidePanel/RightPanel';
import { Button } from '@mui/material';
import { toggleBottomDrawerIsOpen } from '../../app/state-management/drawer/drawer-slice';
import useApi from '../../hooks/useApi';

/**
 * Component to display the content of the app, including all side panels
 */
const ContentContainer = () => {
    const state = useAppSelector((state) => state);
    const { dispatch } = useApi(state);
    const [leftPanelSize, setLeftPanelSize] = useState<number>(1);
    const [rightPanelSize, setRightPanelSize] = useState<number>(1);
    const [bottomPanelSize, setBottomPanelSize] = useState<number>(1);
    const toggleDrawer = () => {
        dispatch(toggleBottomDrawerIsOpen());
    };

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
        if (state.drawer.leftDrawerIsOpen) {
            onMaximize(leftPanelSize, setLeftPanelSize);
        } else if (!state.drawer.leftDrawerIsOpen) {
            onMinimize(leftPanelSize, setLeftPanelSize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.drawer.leftDrawerIsOpen]);

    useEffect(() => {
        if (state.drawer.rightDrawerIsOpen) {
            onMaximize(rightPanelSize, setRightPanelSize);
        } else if (!state.drawer.rightDrawerIsOpen) {
            onMinimize(rightPanelSize, setRightPanelSize);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.drawer.rightDrawerIsOpen]);

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
            <ReflexContainer orientation="horizontal">
                <ReflexElement>
                    <ReflexContainer orientation="vertical">
                        <ReflexElement>
                            <ReflexContainer orientation="vertical">
                                <ReflexElement size={leftPanelSize}>
                                    <LeftPanel />
                                </ReflexElement>
                                <ReflexSplitter
                                    propagate
                                    className={!state.drawer.leftDrawerIsOpen ? styles.hideSplitter : ''}
                                />
                                <ReflexElement className="middle-pane" flex={1}>
                                    <DirectoryBreadcrumbs state={state} />
                                    {/* Test button for bottom drawer */}
                                    <Button onClick={toggleDrawer}>Expand Footer</Button>
                                    <FileTable state={state} />
                                </ReflexElement>
                            </ReflexContainer>
                        </ReflexElement>
                        <ReflexSplitter
                            propagate
                            className={!state.drawer.rightDrawerIsOpen ? styles.hideSplitter : ''}
                        />
                        <ReflexElement size={rightPanelSize} direction={-1}>
                            <RightPanel />
                        </ReflexElement>
                    </ReflexContainer>
                </ReflexElement>
                <ReflexSplitter propagate className={!state.drawer.bottomDrawerIsOpen ? styles.hideSplitter : ''} />
                <ReflexElement size={bottomPanelSize} direction={-1}>
                    Footer
                </ReflexElement>
            </ReflexContainer>
        </DirectoryProvider>
    );
};

export default ContentContainer;
