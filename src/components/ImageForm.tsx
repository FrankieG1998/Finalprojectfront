import Button from './Button'
import Input from './Input'

import {useForm} from 'react-hook-form';
import {server_calls} from '../api/server';
import { useDispatch, useStore } from 'react-redux';
import { chooseImageTitle, chooseCreatorName, chooseImageType, chooseImageUrl } from '../redux/slices/RootSlice';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

//interfaces
interface ImageFormProps {
  id?: string[], 
  //data?: {}
}

const ImageForm = (props:ImageFormProps) => {
  const { register, handleSubmit } = useForm({})
  const dispatch =useDispatch();
  const store = useStore();
  const [selectedFile, setSelectedFile] = useState(null);
  
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onSubmit = (data: any, event: any) => {
    console.log(`ID: ${ typeof props.id}`);
    console.log(`ID: ${props.id}`);
    console.log(data);

    if (selectedFile) {
      const storage = getStorage();
      const storageRef = ref(storage, 'images/' + selectedFile.name);
  
      // Upload the file to Firebase Storage
      const uploadResult = await uploadBytes(storageRef, selectedFile);
      // Get the URL of the uploaded file
      const imageUrl = await getDownloadURL(uploadResult.ref);
  
      // Add the image URL to the form data
      data.image_url = imageUrl;
    }
    
    if (props.id && props.id.length >0){
      server_calls.update(props.id[0], data)
      console.log(`updated: ${data.image_title} ${props.id}`)
      setTimeout(()=>{window.location.reload()}, 5000);
      event.target.reset();
    }
    else{
      // use dispatch to update our state in our store
      dispatch(chooseCreatorName(data.creator_name));
      dispatch(chooseImageTitle(data.image_title));
      dispatch(chooseImageType(data.image_type));
      dispatch(chooseImageUrl(data.image_url));

      server_calls.create(store.getState());

      setTimeout(() => {window.location.reload()}, 1000);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="image_title"> Image Title</label>
            <Input {...register('image_title')} name="image_title" placeholder="Image Title" />
        </div>
        <div>
          <label htmlFor="creator_name"> Creator Name</label>
            <Input {...register('creator_name')} name="creator_name" placeholder="Creator Name" />
        </div>
        <div>
          <label htmlFor="image_url"> Image URL</label>
            <Input {...register('image_url')} name="image_url" placeholder="Image URL" />
        </div>
        <div>
          <label htmlFor="image_type"> Image Type</label>
            <Input {...register('image_type')} name="image_type" placeholder="Image Type" />
        </div>
        <input type="file" onChange={handleFileChange} />
        <div className="flex p-1">
          <Button className='flex justify-center m-3 bg-slate-300 p-2  rounded hover:bg-slate-800 text-white'
          > Submit </Button>
        </div>
      
      </form>
    </div>
  )
}

export default ImageForm
