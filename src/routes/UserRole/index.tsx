import React from 'react';
import { Button, Space, Typography } from 'antd';
import useUserStore, { IRole } from '../../store/user';

const { Title } = Typography;

const UserRole: React.FC = () => {
  const role = useUserStore((state) => state.role)
  const setRole = useUserStore((state) => state.setRole)

  function onRoleChange(role: IRole) {
    setRole(role)
  }

  return (
    <div>
      <Title level={5}>当前用户角色：{role}</Title>
      <Space>
        <Button type='primary' onClick={() => onRoleChange("user")}>用户登录</Button>
        <Button type='primary' onClick={() => onRoleChange("admin")}>管理员登录</Button>
      </Space>
    </div>
  )
}

export default UserRole;