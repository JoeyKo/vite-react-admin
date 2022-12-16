import * as React from 'react';
import { Avatar, Dropdown, MenuProps } from 'antd';

const items: MenuProps['items'] = [
  {
    key: 'settings',
    label: "个人设置",
  },
  {
    key: 'logout',
    danger: true,
    label: '退出登录',
  },
];

export default function Header() {
  return (
    <div style={{ float: 'right'}}>
      <Dropdown placement="bottomRight" arrow menu={{ items }}>
        <Avatar style={{ cursor: "pointer", color: '#f56a00', backgroundColor: '#fde3cf' }}>
          Joey
        </Avatar>
      </Dropdown>
    </div>
  )
}