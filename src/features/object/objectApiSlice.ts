import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RandomObject } from '../../app/types';

interface ObjectApiResponse {
    data: RandomObject | null;
    errorMessage: string | null;
}

const PATH = 'artworks';

export const objectApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVICE_URL as string,
    }),
    reducerPath: `${PATH}Api`,
    endpoints: (build) => ({
        getObject: build.query<ObjectApiResponse, string>({
            query: (objectId) => `${PATH}/${objectId}`,
        }),
    }),
});

export const { useGetObjectQuery } = objectApiSlice;
