
// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   MenuItem,
//   Button,
//   Typography,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Snackbar,
//   Alert,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableContainer,
//   IconButton,
//   CircularProgress,
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';

// const initialState = {
//   label: '',
//   type: '',
//   pages: '',
//   size: '',
//   link: '',
//   download: '',
//   description: '',
//   author: '',
//   lessonContentId: '',
// };

// export default function MaterialManager() {
//   const [formData, setFormData] = useState(initialState);
//   const [materials, setMaterials] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//   const [lessonContents, setLessonContents] = useState([]);
//   const [loadingLessons, setLoadingLessons] = useState(false);
//   const [editId, setEditId] = useState(null);

//   useEffect(() => {
//     fetchLessonContent();
//     fetchMaterials();
//   }, []);

//   const fetchLessonContent = async () => {
//     try {
//       setLoadingLessons(true);
//       const res = await axios.get('http://localhost:5000/lesson-content');
//       setLessonContents(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       console.error('Error fetching lesson content:', error);
//     } finally {
//       setLoadingLessons(false);
//     }
//   };

//   const fetchMaterials = async () => {
//     try {
//       const res = await axios.get('http://localhost:5000/materials');
//       setMaterials(res.data);
//     } catch (error) {
//       console.error('Failed to fetch materials:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEdit = (material) => {
//     setFormData(material);
//     setEditId(material.id);
//     setOpen(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this material?')) {
//       try {
//         await axios.delete(`http://localhost:5000/materials/${id}`);
//         setSnackbar({ open: true, message: 'Material deleted.', severity: 'info' });
//         fetchMaterials();
//       } catch (error) {
//         console.error('Delete failed:', error);
//         setSnackbar({ open: true, message: 'Delete failed.', severity: 'error' });
//       }
//     }
//   };

//   const validateForm = () => {
//     const requiredFields = ['label', 'type', 'link', 'download', 'lessonContentId'];
//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         setSnackbar({ open: true, message: `${field} is required.`, severity: 'error' });
//         return false;
//       }
//     }

//     const urlPattern = /^(https?:\/\/)/;
//     if (!urlPattern.test(formData.link)) {
//       setSnackbar({ open: true, message: 'Link must be a valid URL.', severity: 'error' });
//       return false;
//     }
//     if (!urlPattern.test(formData.download)) {
//       setSnackbar({ open: true, message: 'Download URL must be valid.', severity: 'error' });
//       return false;
//     }

//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       if (editId) {
//         await axios.put(`http://localhost:5000/materials/${editId}`, formData);
//         setSnackbar({ open: true, message: 'Material updated!', severity: 'success' });
//       } else {
//         await axios.post('http://localhost:5000/materials', formData);
//         setSnackbar({ open: true, message: 'Material created!', severity: 'success' });
//       }
//       setOpen(false);
//       setFormData(initialState);
//       setEditId(null);
//       fetchMaterials();
//     } catch (error) {
//       console.error('Save failed:', error.response?.data || error.message);
//       setSnackbar({ open: true, message: 'Save failed.', severity: 'error' });
//     }
//   };

//   return (
//     <Box sx={{ p: 4, mt: 5 }}>
//       <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
//         Study Materials
//       </Typography>

//       <Button variant="contained" onClick={() => { setOpen(true); setFormData(initialState); setEditId(null); }}>
//         Add Material
//       </Button>

//       <TableContainer component={Paper} sx={{ mt: 4 }}>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell>Label</TableCell>
//               <TableCell>Type</TableCell>
//               <TableCell>Size</TableCell>
//               <TableCell>Link</TableCell>
//               <TableCell>Author</TableCell>
//               <TableCell>Lesson</TableCell>
//               <TableCell align="right">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {materials.map((material) => (
//               <TableRow key={material.id}>
//                 <TableCell>{material.label}</TableCell>
//                 <TableCell>{material.type}</TableCell>
//                 <TableCell>{material.size}</TableCell>
//                 <TableCell>
//                   <a href={material.link} target="_blank" rel="noopener noreferrer">View</a>
//                 </TableCell>
//                 <TableCell>{material.author}</TableCell>
//                 <TableCell>{material.lessonContent?.title || material.lessonContentId}</TableCell>
//                 <TableCell align="right">
//                   <IconButton onClick={() => handleEdit(material)} color="primary">
//                     <EditIcon />
//                   </IconButton>
//                   <IconButton onClick={() => handleDelete(material.id)} color="error">
//                     <DeleteIcon />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>

//       {/* Dialog Form */}
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
//         <DialogTitle>{editId ? 'Edit Material' : 'Add Material'}</DialogTitle>
//         <DialogContent>
//           <form onSubmit={handleSubmit}>
//             <Grid container spacing={2} direction="column">
//               <Grid item>
//                 <TextField label="Label" name="label" value={formData.label} onChange={handleChange} fullWidth required />
//               </Grid>
//               <Grid item>
//                 <TextField select label="Material Type" name="type" value={formData.type} onChange={handleChange} fullWidth required>
//                   {['PDF', 'VIDEO', 'IMAGE'].map((type) => (
//                     <MenuItem key={type} value={type}>
//                       {type}
//                     </MenuItem>
//                   ))}
//                 </TextField>
//               </Grid>
//               <Grid item>
//                 <TextField label="Pages" name="pages" type="number" value={formData.pages} onChange={handleChange} fullWidth />
//               </Grid>
//               <Grid item>
//                 <TextField label="Size (MB)" name="size" value={formData.size} onChange={handleChange} fullWidth />
//               </Grid>
//               <Grid item>
//                 <TextField label="Link (URL)" name="link" value={formData.link} onChange={handleChange} fullWidth required />
//               </Grid>
//               <Grid item>
//                 <TextField label="Download Link" name="download" value={formData.download} onChange={handleChange} fullWidth required />
//               </Grid>
//               <Grid item>
//                 <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} />
//               </Grid>
//               <Grid item>
//                 <TextField label="Author" name="author" value={formData.author} onChange={handleChange} fullWidth />
//               </Grid>
//               <Grid item>
//                 <TextField fullWidth select label="Lesson Content" name="lessonContentId" value={formData.lessonContentId} onChange={handleChange}>
//                   {loadingLessons ? (
//                     <MenuItem disabled>
//                       <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
//                     </MenuItem>
//                   ) : lessonContents.length > 0 ? (
//                     lessonContents.map((lesson) => (
//                       <MenuItem key={lesson.id} value={lesson.id}>
//                         {lesson.label || lesson.title || `${lesson.type} - ${lesson.id}`}
//                       </MenuItem>
//                     ))
//                   ) : (
//                     <MenuItem disabled>No lesson content found</MenuItem>
//                   )}
//                 </TextField>
//               </Grid>
//             </Grid>
//             <DialogActions sx={{ mt: 2 }}>
//               <Button onClick={() => setOpen(false)}>Cancel</Button>
//               <Button variant="contained" type="submit">{editId ? 'Update' : 'Save'}</Button>
//             </DialogActions>
//           </form>
//         </DialogContent>
//       </Dialog>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }
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
  IconButton,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const MATERIAL_TYPES = ['PDF', 'Video', 'Image']; // Case-sensitive match

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
  const [materials, setMaterials] = useState([]);
  const [open, setOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [lessonContents, setLessonContents] = useState([]);
  const [loadingLessons, setLoadingLessons] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    fetchLessonContent();
    fetchMaterials();
  }, []);

  const fetchLessonContent = async () => {
    try {
      setLoadingLessons(true);
      const res = await axios.get('http://localhost:5000/lesson-content');
      setLessonContents(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error('Error fetching lesson content:', error);
    } finally {
      setLoadingLessons(false);
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
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };


   const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleEdit = (material) => {
    setFormData({
      ...material,
      pages: material.pages?.toString() || '',
    });
    setEditId(material.id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await axios.delete(`http://localhost:5000/materials/${id}`);
        setSnackbar({ open: true, message: 'Material deleted.', severity: 'info' });
        fetchMaterials();
      } catch (error) {
        console.error('Delete failed:', error);
        setSnackbar({ open: true, message: 'Delete failed.', severity: 'error' });
      }
    }
  };

  const validateForm = () => {
    const requiredFields = ['label', 'type', 'link', 'download', 'lessonContentId'];
    for (let field of requiredFields) {
      if (!formData[field]) {
        setSnackbar({ open: true, message: `${field} is required.`, severity: 'error' });
        return false;
      }
    }

    const urlPattern = /^(https?:\/\/)/;
    if (!urlPattern.test(formData.link)) {
      setSnackbar({ open: true, message: 'Link must be a valid URL.', severity: 'error' });
      return false;
    }
    if (!urlPattern.test(formData.download)) {
      setSnackbar({ open: true, message: 'Download URL must be valid.', severity: 'error' });
      return false;
    }

    return true;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  // Capitalize only the first letter for enum compatibility
  if (!['PDF', 'Video', 'Image'].includes(formData.type)) {
  setSnackbar({ open: true, message: 'Type must be PDF, VIDEO, or IMAGE', severity: 'error' });
  return;
}

const payload = {
  ...formData,
  pages: formData.pages ? parseInt(formData.pages, 10) : undefined,
};


  try {
    setLoadingSubmit(true);

    if (editId) {
      await axios.put(`http://localhost:5000/materials/${editId}`, payload);
      setSnackbar({ open: true, message: 'Material updated!', severity: 'success' });
    } else {
      await axios.post('http://localhost:5000/materials', payload);
      setSnackbar({ open: true, message: 'Material created!', severity: 'success' });
    }

    setOpen(false);
    setFormData(initialState);
    setEditId(null);
    fetchMaterials();
  } catch (error) {
    const msg = error.response?.data?.message || 'Save failed.';
    console.error('Save failed:', error);
    setSnackbar({
      open: true,
      message: Array.isArray(msg) ? msg.join(', ') : msg,
      severity: 'error',
    });
  } finally {
    setLoadingSubmit(false);
  }
};



  return (
    <Box sx={{ p: 4, mt: 5 }}>
      <Typography variant="h4" fontWeight={600} color="primary.main" mb={2}>
        Study Materials
      </Typography>

      <Button variant="contained" onClick={() => { setOpen(true); setFormData(initialState); setEditId(null); }}>
        Add Material
      </Button>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell>Label</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Pages</TableCell> {/* <-- Added */}
              <TableCell>Size</TableCell>
              <TableCell>Link</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Lesson</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials.map((material) => (
              <TableRow key={material.id}>
                <TableCell>{material.label}</TableCell>
                <TableCell>{material.type}</TableCell>
                <TableCell>{material.pages}</TableCell>
                <TableCell>{material.size}</TableCell>
                <TableCell>
                  <a href={material.link} target="_blank" rel="noopener noreferrer">View</a>
                </TableCell>
                <TableCell>{material.author}</TableCell>
                <TableCell>{material.lessonContent?.title || material.lessonContentId}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(material)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(material.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle sx={{ color: "primary.main", fontWeight: 800 ,fontSize:'24px',}}>{editId ? 'Edit Material' : 'Add Material'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} direction="column" sx={{mt:2}}>
              <Grid item>
                <TextField label="Label" name="label" value={formData.label} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item>
                <TextField select label="Material Type" name="type" value={formData.type} onChange={handleChange} fullWidth required>
                  {MATERIAL_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item>
                <TextField label="Pages" name="pages" type="number" value={formData.pages} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item>
                <TextField label="Size (MB)" name="size" value={formData.size} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item>
                <TextField label="Link (URL)" name="link" value={formData.link} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item>
                <TextField label="Download Link" name="download" value={formData.download} onChange={handleChange} fullWidth required />
              </Grid>
              <Grid item>
                <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth multiline rows={3} />
              </Grid>
              <Grid item>
                <TextField label="Author" name="author" value={formData.author} onChange={handleChange} fullWidth />
              </Grid>
              <Grid item>
                <TextField fullWidth select label="Lesson Content" name="lessonContentId" value={formData.lessonContentId} onChange={handleChange}>
                  {loadingLessons ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  ) : lessonContents.length > 0 ? (
                    lessonContents.map((lesson) => (
                      <MenuItem key={lesson.id} value={lesson.id}>
                        {lesson.label || lesson.title || `${lesson.type} - ${lesson.id}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No lesson content found</MenuItem>
                  )}
                </TextField>
              </Grid>
            </Grid>
            <DialogActions sx={{ mt: 2 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" type="submit" disabled={loadingSubmit}>
                {loadingSubmit ? <CircularProgress size={20} /> : editId ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>

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
