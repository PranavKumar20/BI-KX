# Readme to go through the submission

This is a simple Node.js and React.js application for interacting with cryptocurrency data via APIs. It includes a backend server that provides real-time crypto data and a frontend interface for user authentication, API key generation, and testing the APIs.

## Backend (Node.js)

### Features:
- **API 1: `/api/v1/stats`**
  - Fetch the latest stats for a specified cryptocurrency.
  - Required Query Param: `coin`
  - Required Header: `api-key`
  
- **API 2: `/api/v1/deviation`**
  - Fetch the standard deviation of a specified cryptocurrency's price for the last 100 records.
  - Required Query Param: `coin`
  - Required Header: `api-key`

- **Background Service**
  - Fetches cryptocurrency data every 2 hours and updates the database.

### Installation and Running the Backend

1. Clone the repository:
   ```bash
   git clone <link of this repo>
2. Navigate to the backend directory:
    ```bash
    cd backend
3. Install the dependencies:
    ```bash
    npm install
4. Create a .env file to add your environment variables (such as MongoDB connection string, secret key for JWT).
5. Start the backend server:
    ```bash
    npm start
6. The backend server will be running on `http://localhost:5000`.

## Frontend (React.js)
### Pages:
- **Login Page:**
    - Allows users to log in with their credentials.
    - On successful login, a JWT token is generated and stored in local storage for authentication purposes.
- **Signup Page:**
    - New users can sign up and create an account.
    - On successful signup, users are redirected to the homepage.
- **Homepage:**
    - Users can test the cryptocurrency APIs by selecting a coin and viewing the latest stats or deviation.
    - Users can input an API key to access the data.
- **API Keys Page:**
    - Logged-in users can generate a new API key.
    - All generated API keys associated with the logged-in user are displayed.

### Installation and Running the Frontend
1. Navigate to the fronend directory:
    ```bash
    cd frontend
2. Install the dependencies:
    ```bash
    npm install
3. Start the React Development server:
    ```bash
    npm start
4. The fornend will be available at `http://localhost:300`.

