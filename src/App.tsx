import * as React from 'react';
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Layout } from 'antd';
import routes, { IRouteItem } from './config/route';
import Header from './components/Layout/Header';
import Sidebar from './components/Layout/Sidebar';
import useUserStore from './store/user';
import Loading from './components/Loading';

const NotFound = React.lazy(() => import("./components/NotFound"));
const Login = React.lazy(() => import("./routes/Login"));

export default function App() {
  const location = useLocation();
  const userRole = useUserStore(state => state.role);

  function getRoute(routeItem: IRouteItem): React.ReactNode {
    if (routeItem.children) {
      return routeItem.children.map(getRoute)
    }

    if (!routeItem.route) return null;

    // Role route checks.
    if (!routeItem.roles?.includes(userRole)) return null;

    return <Route
      key={routeItem.route}
      path={routeItem.route}
      element={<React.Suspense fallback={<Loading />}>{routeItem.component}</React.Suspense>}
    />
  }

  return (
    <>
      {location.pathname.indexOf("/login") === 0 ?
        <Routes>
          <Route
            path={"/login"}
            element={<React.Suspense fallback={<Loading />}>{<Login />}</React.Suspense>}
          />
        </Routes>
        :
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
          <Layout style={{ minHeight: '100vh', marginLeft: 200 }}>
            <Layout.Header style={{ padding: "0 24px" }}>
              <Header />
            </Layout.Header>
            <Layout.Content style={{ padding: '24px' }}>
              <Routes>
                <Route path='*' element={<NotFound />} />
                {routes.map(getRoute)}
              </Routes>
            </Layout.Content>
          </Layout>
        </Layout>
      }
    </>
  )
}
