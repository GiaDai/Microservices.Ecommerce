import { lazy, useEffect } from "react";
import { themeChange } from 'theme-change'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { QueryProvider } from './api/common/query-provider';
import { hydrateAuth, handleBeforeUnload, destroyBeforeUnload } from "./core";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import  {  clearToast } from "@features/common/toastSlice"
import PrivateRouteWrapper from './routes/PrivateRoute';

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Documentation = lazy(() => import('./pages/Documentation'));


const App = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: any) => state.toast.message);
    const type = useSelector((state: any) => state.toast.type);
    useEffect(() => {
        // 👆 daisy UI themes initialization
        hydrateAuth();
        handleBeforeUnload();
        themeChange(false);
        return () => {
            destroyBeforeUnload();
        }
      }, [])
      useEffect(() => {
        if(message !== ""){
            if(type === "success")toast.success(message)
            if(type === "error")toast.error(message)
            if(type === "info")toast.info(message)
            if(type === "warning")toast.warn(message)
            dispatch(clearToast())
            // dispatch(removeNotificationMessage())
        }
    }, [message])
    return (
        <>
        <QueryProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/documentation" element={<Documentation />} />
                    {/* Place new routes over this */}
                    <Route path="/app/*" element={<PrivateRouteWrapper><Layout /></PrivateRouteWrapper>} />
                </Routes>
            </Router>
        </QueryProvider>
        <ToastContainer 
            hideProgressBar={true}
            theme="colored"
        />
        </>
    );
}

export default App;