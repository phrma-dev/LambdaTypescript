import React from 'react';
import { AppBar, CardActionArea, Toolbar, Typography } from '@mui/material';
import { toggleLeftDrawerIsOpen } from '../../app/state-management/drawer/drawer-slice';
import { useAppSelector, useAppDispatch } from '../../app/state-management/hooks';

import styles from './Banner.module.scss';

/**
 * Component that displays page header banner with expandable menu
 */
const Banner = () => {
    const state = useAppSelector((state) => state);
    const dispatch = useAppDispatch();

    const toggleDrawer = () => {
        dispatch(toggleLeftDrawerIsOpen());
    };

    return (
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar
                className={styles.muiToolbar}
                onClick={() => {
                    toggleDrawer();
                }}
            >
                <CardActionArea className={styles.drawerToggle}>
                    <div className={styles.menu}>
                        <div
                            className={[styles.hamburger, state.drawer.leftDrawerIsOpen ? styles.active : ''].join(' ')}
                        ></div>
                    </div>
                </CardActionArea>
                <Typography variant="h6" noWrap component="div">
                    PhRMA Inside
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Banner;
