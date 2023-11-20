import React, { useState, useEffect } from 'react'; // Import useEffect
import Button from "./Button";
import Modal from "./Modal";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID" }, // consider using 'hide: true' if you don't want to display the ID
    { field: 'image_title', headerName: 'Image Title', flex: 1 },
    { field: 'creator_name', headerName: 'Creator Name', flex: 1 },
    { field: 'image_type', headerName: 'Image Type', flex: 1 },
    { field: 'image_url', headerName: 'Image URL', flex: 1 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState([]); // State to hold image data
    const [selectionModel, setSelectionModel] = useState<string[]>([]);
    const auth = getAuth(); // Initialize Firebase Auth

    useEffect(() => {
        // Function to fetch data for the current user
        const fetchData = async () => {
            if (auth.currentUser) {
                const userId = auth.currentUser.uid;
                try {
                    const response = await server_calls.getUserImages(userId); // A hypothetical function to fetch user-specific images
                    setImageData(response.data);
                } catch (error) {
                    console.error("Error fetching data: ", error);
                }
            }
        };

        fetchData();
    }, [auth.currentUser]); // Effect runs when the currentUser changes
    
    const handleOpen = () =>{
        setOpen(true)
    }
    const handleClose= () =>{
        setOpen(false)
    }

    const deleteData = () =>{
        server_calls.delete(selectionModel[0])
        getData();
        console.log(`Selection model: ${selectionModel}`);
        setTimeout(() => {window.location.reload ()}, 1000)
    }
    

    return (
    <>
    <Modal
        id={selectionModel}
        open={open}
        onClose={handleClose}
    />
    <div className="flex flex-row">
        <div>
            <button
            className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white"
            onClick={()=>handleOpen()}
            >
                Add New Image
            </button>
        </div>
        <Button onClick={handleOpen} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"> Update Image </Button>
        <Button onClick={deleteData} className="p-3 bg-slate-300 m-3 rounded hover:bg-slate-800 hover:text-white"> Delete Image </Button>
    </div>
        <div className={ open ? "hidden" : "container mx-10 my-5 flex flex-col"} style={{ height: 400, width: '100%'}}>
            <h2 className="p-3 bg-slate-300 my-2 rounded"> My Images</h2>
            <DataGrid rows={imageData} columns={columns} //rowsPerPageOptions={[5]} 
            checkboxSelection={true} 
            onRowSelectionModelChange={(item:any) => {
                setSelectionModel(item)
            }}
            />
        </div>
    </>
  )
}

export default DataTable
