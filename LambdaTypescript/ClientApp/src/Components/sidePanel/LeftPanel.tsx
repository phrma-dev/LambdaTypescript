import { Link } from 'react-router-dom';
import { Box, Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import * as muiIcon from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../app/state-management/hooks';
import { toggleLinkGroup } from '../../app/state-management/drawer/drawer-slice';
import { updateNavBreadcrumbs } from '../../app/state-management/nav-breadcrumbs/nav-breadcrumbs-slice';

/**
 * Component for the left nav bar
 */
const LeftPanel = () => {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    return (
        <Box sx={{ overflow: 'auto', mt: 1 }}>
            <List
                disablePadding
                subheader={
                    <ListSubheader
                        disableGutters
                        disableSticky
                        sx={{
                            color: 'neutral.500',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            lineHeight: 2.5,
                            ml: 2,
                            textTransform: 'uppercase',
                        }}
                    >
                        Employee
                    </ListSubheader>
                }
            >
                <ListItemButton
                    onClick={() => {
                        dispatch(toggleLinkGroup(0));
                    }}
                >
                    <ListItemIcon style={{ minWidth: 35 }}>
                        <muiIcon.Person />
                    </ListItemIcon>
                    <ListItemText primary="Employee" />
                    {state.drawer.drawerLinkGroups[0].isOpen ? <muiIcon.ExpandLess /> : <muiIcon.ExpandMore />}
                </ListItemButton>
                <Collapse in={state.drawer.drawerLinkGroups[0].isOpen} timeout="auto" unmountOnExit>
                    <Link to="/on" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton
                            onClick={() => {
                                dispatch(updateNavBreadcrumbs(['Employee', 'Onboarding']));
                            }}
                        >
                            <ListItemIcon style={{ minWidth: 35 }}></ListItemIcon>
                            <ListItemText sx={{ pl: 1 }} primary="Onboarding" />
                        </ListItemButton>
                    </Link>
                </Collapse>
            </List>
            <Divider />
            <List
                disablePadding
                subheader={
                    <ListSubheader
                        disableGutters
                        disableSticky
                        sx={{
                            color: 'neutral.500',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            lineHeight: 2.5,
                            ml: 2,
                            textTransform: 'uppercase',
                        }}
                    >
                        Site Management
                    </ListSubheader>
                }
            >
                <ListItemButton
                    onClick={() => {
                        dispatch(toggleLinkGroup(1));
                    }}
                >
                    <ListItemIcon style={{ minWidth: 35 }}>
                        <muiIcon.Inbox />
                    </ListItemIcon>
                    <ListItemText primary="Site Management" />
                    {state.drawer.drawerLinkGroups[1].isOpen ? <muiIcon.ExpandLess /> : <muiIcon.ExpandMore />}
                </ListItemButton>
                <Collapse in={state.drawer.drawerLinkGroups[1].isOpen} timeout="auto" unmountOnExit>
                    <Link to="/files" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton
                            onClick={() => {
                                dispatch(updateNavBreadcrumbs(['Site Management', 'File Browser']));
                            }}
                        >
                            <ListItemIcon style={{ minWidth: 35 }} />
                            <ListItemText sx={{ pl: 1 }} primary="Files" />
                        </ListItemButton>
                    </Link>
                    <Link to="/upload" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <ListItemButton
                            onClick={() => {
                                dispatch(updateNavBreadcrumbs(['Site Management', 'Upload Files']));
                            }}
                        >
                            <ListItemIcon style={{ minWidth: 35 }} />
                            <ListItemText sx={{ pl: 1 }} primary="Upload Files" />
                        </ListItemButton>
                    </Link>
                </Collapse>
            </List>
        </Box>
    );
};

export default LeftPanel;
