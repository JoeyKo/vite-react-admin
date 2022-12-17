import React from 'react';
import { Spin } from 'antd';
import styles from './index.module.scss';

const Loading: React.FC = () => (
  <div className={styles.container}>
    <Spin />
  </div>
);

export default Loading;