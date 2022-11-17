import { configureStore } from '@reduxjs/toolkit';
import DrawerReducer from './drawer/drawer-slice';
import BannerReducer from './banner/banner-slice';
import UploaderReducer from './file-management/uploader/uploader-slice';
import NavBreadcrumbsReducer from './nav-breadcrumbs/nav-breadcrumbs-slice';
import FileBrowserReducer from './file-management/file-browser/file-browser-slice';
import UserReducer from './user/user-slice';
import IntranetDocumentsReducer from './intranet-documents/intranet-documents-slice';

import { fileManagementServicesSlice } from './file-management/services/file-management-services-slice';
export const store = configureStore({
    reducer: {
        drawer: DrawerReducer,
        banner: BannerReducer,
        uploader: UploaderReducer,
        fileBrowser: FileBrowserReducer,
        navBreadcrumbs: NavBreadcrumbsReducer,
        [fileManagementServicesSlice.reducerPath]: fileManagementServicesSlice.reducer,
        user: UserReducer,
        intranetDocuments: IntranetDocumentsReducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(fileManagementServicesSlice.middleware);
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
