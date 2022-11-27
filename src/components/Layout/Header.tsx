import * as React from 'react';
import Box from '@mui/material/Box';
import ToggleColorMode from '../ToggleColorMode';

export default function Header({
  colorMode,
}: {
  colorMode: {
    toggleColorMode: () => void;
  },
}) {
  return (
    <Box>
      <ToggleColorMode colorMode={colorMode} />
    </Box>
  )
}