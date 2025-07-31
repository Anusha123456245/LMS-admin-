import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
} from '@mui/material';
import axios from 'axios';

const initialState = {
  label: '',
  type: '',
  pages: '',
  size: '',
  link: '',
  download: '',
  description: '',
  author: '',
  lessonContentId: '',
};

export default function MaterialManager() {
  const [formData, setFormData] = useState(initialState);
  const [lessonContentList, setLessonContentList] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchLessonContent();
    fetchMaterials();
  }, []);

  const fetchLessonContent = async () => {
    try {
      const res = await axios.get('http://localhost:5000/lesson-content');
      setLessonContentList(res.data);
    } catch (error) {
      console.error('Failed to fetch lesson content:', error);
    }
  };

  const fetchMaterials = async () => {
    try {
      const res = await axios.get('http://localhost:5000/materials');
      setMaterials(res.data);
    } catch (error) {
      console.error('Failed to fetch materials:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/materials', formData);
      setSnackbar({ open: true, message: 'Material created successfully!', severity: 'success' });
      setOpen(false);
      setFormData(initialState);
      fetchMaterials();
    } catch (error) {
      console.error('Error creating material:', error);
      setSnackbar({ open: true, message: 'Failed to create material', severity: 'error' });
    }
  };

  return (
    <Box sx={{ p: 4,mt:5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2} >
        Study Materials
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Material
      </Button>

      {/* Table */}
      <TableContainer component={Paper} sx={{ mt: 4, }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Lesson</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.label}</TableCell>
                <TableCell>{material.type}</TableCell>
                <TableCell>{material.size}</TableCell>
                <TableCell>
                  <a href={material.link} target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </TableCell>
                <TableCell>{material.author}</TableCell>
                <TableCell>{material.lessonContent?.title || material.lessonContentId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Add Study Material</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column">
              <Grid item>
                <TextField
                  label="Label"
                  name="label"
                  value={formData.label}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  label="Material Type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {['PDF', 'Video', 'Image'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField
                  label="Pages"
                  name="pages"
                  type="number"
                  value={formData.pages}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Size (MB)"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Link (URL)"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Download Link"
                  name="download"
                  value={formData.download}
                  onChange={handleChange}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  fullWidth
                  multiline
                  rows={3}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Author"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item>
                <TextField
                  select
                  label="Lesson Content"
                  name="lessonContentId"
                  value={formData.lessonContentId}
                  onChange={handleChange}
                  fullWidth
                  required
                >
                  {lessonContentList.map((lesson) => (
                    <MenuItem key={lesson.id} value={lesson.id}>
                      {lesson.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" type="submit">Save</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

      {/* Snackbar Notification */}
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
