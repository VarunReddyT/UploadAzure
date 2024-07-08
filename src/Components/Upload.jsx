import React from 'react'
import axios from 'axios'

export default function Upload() {
  const uploadFile = async (e) => {
    e.preventDefault();
    const file = e.target.fileInput.files[0]
    const formData = new FormData();
    formData.append('video', file);

    try {
      const res = await axios.post('https://upload-azure-three.vercel.app/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
      <form onSubmit={uploadFile} style={{ textAlign: 'center' }}>
        <input type="file" name="fileInput" />
        <button className='btn btn-primary' type="submit">Upload</button>
      </form>
    </div>
  )
}
