import { useState } from 'react';
import { auth, storage, STATE_CHANGED } from "../lib/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    // @ts-ignore
    const extension = file.type.split('/')[1];

    // Makes reference to the storage bucket location
    const fileRef = ref(storage, `uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);

    // Starts the upload
    // @ts-ignore
    const task = uploadBytesResumable(fileRef, file)

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      // @ts-ignore
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => getDownloadURL(fileRef))
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  return (
    <div className="box">
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="btn">
            <div className='bg-black hover:bg-slate-900 text-white font-bold rounded container py-2 my-4 px-4 z-10 w-max cursor-pointer'>Choose Image</div>
            <input className="hidden" type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
          </label>
        </>
      )}

      {downloadURL && <img src={`${downloadURL}`}></img>}
    </div>
  );
}