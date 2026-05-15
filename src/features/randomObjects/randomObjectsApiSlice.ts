import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RandomObject } from '../../app/types';

interface RandomObjectsApiResponse {
    data: RandomObject[] | null;
    errorMessage: string | null;
}

const PATH = 'artworks';

export const randomObjectsApiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_SERVICE_URL as string,
    }),
    reducerPath: `${PATH}RandomApi`,
    endpoints: (build) => ({
        getRandomObjects: build.query<RandomObjectsApiResponse, string>({
            query: (departmentId) => `/random/${departmentId}`,
        }),
    }),
});

export const { useGetRandomObjectsQuery } = randomObjectsApiSlice;
