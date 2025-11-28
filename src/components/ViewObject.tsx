import { useParams } from 'react-router-dom';
import { CircularProgress, styled } from '@mui/material';
import ColorPalette from './ColorPalette';
import type { RandomObject } from '../app/types';
import { useGetObjectQuery } from '../features/object/objectApiSlice';

const ViewObject = () => {
    const { objectId } = useParams();

    console.log('objectId:', objectId);

    const { data, isError, isLoading } = useGetObjectQuery(objectId as string);

    if (isLoading) {
        return <CircularProgress color='secondary' />;
    }

    const object = data?.data as RandomObject;

    if (isError || !data || data.errorMessage) {
        return <div>Something went wrong. Please reload.</div>;
    }

    return (
        <div>
            <ObjectImage src={object.primaryImageSmall} alt={object.title} />
            <div>
                <i>{object.title}</i>
            </div>
            <div>{object.artistDisplayName}</div>
            <div>{object.objectDate}</div>
            <div>{object.country}</div>
            <ColorPalette palette={object.palette as string[]} />
        </div>
    );
};

const ObjectImage = styled('img')(() => ({
    maxWidth: '24rem',
}));

export default ViewObject;
