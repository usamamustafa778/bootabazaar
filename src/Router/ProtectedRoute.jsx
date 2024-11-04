import React from "react";
import usePermissions from "../utils/userPermission";
import Unauthorized from "./Unauthorized";
import PageSeo from "../components/common/PageSeo";

const ProtectedRoute = ({
  element: Element,
  permission,
  pageTitle,
  ...rest
}) => {
  const { hasPermission } = usePermissions();

  const renderContent = () => {
    // if (!permission || hasPermission(permission)) {
    return <Element {...rest} />;
    // }
    // return <Unauthorized />;
  };

  return (
    <>
      <PageSeo title={`SiteBuilderz | ${pageTitle || "Unauthorized"}`} />
      {renderContent()}
    </>
  );
};

export default ProtectedRoute;
