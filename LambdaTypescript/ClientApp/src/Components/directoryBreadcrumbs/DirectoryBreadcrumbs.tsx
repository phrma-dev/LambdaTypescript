import React, { useContext } from 'react';
import { Box, Breadcrumbs, Link } from '@mui/material';
import { Home } from '@mui/icons-material';
import { directoryContext, Folder } from '../contexts/directoryContext';
import useApi from '../../hooks/useApi';
import style from './DirectoryBreadcrumbs.module.scss';

interface BreadcrumbProps {
    state: any;
}

const DirectoryBreadcrumbs: React.FC<BreadcrumbProps> = ({ state }) => {
    const { path, setPath, setIsHome } = useContext(directoryContext);
    const { _getTeamChannelDriveItems, _getTeamDriveRootItems } = useApi(state);

    const onClick = (e: any) => {
        if (e.target?.id === 'Home') {
            setIsHome(true);
        } else {
            if (e.target?.id === path[1].id) {
                _getTeamDriveRootItems(e.target.id);
            } else {
                _getTeamChannelDriveItems(e.target?.id);
            }
            const newPath = path.slice(0, path.findIndex((index: Folder) => index.id === e.target.id) + 1);
            setPath(newPath);
        }
    };

    return (
        <Box sx={{ p: 1, borderBottom: '1px solid gray' }} className={style.breadcrumbContainer}>
            <Breadcrumbs aria-label="breadcrumb">
                {path.map((item: Folder) => (
                    <Link
                        id={item.name === 'Home' ? 'Home' : item.id}
                        underline="hover"
                        style={{ color: 'black !important' }}
                        onClick={onClick}
                        className={style.link}
                        sx={{ display: 'flex', alignItems: 'center' }}
                    >
                        {item.name === 'Home' && <Home sx={{ mr: 0.5 }} className={style.icon} />}
                        {item.name}
                    </Link>
                ))}
            </Breadcrumbs>
        </Box>
    );
};

export default DirectoryBreadcrumbs;
