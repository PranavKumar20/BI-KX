import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../config/ApiConfig';

const ApiKeyGenerator = ({ generateKey, loading }) => {
  const [apiKey, setApiKey] = useState(null);
  const [allApiKeys, setAllApiKeys] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/apiKeys`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
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

    fetchApiKeys();
  }, []);

  const handleGenerateKey = async () => {
    const newKey = await generateKey();
    setApiKey(newKey);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Manage Your API Keys</h1>

      <button
        className="bg-green-500 text-white py-2 px-6 rounded-md w-full hover:bg-green-600 transition duration-300"
        onClick={handleGenerateKey}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate API Key'}
      </button>
      {apiKey && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-gray-700 font-semibold">Your new API Key:</p>
          <pre className="bg-white p-2 mt-2 rounded-md">{apiKey}</pre>
        </div>
      )}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Your API Keys:</h2>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul className="list-disc list-inside bg-gray-100 p-4 rounded-md">
            {allApiKeys.length > 0 ? (
              allApiKeys.map((key, index) => (
                <li key={index} className="p-2 bg-white mb-2 rounded-md">
                  <pre>{key}</pre>
                </li>
              ))
            ) : (
              <p className="text-gray-600">No API keys found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ApiKeyGenerator;
