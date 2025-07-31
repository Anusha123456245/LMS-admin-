
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Box,
  Collapse,
  Typography,
} from '@mui/material';
import {
  Dashboard,
  Category,
  Book,
  People,
  ExpandLess,
  ExpandMore,
  AddCircleOutline,
  Storage,
  Quiz,
  MenuBook,
  PersonAdd,
  School,
} from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

export default function Sidebar() {
  const navigate = useNavigate();
  const [openMasterData, setOpenMasterData] = useState(false);

  const handleMasterDataClick = () => {
    setOpenMasterData(!openMasterData);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          // backgroundColor: '#0f1a2aff',
                      background: 'linear-gradient(to right, #234363ff, #0d5fa3ff)',

          color: '#fff',
         
          width:"280px"
        },
      }}
    >
      <Toolbar />
     <Box sx={{ overflow: 'auto' }}>
      <Typography variant='h4' sx={{ml:8,fontFamily:"serif"}}>Admin</Typography>
  <List>
    <Box sx={{ mt: 2 }}>
      <ListItemButton onClick={() => navigate('/')}>
        <ListItemIcon sx={{ color: 'white' }}><Dashboard /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Box>

    <Box sx={{ mt: 2 }}>
      <ListItemButton onClick={handleMasterDataClick}>
        <ListItemIcon sx={{ color: 'white' }}><Storage /></ListItemIcon>
        <ListItemText primary="Master Data" />
        {openMasterData ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
    </Box>

    <Collapse in={openMasterData} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/categoryform')}>
            <ListItemIcon sx={{ color: 'white' }}><AddCircleOutline /></ListItemIcon>
            <ListItemText primary="CategoryForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/create-course')}>
            <ListItemIcon sx={{ color: 'white' }}><AddCircleOutline /></ListItemIcon>
            <ListItemText primary="Create Course" />
          </ListItemButton>
        </Box>
        
         <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/assignments')}>
            <ListItemIcon sx={{ color: 'white' }}><Book /></ListItemIcon>
            <ListItemText primary="Assignments" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/quizform')}>
            <ListItemIcon sx={{ color: 'white' }}><Quiz /></ListItemIcon>
            <ListItemText primary="QuizForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/quizquestionform')}>
            <ListItemIcon sx={{ color: 'white' }}><School /></ListItemIcon>
            <ListItemText primary="QuizQuestionForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/materialform')}>
            <ListItemIcon sx={{ color: 'white' }}><MenuBook /></ListItemIcon>
            <ListItemText primary="MaterialForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/instructorform')}>
            <ListItemIcon sx={{ color: 'white' }}><PersonAdd /></ListItemIcon>
            <ListItemText primary="InsructorForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/lessonform')}>
            <ListItemIcon sx={{ color: 'white' }}><School /></ListItemIcon>
            <ListItemText primary="LessonForm" />
          </ListItemButton>
        </Box>
        <Box sx={{ mt: 1 }}>
          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/lessoncontent')}>
            <ListItemIcon sx={{ color: 'white' }}><School /></ListItemIcon>
            <ListItemText primary="LessonContent" />
          </ListItemButton>
        </Box>
      </List>
    </Collapse>

    <Box sx={{ mt: 2 }}>
      <ListItemButton onClick={() => navigate('/categories')}>
        <ListItemIcon sx={{ color: 'white' }}><Category /></ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItemButton>
    </Box>

    <Box sx={{ mt: 2 }}>
      <ListItemButton onClick={() => navigate('/users')}>
        <ListItemIcon sx={{ color: 'white' }}><People /></ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>
    </Box>
    
  </List>
</Box>

    </Drawer>
  );
}
