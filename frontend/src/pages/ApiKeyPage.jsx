import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import API_BASE_URL from '../config/ApiConfig';

const ApiKeyPage = () => {
    const { user } = useContext(AuthContext);
    const [newApiKey, setNewApiKey] = useState('');
    const [allApiKeys, setAllApiKeys] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copySuccess, setCopySuccess] = useState(null); 

    const fetchApiKeys = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/apiKeys`, {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            const data = await response.json();
            if (data.apiKeys) {
                setAllApiKeys(data.apiKeys);
            } else {
                setError('Failed to fetch API keys.');
            }
        } catch (err) {
            setError('Error fetching API keys.');
        }
    };

    useEffect(() => {
        fetchApiKeys();
    }, []);

    const generateKey = async () => {
        setLoading(true);
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
                fetchApiKeys();
            }
        } catch (error) {
            console.error('API key generation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (key) => {
        navigator.clipboard.writeText(key);
        setCopySuccess(key);
        setTimeout(() => setCopySuccess(null), 2000); 
    };

    return (
        <div>
            <Navbar />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Generate API Key</h1>

                <div className="p-6 bg-white shadow-lg rounded-lg max-w-lg mx-auto w-full">
                    <h1 className="text-2xl font-bold mb-4 text-center">Manage Your API Keys</h1>

                    <button
                        className="bg-green-500 text-white py-2 px-6 rounded-md w-full hover:bg-green-600 transition duration-300"
                        onClick={generateKey}
                        disabled={loading}
                    >
                        {loading ? 'Generating...' : 'Generate API Key'}
                    </button>

                    {newApiKey && (
                        <div className="mt-4 p-4 bg-gray-100 rounded-md">
                            <p className="text-gray-700 font-semibold">Your new API Key:</p>
                            <pre className="bg-white p-2 mt-2 rounded-md">{newApiKey}</pre>
                        </div>
                    )}

                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-2">Your API Keys:</h2>
                        {error ? (
                            <p className="text-red-500">{error}</p>
                        ) : (
                            <ul className="bg-gray-100 p-4 rounded-md">
                                {allApiKeys.length > 0 ? (
                                    allApiKeys.map((key, index) => (
                                        <li key={index} className="flex justify-between items-center bg-white mb-2 p-2 rounded-md">
                                            <span className="mr-4">{key}</span>
                                            <button
                                                onClick={() => handleCopy(key)}
                                                className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600 transition duration-300"
                                            >
                                                Copy
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-gray-600">No API keys found.</p>
                                )}
                            </ul>
                        )}
                    </div>

                    {copySuccess && (
                        <div className="mt-2 text-green-500 font-semibold">
                            {`API Key "${copySuccess}" copied to clipboard!`}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ApiKeyPage;
