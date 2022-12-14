import * as React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import menu, { IMenuItem } from './config/menu';
import Header from './components/Layout/Header';
import { Layout } from 'antd';
import Sidebar from './components/Layout/Sidebar';

export default function App() {

  function getRoute(menuItem: IMenuItem) {
    if (menuItem.children) { menuItem.children.forEach(getRoute) }
    return <Route
      key={menuItem.text}
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
          <Layout.Header style={{
            position: 'fixed',
            top: 0,
            left: 200,
            right: 0
          }}>
            <Header />
          </Layout.Header>
          <Layout.Content style={{ minHeight: 'calc(100vh - 64px)', marginTop: 64, padding: '24px' }}>
            <Routes>
              {menu.map(getRoute)}
            </Routes>
          </Layout.Content>
        </Layout>
      </Layout>
    </BrowserRouter>
  )
}
