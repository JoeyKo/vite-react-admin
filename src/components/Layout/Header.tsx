import * as React from 'react';
import { Avatar, Badge, Dropdown, MenuProps } from 'antd';
import { Link } from 'react-router-dom';
import { BellOutlined, UserOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const items: MenuProps['items'] = [
  {
    key: 'settings',
    label: "个人设置",
  },
  {
    key: 'logout',
    danger: true,
    label: <Link to="/login">退出登录</Link>,
  },
];

export default function Header() {
  return (
    <div className={styles.userMenu}>
      <Badge count={5}>
        <BellOutlined style={{ fontSize: '18px', color: "#fff" }} />
      </Badge>
      <Dropdown placement="bottomRight" arrow menu={{ items }}>
        <Avatar style={{ marginLeft: 25, backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Dropdown>
    </div>
  )
}