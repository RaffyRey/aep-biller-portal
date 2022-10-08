import { Box } from '@mui/material';
import React from 'react';
import { FaBars } from 'react-icons/fa';

import AllEasyLogo from '../alleasyLogo/AllEasyLogo';
import Navlist from '../navlist/Navlist';

function ResponsiveDrawer({ onClose }) {

  return (
    <Box width={250} position="relative" display="flex" flexDirection="column" alignItems="center" sx={{ height: '100%' }}>
      <header style={{ display: 'flex', alignItems: "center", marginTop: "6px" }}>
        <button className='menu-button' onClick={onClose}>
          <FaBars />
        </button>
        <AllEasyLogo />
      </header>
      <Navlist />
    </Box>
  )
}

export default ResponsiveDrawer