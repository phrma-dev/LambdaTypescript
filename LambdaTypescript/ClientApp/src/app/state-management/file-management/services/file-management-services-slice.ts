import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fileManagementServicesSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://phrmadataapi.azurewebsites.net',
    }),
    endpoints(builder) {
        return {
            getFiles: builder.query<any[], any>({
                query: (formData) => ({
                    url: '/Document/GetItems',
                    method: 'POST',
                    data: formData,
                }),
            }),
        };
    },
});

export const { useGetFilesQuery } = fileManagementServicesSlice;
