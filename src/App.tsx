import "./App.css";
import { Layout, Menu } from "antd";

import { useState } from "react";
import { items } from "./Sidebar/Items";
import { Outlet, useLocation } from "react-router-dom";

function App() {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const findSelectedKey = (items: any[], pathname: string): string => {
    for (const item of items) {
      if (item.path === pathname) {
        return item.key;
      }
      if (item.children) {
        const childKey: string = findSelectedKey(item.children, pathname);
        if (childKey) {
          return childKey;
        }
      }
    }
    return "";
  };

  const selectedItem: string = findSelectedKey(items, location.pathname);

  console.log(selectedItem);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          theme="dark"
          selectedKeys={[selectedItem]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: "16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
