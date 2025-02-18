const API_URL = process.env.REACT_APP_API_URL;

export const loginWithGoogle = async (accessToken) => {
  try {
    const apiUrl = `${process.env.REACT_APP_API_URL}/login`;
    console.log("Calling login API at:", apiUrl); // Debug log

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ token: accessToken }),
    });

    // Log response headers for debugging
    console.log("Response headers:", Object.fromEntries(response.headers.entries()));

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