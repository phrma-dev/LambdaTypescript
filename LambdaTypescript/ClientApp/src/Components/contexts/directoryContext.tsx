import React, { createContext, useEffect, useState } from 'react';

export type Folder = {
    name: string;
    id: string;
};

export type File = {
    id: string;
    name: string;
    webUrl: string;
};

export interface DirectoryContext {
    currentFolder: Folder;
    setCurrentFolder: (folder: Folder) => void;
    path: Folder[];
    setPath: (index: Folder[]) => void;
    isHome: boolean;
    setIsHome: (val: boolean) => void;
    selectedFile: File | null;
    setSelectedFile: (val: File) => void;
}

const defaultContext: DirectoryContext = {
    currentFolder: {
        name: 'Home',
        id: '',
    },
    setCurrentFolder: () => {},
    path: [
        {
            name: 'Home',
            id: '',
        },
    ],
    setPath: () => {},
    isHome: true,
    setIsHome: () => {},
    selectedFile: null,
    setSelectedFile: () => {},
};

export const directoryContext = createContext<DirectoryContext>(defaultContext);
const { Provider } = directoryContext;

const DirectoryProvider: React.FC = ({ children }) => {
    const [currentFolder, setCurrentFolder] = useState<Folder>({ name: '', id: '' });
    const [path, setPath] = useState([{ name: '', id: '' }]);
    const [isHome, setIsHome] = useState<boolean>(true);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    useEffect(() => {
        if (isHome) {
            setPath([{ name: 'Home', id: '' }]);
        } else {
            setPath([...path, currentFolder]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentFolder, isHome]);

    return (
        <Provider
            value={{ currentFolder, setCurrentFolder, path, setPath, isHome, setIsHome, selectedFile, setSelectedFile }}
        >
            {children}
        </Provider>
    );
};

export default DirectoryProvider;
