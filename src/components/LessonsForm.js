
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Typography,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   TextField,
//   MenuItem,
//   DialogActions,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableRow,
//   Paper,
//   Container,
//   Stack,
//   IconButton,
//   TableContainer,
// } from '@mui/material';
// import axios from 'axios';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';

// const LessonManager = () => {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState('');
//   const [courseId, setCourseId] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [lessons, setLessons] = useState([]);

//   // Fetch courses
//   useEffect(() => {
//     axios.get('http://localhost:5000/courses')
//       .then(res => setCourses(res.data))
//       .catch(err => console.error('Error fetching courses:', err));
//   }, []);

//   // Fetch lessons
//   useEffect(() => {
//     axios.get('http://localhost:5000/lessons?_expand=course')
//       .then(res => setLessons(res.data))
//       .catch(err => console.error('Error fetching lessons:', err));
//   }, []);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setTitle('');
//     setCourseId('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !courseId) return alert('Fill all fields');

//     try {
//       const res = await axios.post('http://localhost:5000/lessons', {
//         title,
//         courseId,
//       });

//       // Fetch course for newly added lesson
//       const course = courses.find(c => c.id === courseId);
//       const newLesson = { ...res.data, course };

//       setLessons([...lessons, newLesson]);
//       handleClose();
//       alert('Lesson created!');
//     } catch (err) {
//       console.error('Submit error:', err);
//       alert('Error submitting lesson');
//     }
//   };

//   const handleEdit = (lesson) => {
//     alert(`Edit clicked for lesson: ${lesson.title}`);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this lesson?")) return;

//     try {
//       await axios.delete(`http://localhost:5000/lessons/${id}`);
//       setLessons(lessons.filter((lesson) => lesson.id !== id));
//       alert("Lesson deleted successfully!");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete lesson.");
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{ mt: 5 }}>
//       {/* Header */}
//       <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
//         <Typography variant="h5" fontWeight={700} color="primary.main">
//           Lesson Management
//         </Typography>
//         <Button variant="contained" onClick={handleOpen}>
//           Add Lesson
//         </Button>
//       </Stack>

//       {/* Dialog */}
//       <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
//         <DialogTitle>Create New Lesson</DialogTitle>
//         <DialogContent>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
//             <TextField
//               fullWidth
//               label="Lesson Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               sx={{ mb: 2 }}
//               required
//             />
//             <TextField
//               select
//               fullWidth
//               label="Select Course"
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               required
//             >
//               {courses.map(course => (
//                 <MenuItem key={course.id} value={course.id}>
//                   {course.title}
//                 </MenuItem>
//               ))}
//             </TextField>
//             <DialogActions sx={{ mt: 2 }}>
//               <Button onClick={handleClose}>Cancel</Button>
//               <Button type="submit" variant="contained">
//                 Create
//               </Button>
//             </DialogActions>
//           </Box>
//         </DialogContent>
//       </Dialog>

//       {/* Table */}
//       {lessons.length > 0 && (
//         <Paper elevation={3} sx={{ mt: 4 }}>
//           <TableContainer sx={{ maxHeight: 400 }}>
//             <Table stickyHeader>
//               <TableHead>
//                 <TableRow>
//                   <TableCell>Lesson Title</TableCell>
//                   <TableCell>Course</TableCell>
//                   <TableCell align="center">Actions</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {lessons.map((lesson, index) => (
//                   <TableRow key={index}>
//                     <TableCell>{lesson.title || 'N/A'}</TableCell>
//                     <TableCell>{lesson.course?.title || 'N/A'}</TableCell>
//                     <TableCell align="center">
//                       <Stack direction="row" spacing={1} justifyContent="center">
//                         <IconButton
//                           aria-label="edit"
//                           color="primary"
//                           onClick={() => handleEdit(lesson)}
//                         >
//                           <EditIcon />
//                         </IconButton>
//                         <IconButton
//                           aria-label="delete"
//                           color="error"
//                           onClick={() => handleDelete(lesson.id)}
//                         >
//                           <DeleteIcon />
//                         </IconButton>
//                       </Stack>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Paper>
//       )}
//     </Container>
//   );
// };

// export default LessonManager;
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Container,
  Stack,
  IconButton,
  TableContainer,
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LessonManager = () => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [editId, setEditId] = useState(null);
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);

  // Fetch all courses and lessons on mount
  useEffect(() => {
    fetchCourses();
    fetchLessons();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/courses');
      setCourses(res.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchLessons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessons?_expand=course');
      setLessons(res.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditing(false);
    setTitle('');
    setCourseId('');
    setEditId(null);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle('');
    setCourseId('');
    setEditId(null);
    setEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !courseId) return alert('Please fill all fields');

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/lessons/${editId}`, {
          title,
          courseId,
        });

        await fetchLessons(); // Refresh
        alert('Lesson updated!');
      } else {
        const res = await axios.post('http://localhost:5000/lessons', {
          title,
          courseId,
        });

        const course = courses.find((c) => c.id === courseId);
        setLessons([...lessons, { ...res.data, course }]);
        alert('Lesson created!');
      }

      handleClose();
    } catch (err) {
      console.error('Submit error:', err);
      alert('Something went wrong.');
    }
  };

  const handleEdit = (lesson) => {
    setEditing(true);
    setTitle(lesson.title);
    setCourseId(lesson.courseId);
    setEditId(lesson.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lesson?')) return;

    try {
      await axios.delete(`http://localhost:5000/lessons/${id}`);
      setLessons(lessons.filter((lesson) => lesson.id !== id));
      alert('Lesson deleted!');
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete lesson.');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10,ml:9 }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight={700} color='primary.main' mb={2} sx={{mt:2}}>
          Lesson Management
        </Typography>
        <Button variant="contained" size="large" onClick={handleOpen}>
          + Add Lesson
        </Button>
      </Stack>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? 'Edit Lesson' : 'Create New Lesson'}</DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Lesson Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              sx={{ mb: 2 }}
              required
            />
            <TextField
              select
              fullWidth
              label="Select Course"
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              required
            >
              {courses.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </TextField>
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" variant="contained">
                {editing ? 'Update' : 'Create'}
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Paper elevation={3}>
        <TableContainer sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Lesson Title</TableCell>
                <TableCell>Course</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons.length > 0 ? (
                lessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>{lesson.title || 'N/A'}</TableCell>
                    <TableCell>{lesson.course?.title || 'N/A'}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <IconButton
                          aria-label="edit"
                          color="primary"
                          onClick={() => handleEdit(lesson)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          color="error"
                          onClick={() => handleDelete(lesson.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No lessons available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default LessonManager;
