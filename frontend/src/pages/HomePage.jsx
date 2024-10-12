import React, { useState } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from '../config/ApiConfig';

const HomePage = () => {
  const [coin, setCoin] = useState(''); 
  const [result, setResult] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [apiKey, setApiKey] = useState(''); 
  const [error, setError] = useState(''); 
  const [copySuccess, setCopySuccess] = useState('');  
  const [apiEndpoint, setApiEndpoint] = useState(''); 

  const handleApiCall = async (endpoint) => {
    if (!coin) {
      setError('Please select a cryptocurrency.');
      return;
    }
    if (!apiKey) {
      setError('Please enter your API key.');
      return;
    }
    setError('');
    setApiEndpoint(endpoint); 
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/${endpoint}?coin=${coin}`, {
        headers: {
          'api-key': apiKey,
        },
      });
      const data = await response.json(); 
      setResult(data); 
    } catch (error) {
      console.error('API request failed:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess('Copied to clipboard!'); 
    setTimeout(() => setCopySuccess(''), 2000); 
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col md:flex-row justify-between min-h-screen bg-gray-100 pt-8">
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          <h1 className="text-4xl font-bold mb-6">Cryptocurrency API Tester</h1>
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-md mb-4 w-full max-w-lg text-center">
              {error}
            </div>
          )}
          <div className="mb-4 w-full max-w-lg">
            <label className="block mb-2 text-gray-700">Enter API Key:</label>
            <input
              type="text"
              className="border p-2 rounded w-full"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API Key"
            />
          </div>
          <div className="p-4 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Test Cryptocurrency API</h2>
            <div className="mb-4">
              <label className="block mb-2 text-gray-700">Select Coin:</label>
              <select
                className="border p-2 rounded w-full"
                value={coin}
                onChange={(e) => setCoin(e.target.value)}
              >
                <option value="">Select a Coin</option>
                <option value="bitcoin">Bitcoin</option>
                <option value="ethereum">Ethereum</option>
                <option value="matic-network">Matic</option>
              </select>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={() => handleApiCall('stats')}
              >
                Get Stats
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={() => handleApiCall('deviation')}
              >
                Get Deviation
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center w-full md:w-1/2 p-4">
          {copySuccess && (
            <div className="bg-green-500 text-white p-3 rounded-md mb-4 w-full max-w-lg text-center">
              {copySuccess}
            </div>
          )}
          <div className="mt-6 bg-white shadow-md rounded-md p-4 w-full max-w-lg">
            <h3 className="text-lg font-bold">API Result</h3>
            {loading ? (
              <div className="mt-4">Loading...</div>
            ) : (
              result && (
                <pre className="text-left overflow-auto whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
              )
            )}
            {result && (
              <button
                className="bg-gray-300 text-gray-700 py-1 px-3 rounded mt-4 hover:bg-gray-400 transition"
                onClick={() => handleCopy(JSON.stringify(result, null, 2))}
              >
                Copy Result
              </button>
            )}
          </div>
          <div className="mt-6 bg-white shadow-md rounded-md p-4 w-full max-w-lg">
            <h3 className="text-lg font-bold">Curl Command</h3>
            <pre className="text-left overflow-hidden whitespace-pre-wrap">{`curl -H "api-key: ${apiKey}" ${API_BASE_URL}/api/v1/${apiEndpoint}?coin=${coin}`}</pre>
            <button
              className="bg-gray-300 text-gray-700 py-1 px-3 rounded mt-4 hover:bg-gray-400 transition"
              onClick={() =>
                handleCopy(`curl -H "api-key: ${apiKey}" ${API_BASE_URL}/api/v1/${apiEndpoint}?coin=${coin}`)
              }
            >
              Copy Curl
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
