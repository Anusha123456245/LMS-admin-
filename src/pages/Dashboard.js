// import React, { useState } from 'react';
// import {
//   Grid,
//   Paper,
//   Typography,
//   Box,
//   IconButton,
//   Select,
//   MenuItem,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Divider,
//   Stack,
//   Avatar,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   LinearProgress,
//   CardContent,
//   Card
// } from '@mui/material';
// import NotificationsIcon from '@mui/icons-material/Notifications';
// import ErrorIcon from '@mui/icons-material/Error';
// import WarningIcon from '@mui/icons-material/Warning';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import InfoIcon from '@mui/icons-material/Info';
// import { styled } from '@mui/material/styles';
// import Star from '@mui/icons-material/Star';
// import School from '@mui/icons-material/School';
// import Group from '@mui/icons-material/Group';
// import Book from '@mui/icons-material/Book';

// import {
//   Brightness4,
//   Brightness7,
//   People,
//   AttachMoney,
//   TrendingUp,
//   PersonAdd,
//   Notifications
// } from '@mui/icons-material';

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from 'recharts';
// import { purple, green, orange, pink } from '@mui/material/colors';


// const DashboardContent = () => {
//   const [darkMode, setDarkMode] = useState(false);
//     const [selectedRange, setSelectedRange] = React.useState('last_7_days');
// const handleRangeChange = (event) => {
//     setSelectedRange(event.target.value);
//   };
//   const toggleTheme = () => setDarkMode(!darkMode);

  
//   const [filter, setFilter] = useState('weekly');

//   const chartData = {
//     weekly: [
//       { name: 'Mon', enrollments: 30 },
//       { name: 'Tue', enrollments: 50 },
//       { name: 'Wed', enrollments: 40 },
//       { name: 'Thu', enrollments: 70 },
//       { name: 'Fri', enrollments: 20 },
//       { name: 'Sat', enrollments: 60 },
//       { name: 'Sun', enrollments: 90 }
//     ],
//     monthly: [
//       { name: 'Week 1', enrollments: 150 },
//       { name: 'Week 2', enrollments: 200 },
//       { name: 'Week 3', enrollments: 170 },
//       { name: 'Week 4', enrollments: 220 }
//     ]
//   };

//   const notificationTypes = [
//   { type: 'info', icon: <InfoIcon />, color: purple[500] },
//   { type: 'success', icon: <CheckCircleIcon />, color: green[500] },
//   { type: 'warning', icon: <WarningIcon />, color: orange[500] },
//   { type: 'error', icon: <ErrorIcon />, color: pink[500] },
// ];
// const stats = [
//     { label: 'Total Courses', value: 42 },
//     { label: 'Total Instructors', value: 12 },
//     { label: 'Total Students', value: 240 },
//     { label: 'Active Subscriptions', value: 180 },
//   ];

  

// // Sample notifications
// const notifications = [
//   { message: 'New user enrolled in React course', type: 'success' },
//   { message: 'Server backup completed successfully', type: 'info' },
//   { message: 'Payment gateway latency detected', type: 'warning' },
//   { message: 'Unauthorized login attempt detected', type: 'error' },
// ];
//  const courseSales = [
//   { name: 'React Basics', sales: 75 },
//   { name: 'Node.js', sales: 60 },
//   { name: 'Python', sales: 90 },
//   { name: 'Java', sales: 45 }
// ];

// const progressColors = ['#1976d2', '#9c27b0', '#ff9800', '#4caf50'];
// const metrics = [
//   {
//     label: 'Sales',
//     value: '1,230',
//     icon: <TrendingUp />,
//     color: purple[500], // Change here
//   },
//   {
//     label: 'Users',
//     value: '540',
//     icon: <Group />,
//     color: green[500], // Change here
//   },
//   {
//     label: 'Courses',
//     value: '32',
//     icon: <School />,
//     color: orange[500], // Change here
//   },
//   {
//     label: 'Reviews',
//     value: '120',
//     icon: <Star />,
//     color: pink[400], // Change here
//   },
// ];
// const pieData = [
//   { name: 'Completed', value: 400 },
//   { name: 'In Progress', value: 300 },
//   { name: 'Pending', value: 200 },
// ];

// const pieColors = ['#4caf50', '#2196f3', '#ff9800'];

//   return (
//     <Box p={3}>
//       {/* Dashboard Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} sx={{ml:5,mt:8}}>
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           sx={{
//             background: 'linear-gradient(to right, #1976d2, #64b5f6)',
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent'
//           }}
//         >
//           Admin Dashboard
//         </Typography>
//         <IconButton onClick={toggleTheme} color="inherit">
//           {darkMode ? <Brightness7 /> : <Brightness4 />}
//         </IconButton>
//       </Box>

//       {/* Metric Cards */}
//       <Grid container spacing={1}>
//       {metrics.map((item, i) => (
//         <Grid item xs={12} sm={6} md={3} key={i}>
//           <Paper
//             elevation={4}
//             sx={{
//               p: 3,
//               ml: 5,
//               borderRadius: 3,
//               color: '#fff',
//               background: item.color,
//               height: '20vh',
//               width: '300px',
//               position: 'relative',
//               overflow: 'hidden',
//             }}
//           >
//             <Stack direction="row" alignItems="center" spacing={2}>
//               <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)' }}>
//                 {item.icon}
//               </Avatar>
//               <Box>
//                 <Typography variant="subtitle2" sx={{ opacity: 0.9 }}>
//                   {item.label}
//                 </Typography>
//                 <Typography variant="h5" fontWeight="bold">
//                   {item.value}
//                 </Typography>
//               </Box>
//             </Stack>
//             <Typography
//               variant="caption"
//               sx={{
//                 position: 'absolute',
//                 bottom: 10,
//                 left: 24,
//                 opacity: 0.7,
//               }}
//             >
//               Updated just now
//             </Typography>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>

//       {/* Chart + Notifications + Table */}
//       <Grid container spacing={3} mt={2}>
//         {/* Chart */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={4} sx={{ p: 3, borderRadius: 3,width:"600px" ,ml:5}}>
//             <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//               <Typography variant="h6">Course Enrollments</Typography>
//               <Select value={filter} onChange={(e) => setFilter(e.target.value)} size="small">
//                 <MenuItem value="weekly">Weekly</MenuItem>
//                 <MenuItem value="monthly">Monthly</MenuItem>
//               </Select>
//             </Box>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={chartData[filter]}>
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="enrollments" fill="#42a5f5" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </Paper>
//         </Grid>

//         {/* Notifications */}
//         {/* <Grid item xs={12} md={4}>
//           <Paper elevation={4} sx={{ p: 3, borderRadius: 3, height: '100%',width:"600px" }}>
//             <Box display="flex" alignItems="center" mb={2}>
//               <Notifications sx={{ mr: 1 }} color="primary" />
//               <Typography variant="h6">Notifications</Typography>
//             </Box>
//             <Divider sx={{ mb: 1 }} />
//             {notifications.map((note, idx) => (
//               <Typography key={idx} variant="body2" gutterBottom>
//                 • {note}
//               </Typography>
//             ))}
//           </Paper>
//         </Grid> */}
//         <Grid item xs={12} md={4}>
//       <Paper
//         elevation={4}
//         sx={{
//           p: 3,
//           borderRadius: 3,
//           height: '100%',
//           width: '700px',
//           background: 'linear-gradient(to right, #f9f9f9, #e3f2fd)',
//         }}
//       >
//         <Box display="flex" alignItems="center" mb={2}>
//           <NotificationsIcon sx={{ mr: 1 }} color="primary" />
//           <Typography variant="h6">Notifications</Typography>
//         </Box>
//         <Divider sx={{ mb: 2 }} />
//         <List>
//           {notifications.map((note, idx) => {
//             const match = notificationTypes.find(n => n.type === note.type);
//             return (
//               <ListItem key={idx} sx={{ mb: 1, borderRadius: 2, backgroundColor: `${match?.color}20` }}>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: match?.color }}>{match?.icon}</Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={note.message}
//                   primaryTypographyProps={{ variant: 'body2', sx: { color: '#333' } }}
//                 />
//               </ListItem>
//             );
//           })}
//         </List>
//       </Paper>
//     </Grid>

//  <Card sx={{ ml: 5, width: "600px", height: "52vh",borderRadius:3 }}>
//   <CardContent>
//     <Typography variant="h6" gutterBottom>
//       Course Sales Progress
//     </Typography>
//     <Divider sx={{ mb: 2 }} />

//     {courseSales.map((course, index) => (
//       <Box
//         key={index}
//         display="flex"
//         alignItems="center"
//         justifyContent="space-between"
//         mb={6}
//       >
//         <Typography variant="body2" sx={{ minWidth: 100 }}>
//           {course.name}
//         </Typography>

//         <Box flexGrow={1} mr={2}>
//           <LinearProgress
//             variant="determinate"
//             value={course.sales}
//             sx={{
//               height: 8,
//               borderRadius: 5,
//               [`& .MuiLinearProgress-bar`]: {
//                 backgroundColor: progressColors[index % progressColors.length],
//               },
//             }}
//           />
//         </Box>

//         <Typography variant="body2">
//           {course.sales}%
//         </Typography>
//       </Box>
//     ))}
//   </CardContent>
// </Card>
// <Grid item xs={12} md={6}>
//   <Card
//     sx={{
//       height: '95%',
//       width:"700px",
//       p: 2,
//       borderRadius: 3,
//       background: 'linear-gradient(to right, #fdfbfb, #ebedee)',
//     }}
//   >
//     <CardContent>
//       <Typography variant="h6" gutterBottom>
//         Course Status Distribution
//       </Typography>
//       <Divider sx={{ mb: 2 }} />
//       <Box sx={{ height: 300 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={pieData}
//               cx="50%"
//               cy="50%"
//               outerRadius={80}
//               dataKey="value"
//               label
//             >
//               {pieData.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend verticalAlign="bottom" height={36} />
//           </PieChart>
//         </ResponsiveContainer>
//       </Box>
//     </CardContent>
//   </Card>
// </Grid>


//  </Grid>
//     </Box>
//   );
// };

// export default DashboardContent;
import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Stack,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Card,
  CardContent
} from '@mui/material';
import {
  Brightness4,
  Brightness7,
  TrendingUp,
  Group,
  School,
  Star,
  Notifications as NotificationsIcon,
  People,
  Class,
  Language
} from '@mui/icons-material';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import GroupIcon from '@mui/icons-material/Group';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const DashboardContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [filter, setFilter] = useState('weekly');
  const toggleTheme = () => setDarkMode(!darkMode);

  const chartData = {
    weekly: [
      { name: 'Mon', enrollments: 30 },
      { name: 'Tue', enrollments: 50 },
      { name: 'Wed', enrollments: 40 },
      { name: 'Thu', enrollments: 70 },
      { name: 'Fri', enrollments: 20 },
      { name: 'Sat', enrollments: 60 },
      { name: 'Sun', enrollments: 90 },
    ],
    monthly: [
      { name: 'Week 1', enrollments: 150 },
      { name: 'Week 2', enrollments: 200 },
      { name: 'Week 3', enrollments: 170 },
      { name: 'Week 4', enrollments: 220 },
    ],
  };
const metrics = [
  {
    label: 'Courses',
    value: 24,
    color: '#1976d2',
    icon: <SchoolIcon fontSize="large" />,
  },
  {
    label: 'Instructors',
    value: 12,
    color: '#9c27b0',
    icon: <PeopleIcon fontSize="large" />,
  },
  {
    label: 'Students',
    value: 500,
    color: '#388e3c',
    icon: <GroupIcon fontSize="large" />,
  },
  {
    label: 'Revenue',
    value: '₹1.5L',
    color: '#f57c00',
    icon: <MonetizationOnIcon fontSize="large" />,
  },
  {
    label: 'Growth Rate',
    value: '18%',
    icon: <TrendingUpIcon />,
    color: '#00ACC1',
  }
];

 
  const notifications = [
    { message: 'New user enrolled in React course', type: 'success' },
    { message: 'Server backup completed successfully', type: 'info' },
    { message: 'Payment gateway latency detected', type: 'warning' },
    { message: 'Unauthorized login attempt detected', type: 'error' },
  ];

  const notificationTypes = [
    { type: 'info', icon: <InfoIcon />, color: '#64b5f6' },
    { type: 'success', icon: <CheckCircleIcon />, color: '#81c784' },
    { type: 'warning', icon: <WarningIcon />, color: '#ffb74d' },
    { type: 'error', icon: <ErrorIcon />, color: '#e57373' },
  ];

  const courseSales = [
    { name: 'React Basics', sales: 75 },
    { name: 'Node.js', sales: 60 },
    { name: 'Python', sales: 90 },
    { name: 'Java', sales: 45 },
  ];
  const progressColors = ['#42a5f5', '#ab47bc', '#ffa726', '#66bb6a'];

  const pieData = [
    { name: 'Completed', value: 400 },
    { name: 'In Progress', value: 300 },
    { name: 'Pending', value: 200 },
  ];
  const pieColors = ['#66bb6a', '#42a5f5', '#ffa726'];

  return (
    <Box p={3} sx={{ mt: 8 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(to right, #2196f3, #90caf9)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            ml:4
          }}
        >
          Admin Dashboard
        </Typography>
        <IconButton onClick={toggleTheme} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      {/* Metric Cards */}
   <Box sx={{ p: 3 }}>
  <Grid
    container
    spacing={4}
    justifyContent="flex-start"
    sx={{
      flexWrap: 'nowrap',
      overflowX: 'auto',
    }}
  >
    {metrics.map((item, index) => (
      <Grid item md={3} key={index} sx={{ minWidth: 250, maxWidth: 300 }}>
        <Paper
          elevation={4}
          sx={{
            p: 3,
            borderRadius: 3,
            color: '#fff',
            background: item.color,
            height: '20vh',
            width: '100%',
            transition: 'transform 0.2s ease',
            '&:hover': {
              transform: 'scale(1.03)',
              
            },
          }}
        >
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar sx={{ bgcolor: '#ffffff55' }}>
              {item.icon}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ color: '#fff' }}>
                {item.label}
              </Typography>
              <Typography variant="h5" fontWeight="bold" sx={{ color: '#fff' }}>
                {item.value}
              </Typography>
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ mt: 2, display: 'block', color: '#f0f0f0' }}>
            Updated just now
          </Typography>
        </Paper>
      </Grid>
    ))}
  </Grid>
</Box>


      {/* Charts & Notifications */}
      <Grid container spacing={3} mt={2} sx={{ml:2}}>
        {/* Chart Card */}
        <Grid item xs={12} md={8}>
          <Box height="100%" display="flex" flexDirection="column">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Course Enrollments</Typography>
                <Select value={filter} onChange={(e) => setFilter(e.target.value)} size="small">
                  <MenuItem value="weekly">Weekly</MenuItem>
                  <MenuItem value="monthly">Monthly</MenuItem>
                </Select>
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData[filter]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="enrollments" fill="#42a5f5" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </Paper>
          </Box>
        </Grid>

        {/* Notifications Card */}
        <Grid item xs={12} md={4}>
          <Box height="100%" display="flex" flexDirection="column">
            <Paper elevation={3} sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <NotificationsIcon sx={{ mr: 1 }} color="primary" />
                <Typography variant="h6">Notifications</Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <List sx={{ overflowY: 'auto' }}>
                {notifications.map((note, idx) => {
                  const match = notificationTypes.find(n => n.type === note.type);
                  return (
                    <ListItem
                      key={idx}
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        backgroundColor: `${match?.color}22`
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: match?.color }}>{match?.icon}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={note.message}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>
          </Box>
        </Grid>

        {/* Course Sales Card */}
        <Grid item xs={12} md={6}>
          <Box height="100%" display="flex" flexDirection="column">
            <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>Course Sales Progress</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ overflowY: 'auto' }}>
                  {courseSales.map((course, index) => (
                    <Box
                      key={index}
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      mb={4}
                    >
                      <Typography variant="body2" sx={{ minWidth: 100 }}>
                        {course.name}
                      </Typography>
                      <Box flexGrow={1} mr={2}>
                        <LinearProgress
                          variant="determinate"
                          value={course.sales}
                          sx={{
                            height: 8,
                            borderRadius: 5,
                            [`& .MuiLinearProgress-bar`]: {
                              backgroundColor: progressColors[index % progressColors.length],
                            },
                          }}
                        />
                      </Box>
                      <Typography variant="body2">{course.sales}%</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>

        {/* Pie Chart Card */}
        <Grid item xs={12} md={6}>
          <Box height="100%" display="flex" flexDirection="column">
            <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>Course Status Distribution</Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={index} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardContent;
