// src/App.jsx
import React from "react";
import { Layout } from "antd";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext"; // Importiere AuthProvider
import "./styles/App.css";

const { Sider, Content } = Layout;

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={200} className="sider-component">
            <Navbar />
          </Sider>
          <Layout>
            <Content style={{ padding: 24, margin: 0 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/overview"
                  element={
                    <ProtectedRoute>
                      <Overview />
                    </ProtectedRoute>
                  }
                />
                <Route path="/login" element={<Login />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;
