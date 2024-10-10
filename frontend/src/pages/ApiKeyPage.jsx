import React, { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ApiKeyGenerator from '../components/ApiKeyGenerator';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import API_BASE_URL from '../config/ApiConfig';

const ApiKeyPage = () => {
    const { user } = useContext(AuthContext);
    const [newApiKey, setNewApiKey] = useState('');

    const generateKey = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/genApiKey`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await res.json();
            if (data.apiKey) {
                setNewApiKey(data.apiKey);
            }
        } catch (error) {
            console.error('API key generation failed:', error);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Generate API Key</h1>
                <ApiKeyGenerator generateKey={generateKey} apiKey={newApiKey} />
            </div>
            <Footer />
        </div>
    );
};

export default ApiKeyPage;
