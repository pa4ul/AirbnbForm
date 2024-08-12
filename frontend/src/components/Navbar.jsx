import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined, AppstoreOutlined } from "@ant-design/icons";

const Navbar = () => {
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
      label: <Link to="/overview">Overview</Link>,
    },
  ];

  return (
    <Menu
      mode="vertical"
      defaultSelectedKeys={["1"]}
      style={{ height: "100%", borderRight: 0 }}
      items={items} // Verwenden Sie `items` anstelle von `children`
    />
  );
};

export default Navbar;
