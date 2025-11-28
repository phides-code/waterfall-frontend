import { createApi } from '@reduxjs/toolkit/query/react';
import { createAwsSignedBaseQuery } from '../../app/awsSignedBaseQuery';
import type { RandomObject } from '../../app/types';

interface RandomObjectsApiResponse {
    data: RandomObject[] | null;
    errorMessage: string | null;
}

const PATH = 'artworks';

export const randomObjectsApiSlice = createApi({
    baseQuery: createAwsSignedBaseQuery({
        baseUrl: import.meta.env.VITE_SERVICE_URL as string,
        identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID as string,
    }),
    reducerPath: `${PATH}Api`,
    endpoints: (build) => ({
        getRandomObjects: build.query<RandomObjectsApiResponse, string>({
            query: (departmentId) => `${PATH}/random/${departmentId}`,
        }),
    }),
});

export const { useGetRandomObjectsQuery } = randomObjectsApiSlice;
