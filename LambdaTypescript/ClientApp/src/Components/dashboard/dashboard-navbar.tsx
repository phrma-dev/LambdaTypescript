import React from 'react';
import type { FC } from 'react';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { AppBarProps, CircularProgress } from '@mui/material';
import { AppBar, Avatar, Badge, Box, ButtonBase, IconButton, Toolbar, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as MuiIcon from '@mui/icons-material';
import { AccountPopover } from '../account-popover';
import { ContactsPopover } from '../contacts-popover';
import { ContentSearchDialog } from '../content-search-dialog';
import { NotificationsPopover } from '../notifications-popover';
import { LanguagePopover } from '../language-popover';
import { useAppDispatch, useAppSelector } from '../../app/state-management/hooks';
import { setPreferredTheme } from '../../app/state-management/user/user-slice';
import { Menu as MenuIcon, Alarm as BellIcon, Search as SearchIcon, SupervisedUserCircle as UserCircle, SupervisedUserCircle as UsersIcon } from '@mui/icons-material';
import * as muiIcons from '@mui/icons-material';




const AccountButton = () => {
    const state = useAppSelector((state: any) => state);
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    // To get the user from the authContext, you can use
    // `const { user } = useAuth();`
    const user = {
      avatar: state.user.profile.userPhoto,
      name: state.user.profile.firstName + " " + state.user.profile.lastName,
      officeLocation : state.user.profile.officeLocation
    };

    const handleOpenPopover = (): void => {
        setOpenPopover(true);
    };

    const handleClosePopover = (): void => {
        setOpenPopover(false);
    };

    return (
        <>
            <Box
                component={ButtonBase}
                onClick={handleOpenPopover}
                ref={anchorRef}
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: 2,
                }}
        >
 
              <Avatar
                sx={{
                  height: 40,
                  width: 40,
                }}
                src={user.avatar}
              >
                <MuiIcon.VerifiedUser fontSize="small" />
              </Avatar>
              
           
            </Box>
            <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
        </>
    );
};


interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

type Language = 'en' | 'de' | 'es';

const languages: Record<Language, string> = {
  en: '/static/icons/uk_flag.svg',
  de: '/static/icons/de_flag.svg',
  es: '/static/icons/es_flag.svg'
};

const DashboardNavbarRoot =
  styled(AppBar)(
    ({ theme }) => ({
      backgroundColor: theme.palette.background.paper,
      ...(
        theme.palette.mode == "light"
          ? {
            boxShadow: theme.shadows[3]
          }
          : {
            backgroundColor: theme.palette.background.paper,
            borderBottomColor: theme.palette.divider,
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            boxShadow: 'none'
          }
      )
    })
  );


 



const ThemeToggleButton = () => {
  const state = useAppSelector((state: any) => state);
  const dispatch = useAppDispatch();
  return (
    <>
      <IconButton
        onClick={() => {
          dispatch(setPreferredTheme(state.user.userPreferences.themeMode == 'light' ? 'dark' : 'light'))
        }}
        sx={{ ml: 1 }}
         >
        <muiIcons.ShieldMoonOutlined />
      </IconButton>
    </>
  )
}

const LanguageButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton
        onClick={handleOpenPopover}
        ref={anchorRef}
        sx={{ ml: 1 }}
      >
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%'
            }
          }}
        >
          <img
            alt=""
            src={languages[i18n.language as Language]}
          />
        </Box>
      </IconButton>
      <LanguagePopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenSearchDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton
          onClick={handleOpenSearchDialog}
          sx={{ ml: 1 }}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog
        onClose={handleCloseSearchDialog}
        open={openDialog}
      />
    </>
  );
};

const ContactsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton
          onClick={handleOpenPopover}
          sx={{ ml: 1 }}
          ref={anchorRef}
        >
          <UsersIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContactsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        open={openPopover}
      />
    </>
  );
};

const NotificationsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [unread, setUnread] = useState<number>(0);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  const handleUpdateUnread = (value: number): void => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton
          ref={anchorRef}
          sx={{ ml: 1 }}
          onClick={handleOpenPopover}
        >
          <Badge
            color="error"
            badgeContent={unread}
          >
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;
  const state = useAppSelector((state: any) => state);
  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 280
          },
          width: {
            lg: 'calc(100% - 280px)'
          }
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <ThemeToggleButton />
          <ContentSearchButton />
          <ContactsButton />
          <NotificationsButton />
          <AccountButton />
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};
