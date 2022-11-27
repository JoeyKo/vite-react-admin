import * as React from 'react';
import Box from "@mui/material/Box";
import styles from './index.module.scss';
import Header from './Header';

interface Props {
  colorMode: {
    toggleColorMode: () => void;
  }
}

export default function Layout({
  colorMode
}: Props) {
  return (
    <Box className={styles.layout}>
      <Header colorMode={colorMode} />
    </Box>
  )
}