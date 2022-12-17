import { DashboardOutlined, KeyOutlined, LockOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";
import { IRole } from "../store/user";

const Dashboard = React.lazy(() => import('../routes/Dashboard'));
const Menu = React.lazy(() => import('../routes/Menu'));
const UserRole = React.lazy(() => import('../routes/UserRole'));
const UserAdmin = React.lazy(() => import('../routes/UserAdmin'));
const ProductCategory = React.lazy(() => import('../routes/ProductCategory'));
const ProductList = React.lazy(() => import('../routes/ProductList'));
const Product = React.lazy(() => import('../routes/Product'));

export interface IRouteItem {
  route?: string;
  icon?: React.ReactNode;
  roles?: IRole[];
  text: string;
  component?: React.ReactNode;
  selectedMenuRoute?: string;
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
    text: "商品",
    roles: ['user', 'admin'],
    icon: <ShopOutlined />,
    children: [
      {
        route: "/product/category",
        text: "商品分类",
        roles: ['user', 'admin'],
        component: <ProductCategory />,
      },
      {
        route: "/product/list",
        text: "商品列表",
        roles: ['user', 'admin'],
        component: <ProductList />,
      },
      {
        route: "/product/list/:id",
        text: "商品详情",
        roles: ['user', 'admin'],
        selectedMenuRoute: '/product/list', // 菜单栏选中
        hidden: true, // 隐藏菜单栏
        component: <Product />,
      },
    ]
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