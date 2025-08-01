import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Snackbar,
  Alert,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function QuizQuestionPage() {
  const [formData, setFormData] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    quizId: ''
  });

  const [quizList, setQuizList] = useState([]);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/quiz');
            console.log("Quiz data fetched:", res.data); // ✅ check what's coming

      setQuizList(res.data);
    } catch (error) {
      console.error('Failed to fetch quizzes:', error);
      showSnackbar('Failed to load quizzes', 'error');
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get('http://localhost:5000/quiz-question');
      setQuizQuestions(res.data);
    } catch (error) {
      console.error('Failed to fetch quiz questions:', error);
      showSnackbar('Failed to load quiz questions', 'error');
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = parseInt(name.slice(-1));
      const newOptions = [...formData.options];
      newOptions[index] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleOpenDialog = (question = null) => {
    if (question) {
      setEditingId(question.id);
      setFormData({
        question: question.question,
        options: question.options || ['', '', '', ''],
        answer: question.answer,
        quizId: question.quizId
      });
    } else {
      setEditingId(null);
      setFormData({ question: '', options: ['', '', '', ''], answer: '', quizId: '' });
    }
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await axios.delete(`http://localhost:5000/quiz-question/${id}`);
        showSnackbar('Question deleted successfully');
        fetchQuestions();
      } catch (error) {
        console.error('Delete failed:', error);
        showSnackbar('Failed to delete question', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      question: formData.question,
      options: formData.options,
      answer: formData.answer,
      quizId: formData.quizId
    };
    try {
      if (editingId) {
await axios.patch(`http://localhost:5000/quiz-question/${editingId}`, payload);
        showSnackbar('Question updated successfully');
      } else {
        await axios.post('http://localhost:5000/quiz-question', payload);
        showSnackbar('Question created successfully');
      }
      setOpen(false);
      setEditingId(null);
      setFormData({ question: '', options: ['', '', '', ''], answer: '', quizId: '' });
      fetchQuestions();
    } catch (error) {
      console.error('Save failed:', error);
      showSnackbar('Failed to save question', 'error');
    }
  };

  return (
    <Box sx={{ p: 4, mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Quiz Questions
      </Typography>

      <Button variant="contained" onClick={() => handleOpenDialog()}>
        Add Quiz Question
      </Button>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Quiz</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quizQuestions.map((q) => (
              <TableRow key={q.id}>
                <TableCell>{q.question}</TableCell>
                <TableCell>
                  {q.options?.map((opt, i) => (
                    <div key={i}>{opt}</div>
                  ))}
                </TableCell>
                <TableCell>{q.answer}</TableCell>
                <TableCell>{q.quiz?.title || q.quizId}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenDialog(q)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(q.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "primary.main", fontWeight: 800 ,fontSize:'24px',}}>
          {editingId ? 'Edit' : 'Create'} Quiz Question
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Question"
            name="question"
            value={formData.question}
            onChange={handleChange}
          />
          {[0, 1, 2, 3].map((i) => (
            <TextField
              key={i}
              fullWidth
              margin="normal"
              label={`Option ${i + 1}`}
              name={`option${i}`}
              value={formData.options[i]}
              onChange={handleChange}
            />
          ))}
          <TextField
            fullWidth
            margin="normal"
            label="Answer"
            name="answer"
            value={formData.answer}
            onChange={handleChange}
          />
         <TextField
  select
  fullWidth
  label="Quiz"
  name="quizId"
  margin="normal"
  value={formData.quizId}
  onChange={handleChange}
>
  {quizList.length === 0 ? (
    <MenuItem disabled>No quizzes available</MenuItem>
  ) : (
    quizList.map((quiz) => (
      <MenuItem key={quiz.id} value={quiz.id}>
        {quiz.title || quiz.name || `Quiz ${quiz.id}`}
      </MenuItem>
    ))
  )}
</TextField>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {editingId ? 'Update' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
