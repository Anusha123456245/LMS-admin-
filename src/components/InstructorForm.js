
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Stack
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

const API_URL = 'http://localhost:5000/instructors'; // Replace with your actual endpoint

const initialForm = {
  name: '',
  bio: ''
};

export default function InstructorFormWithTable() {
  const [form, setForm] = useState(initialForm);
  const [instructors, setInstructors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchInstructors();
  }, []);

const fetchInstructors = async () => {
  try {
    const res = await axios.get(API_URL);
    console.log("Fetched instructors:", res.data);
    setInstructors(res.data);
  } catch (err) {
    console.error("Error fetching instructors:", err);
  }
};



  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };


const handleSubmit = async () => {
  try {
    if (editingId) {
      // Update instructor
      await axios.put(`${API_URL}/${editingId}`, form);
      showSnackbar('Instructor updated successfully');
    } else {
      // Create new instructor
      const res = await axios.post(API_URL, form);
      console.log("Created instructor:", res.data);
      showSnackbar('Instructor created successfully');
    }

    handleClose();             // Close dialog and reset
    await fetchInstructors();  // Refresh table data
  } catch (err) {
    console.error('Submit Error:', err);
    showSnackbar('Error saving instructor', 'error');
  }
};


  
  const handleEdit = (instructor) => {
    console.log("Editing:", instructor); 
    setForm(instructor);
    setEditingId(instructor.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    if(!window.confirm('Are you sure you want to delete')) return;
    try{
      await axios.delete(`${API_URL}/${id}`);
      showSnackbar('Instructor deleted');
      fetchInstructors();
    } catch (err){
      showSnackbar('Error deleting instructor','error');
    }
  };

  const handleClose = () => {
    setForm(initialForm);
    setEditingId(null);
    setOpenDialog(false);
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  return (
    <Box p={2} sx={{ mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Instructor Management
      </Typography>
<Button
  variant="contained"
  startIcon={<Add />}
  onClick={() => {
    setForm(initialForm);     // <-- reset form explicitly
    setEditingId(null);       // <-- clear editing mode
    setOpenDialog(true);
  }}
  sx={{ mb: 2 }}
>
  Add Instructor
</Button>

      
      <Dialog
        open={openDialog}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            backgroundColor: '#f5f5f5',
            boxShadow: 6
          }
        }}
      >
        <DialogTitle
          sx={{
            p: 3,
            borderBottom: '1px solid #ccc',
            backgroundColor: '#f5f5f5'
          }}
        >
          <Typography variant="h5" sx={{ color: 'primary.main', fontWeight: 'bold', ml: 1 }}>
            {editingId ? 'Edit Instructor' : 'Add Instructor'}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 4 }}>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              label="Bio"
              name="bio"
              multiline
              rows={4}
              value={form.bio}
              onChange={handleChange}
            />
          </Stack>
        </DialogContent>

        <DialogActions sx={{ backgroundColor: '#f5f5f5', px: 4, py: 2 }}>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit} color="primary">
            {editingId ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Bio</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
  {instructors.map((instructor) => (
    <TableRow key={instructor.id}>
      <TableCell>{instructor.name}</TableCell>
      <TableCell
        sx={{
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          maxWidth: 400,
        }}
      >
        {instructor.bio}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(instructor)} color="primary">
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDelete(instructor.id)} color="error">
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </TableContainer>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
