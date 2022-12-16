import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const Dashboard = React.lazy(() => import('../routes/Dashboard'));
const Menu = React.lazy(() => import('../routes/Menu'));

export interface IMenuItem {
  route?: string;
  icon?: React.ReactNode;
  text: string;
  component?: React.ReactNode;
  hidden?: boolean;
  children?: IMenuItem[];
}

const menu: IMenuItem[] = [
  {
    route: "/",
    text: "控制台",
    icon: <DashboardOutlined />,
    component: <Dashboard />,
  },
  {
    text: "一级菜单",
    icon: <UserOutlined />,
    children: [
      {
        route: "/menu",
        text: "二级菜单1",
        component: <Menu />
      },
      {
        text: "二级菜单2",
        component: <Menu />,
        children: [{
          route: "/sub-menu",
          text: "三级菜单",
          component: <Menu />
        }]
      }
    ],
  },
  // {
  //   text: "用户",
  //   icon: <UserOutlined />,
  //   route: "/user", 
  //   component: <User />
  // }
]

export default menu;