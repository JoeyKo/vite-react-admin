import * as React from 'react';
import { Avatar, Badge, Dropdown, MenuProps, Space } from 'antd';
import { Link } from 'react-router-dom';
import { BellOutlined, FullscreenOutlined } from '@ant-design/icons';
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
  function toggleFullscreen() {
    const elem = document.body;

    if (!document.fullscreenElement) {
      elem?.requestFullscreen()
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <div style={{ float: 'right' }}>
      <Space size="large" align="center">
        <FullscreenOutlined onClick={toggleFullscreen} style={{ fontSize: '18px', color: "#fff" }} />
        <Badge count={5}>
          <BellOutlined style={{ fontSize: '18px', color: "#fff" }} />
        </Badge>
        <Dropdown placement="bottomRight" arrow menu={{ items }}>
          <Avatar style={{ cursor: "pointer", color: '#f56a00', backgroundColor: '#fde3cf' }}>
            Joey
          </Avatar>
        </Dropdown>
      </Space>
    </div>
  )
}