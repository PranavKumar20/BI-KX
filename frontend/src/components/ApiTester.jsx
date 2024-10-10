import React from 'react';

const ApiTester = ({ coin, setCoin, handleApiCall }) => {
  return (
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
  );
};

export default ApiTester;
