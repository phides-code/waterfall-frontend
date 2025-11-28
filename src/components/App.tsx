import { styled } from '@mui/material';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header';
import { DepartmentProvider } from '../context/DepartmentContext';
import Departments from './Departments';
import ViewDepartment from './ViewDepartment';
import ViewObject from './ViewObject';

const App = () => {
    return (
        <Wrapper className='App'>
            <InnerWrapper>
                <BrowserRouter>
                    <Header />
                    <DepartmentProvider>
                        <Routes>
                            <Route path='/' element={<Departments />} />
                            <Route
                                path='/department/:departmentId'
                                element={<ViewDepartment />}
                            />

                            <Route
                                path='/object/:objectId'
                                element={<ViewObject />}
                            />
                        </Routes>
                    </DepartmentProvider>
                </BrowserRouter>
            </InnerWrapper>
        </Wrapper>
    );
};

const Wrapper = styled('div')(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
}));

const InnerWrapper = styled('div')(() => ({
    maxWidth: '24rem',
}));

export default App;
