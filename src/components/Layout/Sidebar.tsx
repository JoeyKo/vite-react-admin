import { Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';
import * as React from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import menu, { IRouteItem } from '../../config/route';
import useUserStore from '../../store/user';
import styles from './index.module.scss';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = useUserStore(state => state.role);

  const [openKeys, setOpenKeys] = React.useState<string[]>([]);

  function onMenuClick(info: MenuInfo) {
    navigate(info.key);
  }

  function onMenuOpenChange(keys: string[]) {
    setOpenKeys(keys)
  }

  React.useEffect(() => {
    setOpenKeys(getOpenedMenus())
  }, [location.pathname])

  function getMenu(menuItem: IRouteItem): MenuItem {
    if (menuItem.hidden || !menuItem.roles?.includes(userRole)) return null;

    return getItem(menuItem.text, menuItem.route ?? menuItem.text, menuItem.icon, menuItem.children?.map(getMenu))
  }

  /**
   * 获取展开的菜单
   * @returns 
   */
  function getOpenedMenus() {
    let openedKeys: string[] = []
    let shouldSkip = false;

    const getSelectedMenu = (menuItem: IRouteItem) => {
      if (menuItem.route) {
        const pathReg = new RegExp(/:[\w]+/, "g")
        if (pathReg.test(menuItem.route)) {
          const regStr = menuItem.route.replace(/:[\w]+/g, "[\\w]+")
          const reg = new RegExp(regStr)

          if (reg.test(location.pathname)) {
            shouldSkip = true;
            return;
          }
        } else if (menuItem.route === location.pathname) {
          shouldSkip = true;
          return;
        }
      }

      if (menuItem.children) {
        openedKeys.push(menuItem.text);

        menuItem.children.forEach(item => {
          if (shouldSkip) { return; }
          getSelectedMenu(item)
        });
      }
    }

    menu.forEach(menuItem => {
      if (shouldSkip) { return; }
      openedKeys = [];
      getSelectedMenu(menuItem);
    })

    return openedKeys;
  }

  /**
   * 获取选中的菜单
   * @returns 
   */
  function getSelectedMenus() {
    let selectedKeys: string[] = [];
    let shouldSkip = false;

    const getSelectedMenu = (menuItem: IRouteItem) => {
      const pathReg = new RegExp(/:[\w]+/, "g")
      if (menuItem.route) {
        if (pathReg.test(menuItem.route)) {
          const regStr = menuItem.route.replace(/:[\w]+/g, "[\\w]+")
          const reg = new RegExp(regStr)

          if (reg.test(location.pathname)) {
            shouldSkip = true;
            selectedKeys.push(menuItem.selectedMenuRoute ?? menuItem.route)
          }
        } else if (menuItem.route === location.pathname) {
          shouldSkip = true;
          selectedKeys.push(menuItem.route)
        }
      }

      if (menuItem.children) {
        menuItem.children.forEach(item => {
          if (shouldSkip) { return; }
          getSelectedMenu(item)
        });
      }
    }

    menu.forEach(menuItem => {
      if (shouldSkip) { return; }
      selectedKeys = [];
      getSelectedMenu(menuItem);
    });

    return selectedKeys;
  }

  return (
    <div>
      <Link to="/"><h1 className={styles.title}>Antd管理后台</h1></Link>
      <Menu
        selectedKeys={getSelectedMenus()}
        openKeys={openKeys}
        mode="inline"
        theme="dark"
        items={menu.map(getMenu)}
        onClick={onMenuClick}
        onOpenChange={onMenuOpenChange}
      />
    </div>
  );
}