import { DashboardOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

const Dashboard = React.lazy(() => import('../routes/Dashboard'));
const User = React.lazy(() => import('../routes/User'));

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
    text: "首页",
    icon: <DashboardOutlined />,
    component: <Dashboard />,
  },
  {
    text: "用户",
    icon: <UserOutlined />,
    children: [
      {
        route: "/user",
        text: "用户列表",
        component: <User />
      },
      {
        text: "用户权限",
        component: <User />,
        children: [{
          route: "/permission",
          text: "用户权限编辑",
          component: <User />

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