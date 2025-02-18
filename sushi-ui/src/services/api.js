const API_URL = process.env.REACT_APP_API_URL;

export const loginWithGoogle = async (accessToken) => {
  try {
    console.log("Calling login API...");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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