const API_BASE_URL = 'http://localhost:8000/api/v1';

export const loginWithGoogle = async (accessToken) => {
  try {
    console.log("Calling login API...");
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      throw data; // This will contain the error detail from your Python backend
    }

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Make sure to re-throw the error
  }
}; 