import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Documentation from './pages/Documentation';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/forgot-password" element={<ForgotPassword/>} />
                <Route path="/documentation" element={<Documentation/>} />
                <Route path="/chat" element={
                    <PrivateRoute>
                    <ChatRoom />
                    </PrivateRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}

export default App;