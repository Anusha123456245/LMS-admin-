// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TextField,
//   Typography,
//   Paper,
//   MenuItem,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import axios from 'axios';

// export default function QuizManager() {
//   const [formData, setFormData] = useState({
//     label: '',
//     questions: '',
//     duration: '',
//     marks: '',
//     lessonContentId: ''
//   });
//   const [quizzes, setQuizzes] = useState([]);
//   const [lessonContents, setLessonContents] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [snackOpen, setSnackOpen] = useState(false);

//   // Fetch existing quizzes and lesson content
//   useEffect(() => {
//     fetchQuizzes();
//     fetchLessonContents();
//   }, []);

//   const fetchQuizzes = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/quiz');
//       setQuizzes(res.data);
//     } catch (error) {
//       console.error('Error fetching quizzes:', error);
//     }
//   };

//   const fetchLessonContents = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/lesson-content');
//       setLessonContents(res.data);
//     } catch (error) {
//       console.error('Error fetching lesson content:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const payload = {
//         ...formData,
//         questions: parseInt(formData.questions),
//         duration: parseInt(formData.duration),
//         marks: parseInt(formData.marks)
//       };
//       await axios.post('http://localhost:5000/quiz', payload);
//       setSnackOpen(true);
//       fetchQuizzes(); // Refresh table
//       setOpenDialog(false);
//       setFormData({
//         label: '',
//         questions: '',
//         duration: '',
//         marks: '',
//         lessonContentId: ''
//       });
//     } catch (err) {
//       console.error('Error creating quiz:', err);
//       alert('Failed to create quiz.');
//     }
//   };

//   return (
//     <Box sx={{ p: 4,mt:5 }}>
//       <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
//         Quiz Management
//       </Typography>

//       <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
//         Create Quiz
//       </Button>

//       {/* Table for quizzes */}
//       <Paper sx={{ overflowX: 'auto' }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Label</TableCell>
//               <TableCell>Questions</TableCell>
//               <TableCell>Duration (mins)</TableCell>
//               <TableCell>Marks</TableCell>
//               <TableCell>Lesson Content</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {quizzes.map((quiz) => (
//               <TableRow key={quiz.id}>
//                 <TableCell>{quiz.label}</TableCell>
//                 <TableCell>{quiz.questions}</TableCell>
//                 <TableCell>{quiz.duration}</TableCell>
//                 <TableCell>{quiz.marks}</TableCell>
//                 <TableCell>{quiz.lessonContent?.title || quiz.lessonContentId}</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </Paper>

//       {/* Dialog for quiz form */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle sx={{ backgroundColor: 'primary', fontWeight: 'bold' }}>Create Quiz</DialogTitle>
//         <DialogContent>
//           <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Label"
//               name="label"
//               value={formData.label}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Questions Count"
//               name="questions"
//               type="number"
//               value={formData.questions}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Duration (mins)"
//               name="duration"
//               type="number"
//               value={formData.duration}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Marks"
//               name="marks"
//               type="number"
//               value={formData.marks}
//               onChange={handleChange}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               select
//               label="Lesson Content"
//               name="lessonContentId"
//               value={formData.lessonContentId}
//               onChange={handleChange}
//             >
//               {lessonContents.map((lesson) => (
//                 <MenuItem key={lesson.id} value={lesson.id}>
//                   {lesson.title}
//                 </MenuItem>
//               ))}
//             </TextField>
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Success Snackbar */}
//       <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
//         <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
//           Quiz created successfully!
//         </Alert>
//       </Snackbar>
//     </Box>
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
  Typography,
  Paper,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableContainer,
  TableBody,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function QuizManager() {
  const [formData, setFormData] = useState({
    label: '',
    questions: '',
    duration: '',
    marks: '',
    lessonContentId: ''
  });
  const [quizzes, setQuizzes] = useState([]);
  const [lessonContents, setLessonContents] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    fetchQuizzes();
    fetchLessonContents();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/quiz');
      setQuizzes(res.data);
    } catch (error) {
      console.error('Error fetching quizzes:', error);
    }
  };

  const fetchLessonContents = async () => {
    try {
      setLoadingLessons(true);
      const res = await axios.get('http://localhost:5000/lesson-content');
          console.log('Fetched lesson contents:', res.data); // <- Add this

      if (Array.isArray(res.data)) {
        setLessonContents(res.data);
      } else {
        console.warn('Unexpected lesson content format:', res.data);
        setLessonContents([]);
      }
    } catch (error) {
      console.error('Error fetching lesson content:', error);
      setLessonContents([]);
    } finally {
      setLoadingLessons(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        questions: parseInt(formData.questions),
        duration: parseInt(formData.duration),
        marks: parseInt(formData.marks)
      };
      await axios.post('http://localhost:5000/quiz', payload);
      setSnackOpen(true);
      fetchQuizzes();
      setOpenDialog(false);
      setFormData({
        label: '',
        questions: '',
        duration: '',
        marks: '',
        lessonContentId: ''
      });
    } catch (err) {
      console.error('Error creating quiz:', err);
      alert('Failed to create quiz.');
    }
  };
  const handleEdit = (quiz) => {
  setFormData({
    label: quiz.label,
    questions: quiz.questions,
    duration: quiz.duration,
    marks: quiz.marks,
    lessonContentId: quiz.lessonContentId
  });
  setOpenDialog(true);
};

const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this quiz?")) {
    try {
      await axios.delete(`http://localhost:5000/quiz/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error("Failed to delete quiz", err);
    }
  }
};


  return (
    <Box sx={{ p: 4, mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Quiz Management
      </Typography>

      <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
        Create Quiz
      </Button>

     <Paper sx={{ overflowX: 'auto', mt: 3 }}>
  <TableContainer>
    <Table>
      <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
        <TableRow>
          <TableCell><strong>Label</strong></TableCell>
          <TableCell><strong>Questions</strong></TableCell>
          <TableCell><strong>Duration (mins)</strong></TableCell>
          <TableCell><strong>Marks</strong></TableCell>
          <TableCell><strong>Lesson Content</strong></TableCell>
          <TableCell><strong>Actions</strong></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quizzes.map((quiz) => (
          <TableRow key={quiz.id}>
            <TableCell>{quiz.label}</TableCell>
            <TableCell>{quiz.questions}</TableCell>
            <TableCell>{quiz.duration}</TableCell>
            <TableCell>{quiz.marks}</TableCell>
            <TableCell>
              {quiz.lessonContent?.title || quiz.lessonContentId || 'N/A'}
            </TableCell>
            <TableCell>
              <IconButton onClick={() => handleEdit(quiz)} color="primary">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(quiz.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Paper>


      {/* Create Quiz Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "primary.main", fontWeight: 800 ,fontSize:'24px',}}>Create Quiz</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate autoComplete="off" sx={{ }}>
            <TextField
              fullWidth
              margin="normal"
              label="Label"
              name="label"
              value={formData.label}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Questions Count"
              name="questions"
              type="number"
              value={formData.questions}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Duration (mins)"
              name="duration"
              type="number"
              value={formData.duration}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Marks"
              name="marks"
              type="number"
              value={formData.marks}
              onChange={handleChange}
            />
            {/* <TextField
              fullWidth
              margin="normal"
              select
              label="Lesson Content"
              name="lessonContentId"
              value={formData.lessonContentId}
              onChange={handleChange}
            >
              {loadingLessons ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                </MenuItem>
              ) : lessonContents.length > 0 ? (
                lessonContents.map((lesson) => (
                  <MenuItem key={lesson.id} value={lesson.id}>
                    {lesson.title}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No lesson content found</MenuItem>
              )}
            </TextField> */}
          <TextField
  fullWidth
  margin="normal"
  select
  label="Lesson Content"
  name="lessonContentId"
  value={formData.lessonContentId}
  onChange={handleChange}
>
  {loadingLessons ? (
    <MenuItem disabled>
      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
    </MenuItem>
  ) : lessonContents.length > 0 ? (
    lessonContents.map((lesson) => (
      <MenuItem key={lesson.id} value={lesson.id}>
        {/* 👇 Adjust label here */}
        {lesson.label || lesson.title || `${lesson.type} - ${lesson.id}`}
      </MenuItem>
    ))
  ) : (
    <MenuItem disabled>No lesson content found</MenuItem>
  )}
</TextField>


          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackOpen} autoHideDuration={3000} onClose={() => setSnackOpen(false)}>
        <Alert onClose={() => setSnackOpen(false)} severity="success" sx={{ width: '100%' }}>
          Quiz created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
