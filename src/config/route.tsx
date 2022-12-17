import { DashboardOutlined, KeyOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { IRole } from "../store/user";

const Dashboard = React.lazy(() => import('../routes/Dashboard'));
const Menu = React.lazy(() => import('../routes/Menu'));
const UserRole = React.lazy(() => import('../routes/UserRole'));
const UserAdmin = React.lazy(() => import('../routes/UserAdmin'));

export interface IRouteItem {
  route?: string;
  icon?: React.ReactNode;
  roles?: IRole[];
  text: string;
  component?: React.ReactNode;
  hidden?: boolean;
  children?: IRouteItem[];
}

const menu: IRouteItem[] = [
  {
    route: "/",
    text: "控制台",
    roles: ['user', 'admin'],
    icon: <DashboardOutlined />,
    component: <Dashboard />,
  },
  {
    text: "一级菜单",
    roles: ['user', 'admin'],
    icon: <UserOutlined />,
    children: [
      {
        route: "/menu",
        roles: ['user', 'admin'],
        text: "二级菜单1",
        component: <Menu />
      },
      {
        text: "二级菜单2",
        roles: ['user', 'admin'],
        component: <Menu />,
        children: [{
          route: "/sub-menu",
          roles: ['user', 'admin'],
          text: "三级菜单",
          component: <Menu />
        }]
      }
    ],
  },
  {
    route: "/user/role",
    roles: ['user', 'admin'],
    text: "角色控制",
    icon: <KeyOutlined />,
    component: <UserRole />,
  },
  {
    route: "/user/admin",
    roles: ['admin'],
    text: "管理员可见",
    icon: <LockOutlined />,
    component: <UserAdmin />,
  }
]

export default menu;