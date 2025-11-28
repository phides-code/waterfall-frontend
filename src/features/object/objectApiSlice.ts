import { createApi } from '@reduxjs/toolkit/query/react';
import { createAwsSignedBaseQuery } from '../../app/awsSignedBaseQuery';
import type { RandomObject } from '../../app/types';

interface ObjectApiResponse {
    data: RandomObject | null;
    errorMessage: string | null;
}

const PATH = 'artworks';

export const objectApiSlice = createApi({
    baseQuery: createAwsSignedBaseQuery({
        baseUrl: import.meta.env.VITE_SERVICE_URL as string,
        identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID as string,
    }),
    reducerPath: `${PATH}Api`,
    endpoints: (build) => ({
        getObject: build.query<ObjectApiResponse, string>({
            query: (objectId) => `${PATH}/${objectId}`,
        }),
    }),
});

export const { useGetObjectQuery } = objectApiSlice;
