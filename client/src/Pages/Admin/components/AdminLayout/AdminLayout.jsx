import { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserInfoContext } from "../../../../App/Context/UserInfoContext/UserInfoContext";
import {
  CalendarOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  ProjectOutlined,
  ProductOutlined,
  MessageOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { masterApi } from "../../../../Entities/Master/api/service";
import { Layout, Menu, Button } from "antd";
const { Header, Sider, Content } = Layout;
import "./style.scss";

function AdminLayout({ children }) {
  const [deletePreviousDates, {}] = masterApi.useDeletePreviousDatesMutation();
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  const navigation = useNavigate();

  const onMenuItemClick = (e) => {
    setSelectedKey(e.key);
    navigation(`/${e.key}`);
  };
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Главная", "", <HomeOutlined />),
    getItem("Планирование", "planingDays", <CalendarOutlined />),
    getItem("Записи", "bookings", <ReadOutlined />),
    getItem("Услуги", "services", <ProductOutlined />),
    getItem("Новости", "news", <ProjectOutlined />),
    getItem("Отзывы", "reviews", <MessageOutlined />),
    getItem("Справка", "reference", <InfoCircleOutlined />),
  ];

  useEffect(() => {
    const path = location.pathname.replace("/", "");
    setSelectedKey(path);
    deletePreviousDates();
  }, []);

  const { setUserData } = useContext(UserInfoContext);
  const onLogout = () => {
    setUserData({
      userId: "",
      userName: "",
      userNumberPhone: "",
      userEmail: "",
      userPassword: "",
      role: "",
    });
    localStorage.removeItem("userData");
    navigation("/");
    window.location.reload();
  };

  return (
    <Layout className="AdminLayout-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="AdminLayout-logo">
          <img src="/assets/logo.svg" alt="logo" />
          {!collapsed && <h1>OK.BROWS</h1>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={[""]}
          selectedKeys={[selectedKey]}
          onClick={onMenuItemClick}
        />
      </Sider>
      <Layout>
        <Header className="AdminLayout-header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          <Button onClick={onLogout}>Выйти из аккаунта</Button>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#fff",
            borderRadius: "10px",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
