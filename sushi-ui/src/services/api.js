const API_URL = process.env.REACT_APP_API_URL;

// Common headers and request options
export const commonOptions = {
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

export const loginWithGoogle = async (accessToken) => {
  try {
    console.log("Calling login API...");
    const response = await fetch(`${API_URL}/login`, {
      ...commonOptions,
      method: 'POST',
      body: JSON.stringify({ token: accessToken }),
    });

    console.log("Login response headers:", Object.fromEntries(response.headers));
    console.log("Login response status:", response.status);

    const data = await response.json();
    console.log("Login API Response:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      throw data;
    }

    // Log cookies after login (for debugging)
    console.log("Document cookies after login:", document.cookie);

    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getDashboardData = async () => {
  try {
    console.log('Calling dashboard API with cookies...');
    
    const response = await fetch(`${API_URL}/dashboard`, {
      ...commonOptions,
      method: 'GET',
    });
    
    console.log('Dashboard API response status:', response.status);
    
    if (response.status === 401) {
      throw new Error('Unauthorized');
    }
    
    if (!response.ok) {
      throw new Error('Failed to fetch dashboard data');
    }
    
    const data = await response.json();
    console.log('Dashboard API response data:', {
      organization: data.organization,
      campaigns: data.campaigns?.length
    });

    // Validate organization data
    if (!data.organization || !data.organization.name) {
      console.warn('Missing or invalid organization data in response');
    }

    return data;
  } catch (error) {
    console.error('Dashboard API error:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    console.log('Checking auth status with cookies...');
    // Log cookies before making request (for debugging)
    console.log("Document cookies before status request:", document.cookie);

    const response = await fetch(`${API_URL}/auth/status`, {
      ...commonOptions,
      method: 'GET',
    });
    
    console.log('Auth status response:', response.status);
    console.log('Auth status headers:', Object.fromEntries(response.headers));

    // Handle 401 specifically
    if (response.status === 401) {
      throw new Error('Not authenticated');
    }
    
    if (!response.ok) {
      throw new Error('Failed to check auth status');
    }
    
    const data = await response.json();
    console.log('Auth status success:', data);
    return data;
  } catch (error) {
    // If it's a CORS error or network error, log it but still treat as not authenticated
    if (error.name === 'TypeError' || error.message.includes('NetworkError')) {
      console.error('Network or CORS error:', error);
      throw new Error('Not authenticated');
    }
    console.error('Auth status check failed:', error);
    throw error;
  }
}; 