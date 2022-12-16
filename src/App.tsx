import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Layout } from 'antd';
import menu, { IMenuItem } from './config/menu';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';

export default function App() {

  function getRoute(menuItem: IMenuItem): React.ReactNode {
    if (menuItem.children) {
      return menuItem.children.map(getRoute)
    }

    if (!menuItem.route) return null;
    return <Route
      key={menuItem.route}
      path={menuItem.route}
      element={<React.Suspense fallback={<>...</>}>{menuItem.component}</React.Suspense>}
    />
  }

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Layout.Sider style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}>
          <Sidebar />
        </Layout.Sider>
        <Layout style={{ marginLeft: 200 }}>
          <Layout.Header style={{ padding: "0 24px" }}>
            <Header />
          </Layout.Header>
          <Layout.Content style={{ padding: '24px' }}>
            <Routes>
              {menu.map(getRoute)}
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
