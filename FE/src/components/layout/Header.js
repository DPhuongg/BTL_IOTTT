import { useEffect } from "react";
import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Button,
  Typography,
} from "antd";

import { NavLink } from "react-router-dom";
import { IoMdSettings } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { useCount } from "../../stores";
import axiosClient from "../../api/axios-client";

function Header({
  name,
  subName
}) {
  const { updateCount } = useCount();
  useEffect(() => window.scrollTo(0, 0));
  useEffect(() => {
    const get10dataLast = async () => {
      const res = await axiosClient.get('/data/count-data');
      updateCount(res);
    }

    get10dataLast();
  }, [])
  const { count } = useCount()
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={8} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: "capitalize" }}>
              {name.replace("/", "")}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={8} md={6} style={{fontSize: '20px', fontWeight: '500'}}>
          Số lần cảm biến lớn hơn 60: {count}
        </Col>
        <Col span={8} md={18} className="header-control">
          <Badge size="small" count={4}>
            <FaBell />
          </Badge>
          <Button type="link" >
            <IoMdSettings />
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Header;
