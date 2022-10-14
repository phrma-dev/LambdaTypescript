import React, { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { TFunction, useTranslation } from 'react-i18next';
import { ButtonBase, Theme } from '@mui/material';
import { Avatar, Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery, Link } from '@mui/material';
import * as MuiIcon from '@mui/icons-material';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from '../organization-popover';
import { Scrollbar } from '../scrollbar';
import { AccountPopover } from '../account-popover';

interface DashboardSidebarProps {
    onClose?: () => void;
    open?: boolean;
}

interface Item {
    title: string;
    children?: Item[];
    chip?: ReactNode;
    icon?: ReactNode;
    path?: string;
}

interface Section {
    title: string;
    items: Item[];
}

const AccountButton = () => {
    const anchorRef = useRef<HTMLButtonElement | null>(null);
    const [openPopover, setOpenPopover] = useState<boolean>(false);
    // To get the user from the authContext, you can use
    // `const { user } = useAuth();`
    const user = {
        avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
        name: 'Anika Visser',
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

const getSections = (t: TFunction): Section[] => [
    {
        title: t('General'),
        items: [
            {
                title: t('Overview'),
                path: '/',
                icon: <MuiIcon.Home fontSize="small" />,
            },
            {
                title: t('Dashboard'),
                path: '/Dash',
                icon: <MuiIcon.Dashboard fontSize="small" />,
            },
            {
                title: t('File Explorer'),
                path: '/Explorer',
                icon: <MuiIcon.Folder fontSize="small" />,
            },
        ],
    },
    //{
    //  title: t('Management'),
    //  items: [
    //    {
    //      title: t('Customers'),
    //      path: '/dashboard/customers',
    //      icon: <MuiIcon.VerifiedUser fontSize="small" />,
    //      children: [
    //        {
    //          title: t('List'),
    //          path: '/dashboard/customers'
    //        },
    //        {
    //          title: t('Details'),
    //          path: '/dashboard/customers/1'
    //        },
    //        {
    //          title: t('Edit'),
    //          path: '/dashboard/customers/1/edit'
    //        }
    //      ]
    //    }
    //  ]
    //}
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
    const { onClose, open } = props;
    const { t } = useTranslation();
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
        noSsr: true,
    });
    const sections = useMemo(() => getSections(t), [t]);
    const organizationsRef = useRef<HTMLButtonElement | null>(null);
    const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState<boolean>(false);

    const handlePathChange = () => {
        if (open) {
            onClose?.();
        }
    };

    const handleOpenOrganizationsPopover = (): void => {
        setOpenOrganizationsPopover(true);
    };

    const handleCloseOrganizationsPopover = (): void => {
        setOpenOrganizationsPopover(false);
    };

    const content = (
        <>
            <Scrollbar
                sx={{
                    height: '100%',
                    '& .simplebar-content': {
                        height: '100%',
                    },
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                    }}
                >
                    <div>
                        <Box sx={{ p: 3 }}>
                            <Link href="/">
                                <img
                                    src="https://nationalhealthcouncil.org/wp-content/uploads/2019/12/phrma_2012logo-02.jpg"
                                    style={{
                                        height: 96,
                                        borderRadius: 8,
                                    }}
                                />
                            </Link>
                        </Box>
                        <Box sx={{ px: 2 }}>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 0.04)',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    px: 3,
                                    py: '11px',
                                    borderRadius: 1,
                                }}
                            >
                                <div>
                                    <AccountButton />
                                </div>
                            </Box>
                        </Box>
                    </div>
                    <Divider
                        sx={{
                            borderColor: '#2D3748', // dark divider
                            my: 3,
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        {sections.map((section) => (
                            <DashboardSidebarSection
                                key={section.title}
                                path={''}
                                sx={{
                                    mt: 2,
                                    '& + &': {
                                        mt: 2,
                                    },
                                }}
                                {...section}
                            />
                        ))}
                    </Box>
                    {/*<Divider*/}
                    {/*  sx={{*/}
                    {/*    borderColor: '#2D3748'  // dark divider*/}
                    {/*  }}*/}
                    {/*/>*/}
                    {/*<Box sx={{ p: 2 }}>*/}
                    {/*  <Typography*/}
                    {/*    color="neutral.100"*/}
                    {/*    variant="subtitle2"*/}
                    {/*  >*/}
                    {/*    {t('Need Help?')}*/}
                    {/*  </Typography>*/}
                    {/*  <Typography*/}
                    {/*    color="neutral.500"*/}
                    {/*    variant="body2"*/}
                    {/*  >*/}
                    {/*    {t('Check our docs')}*/}
                    {/*  </Typography>*/}

                    {/*    <Button*/}
                    {/*      color="secondary"*/}
                    {/*      component="a"*/}
                    {/*      fullWidth*/}
                    {/*      sx={{ mt: 2 }}*/}
                    {/*      variant="contained"*/}
                    {/*    >*/}
                    {/*      {t('Documentation')}*/}
                    {/*    </Button>*/}

                    {/*</Box>*/}
                </Box>
            </Scrollbar>
            <OrganizationPopover
                anchorEl={organizationsRef.current}
                onClose={handleCloseOrganizationsPopover}
                open={openOrganizationsPopover}
            />
        </>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: 'neutral.900',
                        borderRightColor: 'divider',
                        borderRightStyle: 'solid',
                        borderRightWidth: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
                        color: '#FFFFFF',
                        width: 280,
                    },
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: 'neutral.900',
                    color: '#FFFFFF',
                    width: 280,
                },
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
