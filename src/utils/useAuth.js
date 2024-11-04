import { useState, useEffect } from "react";

const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    return localStorage.getItem("refreshToken") || null;
  });

  const [menu_permissions, setMenuPermissions] = useState(() => {
    const savedPermissions = localStorage.getItem("menu_permissions");
    return savedPermissions ? JSON.parse(savedPermissions) : null;
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("menu_permissions", JSON.stringify(menu_permissions));
  }, [user, accessToken, refreshToken, menu_permissions]);

  const loginUser = (userInfo, tokens, menu_permissions) => {
    setUser(userInfo);
    if (tokens) {
      const { accessToken, refreshToken } = tokens;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    }
    setMenuPermissions(menu_permissions);
  };

  const logoutUser = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    setMenuPermissions(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("menu_permissions");
    window.location.reload();
  };

  return {
    user,
    accessToken,
    refreshToken,
    loginUser,
    logoutUser,
    menu_permissions,
  };
};

export default useAuth;
