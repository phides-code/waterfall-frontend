import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CircularProgress, styled } from '@mui/material';
import { DepartmentContext } from '../context/DepartmentContext';
import type { Department, RandomObject } from '../app/types';
import { useGetRandomObjectsQuery } from '../features/randomObjects/randomObjectsApiSlice';

const ViewDepartment = () => {
    const { departmentId } = useParams();
    const departmentIdNumber = parseInt(departmentId as string);

    const { getDepartmentById } = useContext(DepartmentContext);

    const { data, isError, isLoading } = useGetRandomObjectsQuery(
        departmentId as string
    );

    const department = getDepartmentById(departmentIdNumber) as Department;
    const departmentName = department.displayName;

    if (isLoading) {
        return <CircularProgress color='secondary' />;
    }

    const randomObjects = data?.data as RandomObject[];

    if (isError || !data || data.errorMessage) {
        return <div>Something went wrong. Please reload.</div>;
    }

    return (
        <Wrapper>
            <h2>{departmentName}</h2>
            <div>
                {randomObjects.map((object) => (
                    <ObjectWrapper key={object.objectID}>
                        <StyledLink to={`/object/${object.objectID}`}>
                            <ObjectImage
                                alt={object.title}
                                src={object.primaryImageSmall}
                            />
                            <div>
                                <i>{object.title}</i>
                            </div>
                            <div>{object.artistDisplayName}</div>
                            <div>{object.objectDate}</div>
                            <div>{object.country}</div>
                        </StyledLink>
                    </ObjectWrapper>
                ))}
            </div>
        </Wrapper>
    );
};

const ObjectWrapper = styled('div')(() => ({
    marginBottom: '1rem',
}));

const Wrapper = styled('div')(() => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
}));

const StyledLink = styled(Link)(() => ({
    color: 'white',
    textDecoration: 'none',
}));

const ObjectImage = styled('img')(() => ({
    maxWidth: '24rem',
}));

export default ViewDepartment;
