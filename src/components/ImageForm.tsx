import React, { useState } from 'react'; // Import React and useState
import Button from './Button'
import Input from './Input'

import { useForm } from 'react-hook-form';
import { server_calls } from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseImageTitle, chooseCreatorName, chooseImageType, chooseImageUrl } from '../redux/slices/RootSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Interfaces
interface ImageFormProps {
  id?: string[];
}

const ImageForm = (props: ImageFormProps) => {
  const { register, handleSubmit, reset } = useForm(); // Include reset from useForm
  const dispatch = useDispatch();
  const store = useStore();
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Specify the type for selectedFile
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async (data: any, event: React.BaseSyntheticEvent) => { // Make onSubmit async
    event.preventDefault(); // Prevent the default form submission
    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${selectedFile.name}`);
  
      try {
        const uploadResult = await uploadBytes(storageRef, selectedFile);
        const imageUrl = await getDownloadURL(uploadResult.ref);
        data.image_url = imageUrl;
      } catch (error) {
        console.error('Error uploading the file', error);
        return; // Stop the function if the upload fails
      }
    }
    
    if (props.id && props.id.length > 0) {
      await server_calls.update(props.id[0], data);
      console.log(`Updated: ${data.image_title} ${props.id}`);
    } else {
      dispatch(chooseCreatorName(data.creator_name));
      dispatch(chooseImageTitle(data.image_title));
      dispatch(chooseImageType(data.image_type));
      dispatch(chooseImageUrl(data.image_url));

      await server_calls.create(store.getState());
    }
    reset(); // Reset the form fields after submission
    setTimeout(() => { window.location.reload() }, 1000);
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ...other form fields... */}
        <input type="file" onChange={handleFileChange} />
        <div className="flex p-1">
          <Button type="submit" className='flex justify-center m-3 bg-slate-300 p-2 rounded hover:bg-slate-800 text-white'>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ImageForm;
