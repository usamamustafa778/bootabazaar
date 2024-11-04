import { useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

// Custom hook for API calls
const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getHeaders = () => {
    const token = localStorage.getItem("accessToken");
    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const refreshToken = localStorage.getItem("refreshToken");
  const { logoutUser } = useAuth();
  const request = async ({
    method,
    url,
    data = {},
    params = {},
    attemptRefresh = true,
    headers={}
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios({
        method,
        url: `${process.env.REACT_APP_PUBLIC_API}/api/${url}`,
        headers: {...getHeaders(), ...headers},
        data,
        params,
      });
      return response.data;
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 403) &&
        attemptRefresh
      ) {
        try {
          const res = await axios.post(
            "/api/refresh_token",
            { token: refreshToken },
            {
              baseURL: process.env.REACT_APP_PUBLIC_API,
            }
          );
          localStorage.setItem("accessToken", res.data.accessToken);
          return request({ method, url, data, params, attemptRefresh: false });
        } catch (refreshError) {
          if (refreshError?.response?.status === 401) {
            logoutUser();
            return window.location.reload();
          }
          throw refreshError;
        }
      } else {
        setError(err?.response?.data?.message || "An error occurred");
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    request,
  };
};

export default useApi;
