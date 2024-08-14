// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Menu, Divider } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AuthContext from "../contexts/AuthContext"; // Importiere AuthContext

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext); // Verwende AuthContext

  // Definieren Sie die Menüelemente als Array
  const items = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: isAuthenticated ? <Link to="/overview">Overview</Link> : null,
    },
    {
      key: "3",
      icon: <UserOutlined />,
      label: isAuthenticated ? (
        <a onClick={logout}>Logout</a>
      ) : (
        <Link to="/login">Login</Link>
      ),
    },
  ];

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
    >
      <Menu.Item key="1" icon={items[0].icon}>
        {items[0].label}
      </Menu.Item>
      <Divider />
      {items[1].label && (
        <Menu.Item key="2" icon={items[1].icon}>
          {items[1].label}
        </Menu.Item>
      )}
      <Menu.Item key="3" icon={items[2].icon}>
        {items[2].label}
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
