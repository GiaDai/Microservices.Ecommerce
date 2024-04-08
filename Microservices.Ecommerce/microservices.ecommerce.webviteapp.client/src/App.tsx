import Navbar from './components/Navbar';
import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <AuthProvider>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login/>} />
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