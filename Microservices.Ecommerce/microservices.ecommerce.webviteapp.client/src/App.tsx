import { lazy, useEffect } from "react";
import { themeChange } from 'theme-change'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Documentation = lazy(() => import('./pages/Documentation'));


const App = () => {
    useEffect(() => {
        // 👆 daisy UI themes initialization
        themeChange(false)
      }, [])
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/documentation" element={<Documentation />} />
                    {/* Place new routes over this */}
                    <Route path="/app/*" element={<Layout />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;