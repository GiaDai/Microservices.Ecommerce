import * as React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Counter from './components/Counter';
import FetchData from './components/FetchData';
import Login  from './components/Login';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { ApplicationState } from './store';

import './custom.css'

const App = () => {
    const isLoggingIn = useSelector((state: ApplicationState) => state.authentication?.isLoggingIn); // replace 'auth' with the name of your auth reducer

    return (
        <Layout>
            {isLoggingIn ? (
                <>
                    <Route exact path='/' component={Home} />
                    <Route path='/counter' component={Counter} />
                    <Route path='/fetch-data/:startDateIndex?' component={FetchData} />
                </>
            ) : (
                <Redirect to="/login" />
            )}
            <Route path='/login' component={Login} />
        </Layout>
    );
};

export default App;