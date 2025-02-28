import React, { useState } from 'react';

const UploadGCP = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tagValue, setTagValue] = useState('');
  const [exteriorFile, setExteriorFile] = useState(null);
  const [interiorFile, setInteriorFile] = useState(null);
  const [mechanicalFile, setMechanicalFile] = useState(null);
  const [documentFile, setDocumentFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission

  const handleTagInputChange = (e) => {
    setTagValue(e.target.value);
  };


  const handleLogin = () => {
    // Implement login logic here
    setIsLoggedIn(true); // For demo, setting isLoggedIn to true directly
  };

  const handleFileChange = (e, setterFunction) => {
    setterFunction(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading state
  
    const formData = new FormData();
    exteriorFile?.forEach(file => formData.append('exterior', file));
    interiorFile?.forEach(file => formData.append('interior', file));
    mechanicalFile?.forEach(file => formData.append('mechanical', file));
    documentFile?.forEach(file => formData.append('document', file));
    formData.append('tag_name', tagValue);
  
    try {
      const response = await fetch('https://winding-backend.vercel.app/api/uploadImages', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload');
      }
  
      const data = await response.json();
      setUploadStatus(data.message);
      console.log("uploaded");
  
      // Show success message for 3 seconds
      setTimeout(() => {
        setUploadStatus(null);
      }, 3000);
  
    } catch (error) {
      setUploadStatus('Error uploading image');
      console.error('Error uploading image:', error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };
  if (!isLoggedIn) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h1>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ fontSize: '16px', padding: '10px', width: '100%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ fontSize: '16px', padding: '10px', width: '100%', marginBottom: '20px', borderRadius: '5px', border: '1px solid #ccc' }} />
          <button onClick={handleLogin} style={{ fontSize: '18px', padding: '12px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', textAlign: 'center' }}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', margin: '0', height: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Upload Images and Documents</h1>
        <div className='tag' style={{ marginBottom: '20px', textAlign: 'center' }}>
          <p>Upload a tag value so we can match it with the car</p>
          <input type="text" value={tagValue} onChange={handleTagInputChange} placeholder="Create Folder (based on tag)" style={{ fontSize: '16px', padding: '10px', width: '60%', borderRadius: '5px', border: '1px solid #ccc' }} />
    
        </div>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Exterior Image:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setExteriorFile)} style={{ fontSize: '16px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Interior Image:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setInteriorFile)} style={{ fontSize: '16px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Mechanical Image:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setMechanicalFile)} style={{ fontSize: '16px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Document:</label>
            <input type="file" onChange={(e) => handleFileChange(e, setDocumentFile)} style={{ fontSize: '16px', padding: '10px', width: '100%', borderRadius: '5px', border: '1px solid #ccc' }} />
          </div>
          <button type="submit" disabled={isLoading} style={{ fontSize: '18px', padding: '12px 20px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width: '100%', textAlign: 'center' }}>
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {uploadStatus && <p style={{ textAlign: 'center', marginTop: '10px', color: 'green' }}>{uploadStatus}</p>}
      </div>
    </div>
  );
};

export default UploadGCP;
