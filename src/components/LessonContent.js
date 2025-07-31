import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';

const LessonContentManager = () => {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [contentList, setContentList] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    label: '',
    type: '',
    duration: '',
    url: '',
    title: '',
    lessonId: '',
  });

  const [isEditing, setIsEditing] = useState(false);
  const contentTypes = ['video', 'assignment', 'material', 'quiz'];

  const fetchLessons = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lessons');
      if (Array.isArray(res.data)) setLessons(res.data);
    } catch (err) {
      console.error('Error fetching lessons:', err);
    }
  };

  const fetchContentList = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lesson-content');
      console.log("Fetched content:", res.data);
      if (Array.isArray(res.data)) setContentList([...res.data]);
    } catch (err) {
      console.error('Error fetching lesson content:', err);
    }
  };

  useEffect(() => {
    fetchLessons();
    fetchContentList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      id: '',
      label: '',
      type: '',
      duration: '',
      url: '',
      title: '',
      lessonId: '',
    });
    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      label: formData.label,
      type: formData.type,
      lessonId: formData.lessonId,
      ...(formData.type === 'video' && {
        duration: formData.duration,
        url: formData.url,
      }),
      ...(formData.type === 'assignment' && {
        title: formData.title,
      }),
    };

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/lessons/content/${formData.id}`, payload);
        alert('Content updated');
      } else {
        await axios.post('http://localhost:5000/lessons/content', payload);
        alert('Content created');
      }
      fetchContentList();
      setOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error submitting form:', err);
      alert('Failed to submit');
    }
  };

  const handleEdit = (item) => {
    setFormData({
      id: item.id,
      label: item.label,
      type: item.type,
      duration: item.duration || '',
      url: item.url || '',
      title: item.title || '',
      lessonId: item.lessonId,
    });
    setIsEditing(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this content?')) return;
    try {
      await axios.delete(`http://localhost:5000/lessons/content/${id}`);
      fetchContentList();
    } catch (err) {
      console.error('Delete failed', err);
      alert('Failed to delete content');
    }
  };

  return (
    <Container sx={{ mt: 10 }}>
      <Typography  variant="h4" fontWeight={600} color='primary.main' mb={2}>
        Lesson Content Management
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Lesson Content
      </Button>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => { setOpen(false); resetForm(); }} fullWidth maxWidth="sm">
        <DialogTitle>{isEditing ? 'Edit' : 'Create'} Lesson Content</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}
          >
            <TextField
              label="Label"
              name="label"
              value={formData.label}
              onChange={handleChange}
              fullWidth
              required
            />

            <TextField
              select
              label="Content Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              fullWidth
              required
            >
              {contentTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            {formData.type === 'video' && (
              <>
                <TextField
                  label="Duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Video URL"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </>
            )}

            {formData.type === 'assignment' && (
              <TextField
                label="Assignment Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                required
              />
            )}

            <TextField
              select
              label="Lesson"
              name="lessonId"
              value={formData.lessonId}
              onChange={handleChange}
              fullWidth
              required
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.id} value={lesson.id}>
                  {lesson.title}
                </MenuItem>
              ))}
            </TextField>

            <Button type="submit" variant="contained" color="primary">
              {isEditing ? 'Update' : 'Submit'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Table */}
      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h6" color="primary">
          Lesson Contents
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>URL</TableCell>
              <TableCell>Assignment Title</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(contentList) && contentList.length > 0 ? (
              contentList.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.label}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.lesson?.title || item.lessonId}</TableCell>
                  <TableCell>{item.duration || '-'}</TableCell>
                  <TableCell>{item.url || '-'}</TableCell>
                  <TableCell>{item.title || '-'}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(item)} color="primary">
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item.id)} color="error">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  No content available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default LessonContentManager;
