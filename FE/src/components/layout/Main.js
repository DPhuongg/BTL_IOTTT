import { useLocation } from "react-router-dom";
import { Layout} from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  return (
    <Layout
      className={`layout-dashboard`}
    >
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary `}
        style={{ background: "transparent" }}
      >
        <Sidenav />
      </Sider>
      <Layout>
        <AntHeader>
          <Header
            name={pathname}
            subName={pathname}
          />
        </AntHeader>
        <Content className="content-ant">{children}</Content>
        <Footer />
      </Layout>
    </Layout>
  );
}

export default Main;
