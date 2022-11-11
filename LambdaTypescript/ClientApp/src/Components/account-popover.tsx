import type { FC } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Avatar, Box, Divider, Link, ListItemIcon, ListItemText, MenuItem, Popover, Typography } from '@mui/material';

import * as MuiIcon from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../app/state-management/hooks';
interface AccountPopoverProps {
    anchorEl: null | Element;
    onClose?: () => void;
    open?: boolean;
}

export const AccountPopover: FC<AccountPopoverProps> = (props) => {
    const { anchorEl, onClose, open, ...other } = props;
    // To get the user from the authContext, you can use
  // `const { user } = useAuth();`  

  const state = useAppSelector((state: any) => state);
    const user = {
      avatar: state.user.userPhoto,
      name: state.user.profile["givenName"] + " " + state.user.profile["surname"],
      officeLocation:  state.user.profile["officeLocation"] 
    };

    return (
        <Popover
            anchorEl={anchorEl}
            anchorOrigin={{
                horizontal: 'center',
                vertical: 'bottom',
            }}
            keepMounted
            onClose={onClose}
            open={!!open}
            PaperProps={{ sx: { width: 300 } }}
            transitionDuration={0}
            {...other}
        >
            <Box
                sx={{
                    alignItems: 'center',
                    p: 2,
                    display: 'flex',
                }}
            >
                <Avatar
                    src={user.avatar}
                    sx={{
                        height: 40,
                        width: 40,
                    }}
                >
                    <MuiIcon.VerifiedUser fontSize="small" />
                </Avatar>
                <Box
                    sx={{
                        ml: 1,
                    }}
                >
                    <Typography variant="body1">{user.name}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {user.officeLocation}
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Box sx={{ my: 1 }}>
                <MenuItem component="a" href="/dashboard/social/profile">
                    <ListItemIcon>
                        <MuiIcon.VerifiedUser fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Profile</Typography>} />
                </MenuItem>

                <MenuItem component="a" href="/dashboard/account">
                    <ListItemIcon>
                        <MuiIcon.Settings fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Settings</Typography>} />
                </MenuItem>

                <MenuItem component="a" href="/dashboard">
                    <ListItemIcon>
                        <MuiIcon.SwitchLeftOutlined fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Change organization</Typography>} />
                </MenuItem>

                <Divider />
                <MenuItem>
                    <ListItemIcon>
                        <MuiIcon.Logout fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1">Logout</Typography>} />
                </MenuItem>
            </Box>
        </Popover>
    );
};

AccountPopover.propTypes = {
    anchorEl: PropTypes.any,
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
