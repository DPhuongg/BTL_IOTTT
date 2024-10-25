import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaTable, FaUser } from "react-icons/fa";

function Sidenav() {
  const { pathname } = useLocation();
  const page = pathname.replace("/", "");

  return (
    <>
      <div className="brand">
        <img src={logo} alt="" />
        <span>IOT Dashboard</span>
      </div>
      <hr />
      <Menu theme="light" mode="inline">
        <Menu.Item key="1">
          <NavLink to="/dashboard">
            <span
              className="icon"
              style={{
                background: page === "dashboard" ? "#1890ff" : "",
              }}
            >
              <MdOutlineSpaceDashboard />
            </span>
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item key="2">
          <NavLink to="/tables">
            <span
              className="icon"
              style={{
                background: page === "tables" ? "#1890ff" : "",
              }}
            >
              <FaTable />
            </span>
            <span className="label">Tables</span>
          </NavLink>
        </Menu.Item>
        <Menu.Item className="menu-item-header" key="4">
          Account Pages
        </Menu.Item>
        <Menu.Item key="5">
          <NavLink to="/profile">
            <span
              className="icon"
              style={{
                background: page === "profile" ? "#1890ff" : "",
              }}
            >
              <FaUser />
            </span>
            <span className="label">Profile</span>
          </NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default Sidenav;
