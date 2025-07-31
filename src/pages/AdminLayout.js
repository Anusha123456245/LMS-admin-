

import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { Box, Toolbar } from '@mui/material';
import backgroundImg from '../assets/background.jpg'; // Your image path

export default function AdminLayout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, position: 'relative', minHeight: '100vh' }}>
        {/* Background image with blur */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />
        
        {/* Overlay content */}
        <Box sx={{ position: 'relative', p: 3 }}>
          {/* <Toolbar /> */}
          <Box sx={{ position: 'relative', pt: 0, px: 4, pb: 2,mt:-6 }}>
  <Outlet />
</Box>

        </Box>
      </Box>
    </Box>
  );
}
