import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Toast } from 'primereact/toast';
import { useRef } from 'react';

const UploadedCourses = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const toast = useRef(null);

  const handleSubmit = () => {
    // Replace this with actual logic to save data
    toast.current.show({
      severity: 'success',
      summary: 'Success',
      detail: 'Course Uploaded Successfully!',
    });
    // Reset form
    setTitle('');
    setType('');
  };

  const cardStyle = {
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 0 15px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
    maxWidth: '850px',
    margin: 'auto',
    marginTop: '2rem',
    backgroundColor: '#ffffff',
  };

  return (
    <>
      <Toast ref={toast} />
      <Card style={cardStyle}>
        <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '0.5rem' }}>
          📥 Upload Course Materials
        </h2>
        <p style={{ textAlign: 'center', color: '#6c757d' }}>
          Add master content such as videos, documents, and quizzes.
        </p>

        <Divider />

        <div className="p-fluid p-grid">
          <div className="p-field p-col-12 p-md-6" style={{ padding: '1rem' }}>
            <label htmlFor="title" className="p-d-block p-mb-2" style={{ fontWeight: 600 }}>Course Title</label>
            <InputText
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Java Basics"
              className="p-inputtext-lg"
            />
          </div>

          <div className="p-field p-col-12 p-md-6" style={{ padding: '1rem' }}>
            <label htmlFor="type" className="p-d-block p-mb-2" style={{ fontWeight: 600 }}>Content Type</label>
            <InputText
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              placeholder="Video / Material / Quiz"
              className="p-inputtext-lg"
            />
          </div>

          <div className="p-field p-col-12" style={{ padding: '1rem' }}>
            <label htmlFor="upload" className="p-d-block p-mb-2" style={{ fontWeight: 600 }}>Upload File</label>
            <FileUpload
              name="demo[]"
              mode="basic"
              chooseLabel="Select File"
              customUpload
              className="p-button-outlined p-button-info"
              style={{ width: '100%' }}
            />
          </div>

          <div className="p-field p-col-12" style={{ padding: '1rem', textAlign: 'center' }}>
            <Button
              label="Save Entry"
              icon="pi pi-save"
              className="p-button-rounded p-button-success p-button-lg"
              onClick={handleSubmit}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default UploadedCourses;
