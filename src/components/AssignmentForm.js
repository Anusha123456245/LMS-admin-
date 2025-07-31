
// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   TextField,
//   Button,
//   MenuItem,
//   Grid,
//   Divider,
//   Box,
//   Stack,
// } from '@mui/material';
// import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import axios from 'axios';

// export default function AssignmentForm() {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const [dueDate, setDueDate] = useState(null);
//   const [downloadLink, setDownloadLink] = useState('');
//   const [submitStatus, setSubmitStatus] = useState('');
//   const [status, setStatus] = useState('');
//   const [lessonContentId, setLessonContentId] = useState('');

//   const submitStatusOptions = ['Submitted', 'Not Submitted'];
//   const statusOptions = ['Pending', 'Completed'];

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = {
//       title,
//       description,
//       dueDate: dueDate ? dueDate.toISOString() : null,
//       downloadLink,
//       submitStatus,
//       status,
//       lessonContentId,
//     };

//     try {
//       const res = await axios.post('http://localhost:5000/assignments', formData);
//       console.log('Submitted:', res.data);
//       alert('Assignment submitted successfully!');
//     } catch (error) {
//       console.error('Submission error:', error);
//       alert('Failed to submit assignment.');
//     }
//   };

//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs}>
//       <Box sx={{ mt: 10, px: 3, display: 'flex', justifyContent: 'center' }}>
//         <Card
//           elevation={5}
//           sx={{
//             maxWidth: 800,
//             width: '100%',
//             borderRadius: 6,
//             px: 3,
//             py: 2,
//             background: '#f9f9fb',
//           }}
//         >
//           <CardContent>
//             <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
//               Create Assignment
//             </Typography>

//             <Divider sx={{ mb: 3 }} />

//             <form onSubmit={handleSubmit} noValidate>
//               <Stack spacing={3}>
//                 <TextField
//                   label="Assignment Title"
//                   placeholder="Enter assignment title"
//                   fullWidth
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   required
//                 />

//                 <TextField
//                   label="Description"
//                   placeholder="Enter detailed description"
//                   multiline
//                   rows={4}
//                   fullWidth
//                   value={description}
//                   onChange={(e) => setDescription(e.target.value)}
//                   required
//                 />

//                 <DesktopDatePicker
//                   label="Due Date"
//                   inputFormat="YYYY-MM-DD"
//                   value={dueDate}
//                   onChange={setDueDate}
//                   renderInput={(params) => (
//                     <TextField {...params} fullWidth required />
//                   )}
//                 />

//                 <TextField
//                   label="Download Link"
//                   placeholder="https://example.com/resource.pdf"
//                   fullWidth
//                   value={downloadLink}
//                   onChange={(e) => setDownloadLink(e.target.value)}
//                 />

//                 <Grid container spacing={6} >
//                   <Grid item xs={12} sm={6} >
//                     <TextField sx={{ width: '330px' }}
//                       select
//                       label="Submission Status"
                      
//                       value={submitStatus}
//                       onChange={(e) => setSubmitStatus(e.target.value)}
//                       required
//                     >
//                       {submitStatusOptions.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>

//                   <Grid item xs={12} sm={6}>
//                     <TextField sx={{ width: '330px' }}
//                       select
//                       label="Assignment Status"
                      
//                       value={status}
//                       onChange={(e) => setStatus(e.target.value)}
//                       required
//                     >
//                       {statusOptions.map((option) => (
//                         <MenuItem key={option} value={option}>
//                           {option}
//                         </MenuItem>
//                       ))}
//                     </TextField>
//                   </Grid>
//                 </Grid>

//                 <TextField
//                   label="Lesson Content ID"
//                   placeholder="Enter Lesson Content ID"
//                   fullWidth
//                   value={lessonContentId}
//                   onChange={(e) => setLessonContentId(e.target.value)}
//                 />

//                 <Divider sx={{ mt: 3 }} />

//                 <Button
//                   type="submit"
//                   variant="contained"
//                   size="large"
//                   color="primary"
//                   sx={{
//                     borderRadius: 3,
//                     textTransform: 'none',
//                     fontWeight: 600,
//                     fontSize: '1rem',
//                     boxShadow: 3,
//                     py: 1.5,
//                   }}
//                   fullWidth
//                 >
//                   Submit Assignment
//                 </Button>
//               </Stack>
//             </form>
//           </CardContent>
//         </Card>
//       </Box>
//     </LocalizationProvider>
//   );
// }
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Add } from '@mui/icons-material';
import axios from 'axios';

export default function AssignmentManagement() {
  const [assignments, setAssignments] = useState([]);
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [downloadLink, setDownloadLink] = useState('');
  const [submitStatus, setSubmitStatus] = useState('');
  const [status, setStatus] = useState('');
  const [lessonContentId, setLessonContentId] = useState('');
  const [lessonContents, setLessonContents] = useState([]);

  const API_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchAssignments();
    fetchLessonContents();
  }, []);

  const fetchAssignments = async () => {
    try {
      const res = await axios.get(`${API_URL}/assignments`);
      setAssignments(res.data);
    } catch (err) {
      console.error('Error fetching assignments:', err);
    }
  };

  const fetchLessonContents = async () => {
    try {
      const res = await axios.get(`${API_URL}/lesson-contents`);
      setLessonContents(res.data);
    } catch (err) {
      console.error('Error fetching lesson contents:', err);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAssignment = {
      title,
      description,
      dueDate: dueDate ? dueDate.toISOString() : null,
      downloadLink,
      submitStatus,
      status,
      lessonContentId,
    };

    try {
      await axios.post(`${API_URL}/assignments`, newAssignment);
      fetchAssignments();
      handleClose();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box p={3} sx={{mt:5}}>
        <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
          Assignment Management
        </Typography>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleOpen}
          sx={{ mb: 2 }}
        >
          Add Assignment
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
              <TableRow>
                <TableCell><b>Title</b></TableCell>
                <TableCell><b>Due Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Submission</b></TableCell>
                <TableCell><b>Lesson</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignments.map((a) => (
                <TableRow key={a.id}>
                  <TableCell>{a.title}</TableCell>
                  <TableCell>{new Date(a.dueDate).toLocaleDateString()}</TableCell>
                  <TableCell>{a.status}</TableCell>
                  <TableCell>{a.submitStatus}</TableCell>
                  <TableCell>{a.lessonContent?.title || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Add Assignment</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <Stack spacing={2} mt={1}>
                <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth />
                <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} required fullWidth multiline rows={3} />
                <DesktopDatePicker
                  label="Due Date"
                  value={dueDate}
                  onChange={setDueDate}
                  renderInput={(params) => <TextField {...params} required fullWidth />}
                />
                <TextField label="Download Link" value={downloadLink} onChange={(e) => setDownloadLink(e.target.value)} fullWidth />
                <TextField select label="Submit Status" value={submitStatus} onChange={(e) => setSubmitStatus(e.target.value)} required fullWidth>
                  <MenuItem value="Submitted">Submitted</MenuItem>
                  <MenuItem value="Not Submitted">Not Submitted</MenuItem>
                </TextField>
                <TextField select label="Assignment Status" value={status} onChange={(e) => setStatus(e.target.value)} required fullWidth>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Completed">Completed</MenuItem>
                </TextField>
                <TextField select label="Lesson Content" value={lessonContentId} onChange={(e) => setLessonContentId(e.target.value)} required fullWidth>
                  {lessonContents.map((lesson) => (
                    <MenuItem key={lesson.id} value={lesson.id}>{lesson.title}</MenuItem>
                  ))}
                </TextField>
              </Stack>
              <DialogActions sx={{ mt: 2 }}>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" variant="contained">Save</Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
}
