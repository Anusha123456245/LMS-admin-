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
  Alert
} from '@mui/material';
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
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/quiz');
          console.log('Fetched quizzes:', res.data); // <-- DEBUG LOG

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

  useEffect(() => {
    fetchQuizzes();
    fetchQuestions();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        question: formData.question,
        options: formData.options,
        answer: formData.answer,
        quizId: formData.quizId
      };
      await axios.post('http://localhost:5000/quiz-question', payload);
      setSnackbar({ open: true, message: 'Quiz question created successfully!', severity: 'success' });
      setOpen(false);
      setFormData({
        question: '',
        options: ['', '', '', ''],
        answer: '',
        quizId: ''
      });
      fetchQuestions(); // Refresh list
    } catch (error) {
      console.error('Error creating quiz question:', error);
      setSnackbar({ open: true, message: 'Failed to create quiz question', severity: 'error' });
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box sx={{ p: 4,mt:5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Quiz Questions
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Quiz Question
      </Button>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Options</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Quiz</TableCell>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Create Quiz Question</DialogTitle>
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
  fullWidth
  select
  margin="normal"
  label="Quiz"
  name="quizId"
  value={formData.quizId}
  onChange={handleChange}
>
  {quizList.map((quiz) => (
    <MenuItem key={quiz.id} value={quiz.id}>
      {quiz.title}
    </MenuItem>
  ))}
</TextField>
 
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
