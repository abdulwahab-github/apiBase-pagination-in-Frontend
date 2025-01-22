import React, { useState } from 'react';
import axios from 'axios';

const CreateFrequentVisitForm = () => {
  const [formData, setFormData] = useState({
    frequentVisitTypeId: '',
    name: '',
    note: '',
    asset: '',
    indicateDays: ''
  });
  const [files, setFiles] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(files)
    const form = new FormData();
    form.append('frequentVisitTypeId', formData.frequentVisitTypeId);
    form.append('name', formData.name);
    form.append('note', formData.note);
    form.append('asset', formData.asset);
    form.append('indicateDays', formData.indicateDays);

    files.forEach((file, index) => {
      form.append('files', file);
    });

    try {
      const response = await axios.post('http://localhost:3000/admin/frequent-visit', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization':"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkVYUEdKVyIsImlkIjoiNjZiMWZhNzFlZTk4N2ZkOTZkYWM5ZmZkIiwiaWF0IjoxNzIzMTE1MjA0LCJleHAiOjE3MjMyMDE2MDR9.j6Z4HfXOJN-9yS6bywDPKd8ii47Wlu3lH1wbKGTfPw8"
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Frequent Visit Type ID:
        <input
          type="text"
          name="frequentVisitTypeId"
          value={formData.frequentVisitTypeId}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Note:
        <input
          type="text"
          name="note"
          value={formData.note}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Asset:
        <input
          type="text"
          name="asset"
          value={formData.asset}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Indicate Days:
        <input
          type="text"
          name="indicateDays"
          value={formData.indicateDays}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Upload Images:
        <input
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateFrequentVisitForm;
