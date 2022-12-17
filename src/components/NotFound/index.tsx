import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="对不起，您访问的页面不存在."
      extra={<Link to="/"><Button type="primary">返回控制台</Button></Link>}
    />
  )
}

export default NotFound;