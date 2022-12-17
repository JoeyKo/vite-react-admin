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

  function onMenuSelect(info: MenuInfo) {
    navigate(info.key);
  }

  function onMenuOpenChange(keys: string[]) {
    setOpenKeys(keys)
  }

  React.useEffect(() => {
    setOpenKeys(getOpenedMenus())
  }, [location.pathname])

  function getMenu(menuItem: IRouteItem): MenuItem {
    if (!menuItem.roles?.includes(userRole)) return null;
  
    return getItem(menuItem.text, menuItem.route ?? menuItem.text, menuItem.icon, menuItem.children?.map(getMenu))
  }
  
  function getOpenedMenus() {
    let openedKeys: string[] = []
    let shouldSkip = false;

    const getSelectedMenu = (menuItem: IRouteItem) => {
      if (menuItem.route && menuItem.route.indexOf(location.pathname) === 0) {
        shouldSkip = true;
        return;
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

  return (
    <div>
      <Link to="/"><h1 className={styles.title}>Antd管理后台</h1></Link>
      <Menu
        selectedKeys={[location.pathname]}
        openKeys={openKeys}
        mode="inline"
        theme="dark"
        items={menu.map(getMenu)}
        onSelect={onMenuSelect}
        onOpenChange={onMenuOpenChange}
      />
    </div>
  );
}