import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { projectManagerRoutes, routes, templateManagerRoutes } from "./routes";
import { Home, Login, ManageProject, ManageTemplate } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "./Unauthorized";
import { Layout } from "../components";

const Router = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  return (
    <BrowserRouter>
      {storedUser ? (
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <ProtectedRoute
                    pageTitle={route.pageTitle}
                    element={route.element}
                    permission={route.permission}
                  />
                </Layout>
              }
            />
          ))}

          <Route
            path="/unauthorized"
            element={
              <Layout>
                <Unauthorized />
              </Layout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default Router;
