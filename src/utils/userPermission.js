import { useState, useEffect } from "react";

const usePermissions = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = localStorage.getItem("menu_permissions");
    if (storedPermissions) {
      setPermissions(
        JSON.parse(storedPermissions)?.map((permission) =>
          permission?.toLowerCase()
        )
      );
    }
  }, []);

  const hasPermission = (item) => {
    if (typeof item === "string") {
      return permissions?.includes(item?.toLowerCase());
    }
    return false;
  };

  return { hasPermission };
};

export default usePermissions;
