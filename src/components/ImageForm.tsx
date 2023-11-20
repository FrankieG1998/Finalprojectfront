import React, { useState } from 'react'; // Make sure React is in scope since we're using JSX
//import Button from './Button'; // Assuming Button is a custom component that doesn't accept 'type' prop
// Import Input only if you are using it
import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseImageTitle, chooseCreatorName, chooseImageType, chooseImageUrl } from '../redux/slices/RootSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

interface ImageFormProps {
  id?: string[];
}

const ImageForm = (props: ImageFormProps) => {
  const { handleSubmit, reset } = useForm(); // Removed register if it's not being used
  const dispatch = useDispatch();
  const store = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const onSubmit = async (data: any) => { // Removed event parameter
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${selectedFile.name}`);
      try {
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        const imageUrl = await getDownloadURL(uploadResult.ref);
        data.image_url = imageUrl;
      } catch (error) {
        console.error('Error uploading the file', error);
        return;
      }
    }
    
    if (props.id && props.id.length > 0) {
      await server_calls.update(props.id[0], data);
    } else {
      dispatch(chooseCreatorName(data.creator_name));
      dispatch(chooseImageTitle(data.image_title));
      dispatch(chooseImageType(data.image_type));
      dispatch(chooseImageUrl(data.image_url));

      await server_calls.create(store.getState());
    }
    reset();
    setTimeout(() => { window.location.reload() }, 1000);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields here */}
        <input type="file" onChange={handleFileChange} />
        <div className="flex p-1">
          {/* Use 'button' instead of 'Button' if it's a standard HTML button element */}
          <button type="submit" className='flex justify-center m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white'>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageForm;
