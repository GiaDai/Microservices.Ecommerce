import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import ChatRoom from './pages/ChatRoom';
import Login from './pages/Login';
import PrivateRoute from './routes/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';

interface Forecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const App = () => {
    const [forecasts, setForecasts] = useState<Forecast[]>();

    useEffect(() => {
        populateWeatherData();
    }, []);

    const contents = forecasts === undefined
        ? <p className="italic"><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact" className="underline text-blue-500">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table-auto border-collapse border border-green-800">
            <thead>
                <tr>
                    <th className="border border-green-600">Date</th>
                    <th className="border border-green-600">Temp. (C)</th>
                    <th className="border border-green-600">Temp. (F)</th>
                    <th className="border border-green-600">Summary</th>
                </tr>
            </thead>
            <tbody>
                {forecasts.map(forecast =>
                    <tr key={forecast.date} className="border border-green-600">
                        <td>{forecast.date}</td>
                        <td>{forecast.temperatureC}</td>
                        <td>{forecast.temperatureF}</td>
                        <td>{forecast.summary}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    const populateWeatherData = async () => {
        const response = await fetch('weatherforecast');
        const data = await response.json();
        setForecasts(data);
    }

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