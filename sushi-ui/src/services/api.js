const API_URL = process.env.REACT_APP_API_URL || '';

// Common headers and request options
export const commonOptions = {
  // Comment out credentials for now
  // credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
};

// Add a helper function to ensure the API URL is valid
const getFullApiUrl = (endpoint) => {
  if (!API_URL) {
    console.error('API_URL is not defined in environment variables');
    return '';
  }
  
  // Remove trailing slash from API_URL if it exists
  const baseUrl = API_URL.endsWith('/') ? API_URL.slice(0, -1) : API_URL;
  // Add leading slash to endpoint if it doesn't exist
  const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  
  return `${baseUrl}${formattedEndpoint}`;
};

export const loginWithGoogle = async (accessToken) => {
  try {
    if (!accessToken) {
      console.error('No access token provided for Google login');
      throw new Error('Missing access token');
    }
    
    console.log("Calling login API with token:", accessToken.substring(0, 10) + '...');
    
    const url = getFullApiUrl('login');
    console.log("Login API URL:", url);
    
    const response = await fetch(url, {
      ...commonOptions,
      method: 'POST',
      body: JSON.stringify({ token: accessToken }),
      // Comment out credentials for now
      // credentials: 'include',
    });

    console.log("Login response status:", response.status);
    console.log("Login response headers:", Object.fromEntries(response.headers));

    const data = await response.json();
    console.log("Login API Response:", data);

    if (!response.ok) {
      console.error("API Error:", data);
      throw data;
    }

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

export const checkAuthStatus = async (shop) => {
  try {
    console.log('Checking auth status with cookies...');
    // Log cookies before making request (for debugging)
    console.log("Document cookies before status request:", document.cookie);
    
    // Construct the API URL conditionally based on the presence of the shop parameter
    const apiUrl = shop ? `${API_URL}/auth/status?shop=${shop}` : `${API_URL}/auth/status`;
    
    const response = await fetch(apiUrl, {
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