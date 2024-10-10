import React, { useState, useContext } from 'react';
import ApiTester from '../components/ApiTester';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API_BASE_URL from '../config/ApiConfig';

const HomePage = () => {
  const [coin, setCoin] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');

  const handleApiCall = async (apiEndpoint) => {
    if (!coin) {
      alert('Please select a cryptocurrency.');
      return;
    }
    if (!apiKey) {
      alert('Please enter your API key.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/${apiEndpoint}?coin=${coin}`, {
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

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-6">Cryptocurrency API Tester</h1>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700">Enter API Key:</label>
          <input
            type="text"
            className="border p-2 rounded w-full max-w-lg"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API Key"
          />
        </div>
        <ApiTester coin={coin} setCoin={setCoin} handleApiCall={handleApiCall} />
        {loading ? (
          <div className="mt-4">Loading...</div>
        ) : (
          result && (
            <div className="mt-6 bg-white shadow-md rounded-md p-4 w-full max-w-lg">
              <pre className="text-left">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
