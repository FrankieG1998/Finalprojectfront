import { useState, useEffect } from 'react';
import Button from "./Button";
import Modal from "./Modal";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Import Firebase Authentication
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90 },
    { field: 'image_title', headerName: 'Image Title', width: 150 },
    { field: 'creator_name', headerName: 'Creator Name', width: 150 },
    { field: 'image_type', headerName: 'Image Type', width: 110 },
    { field: 'image_url', headerName: 'Image URL', width: 200 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState([]);
    const [selectionModel, setSelectionModel] = useState<string[]>([]);
    const auth = getAuth();
    const storage = getStorage();

    useEffect(() => {
        // This will run when the component mounts and whenever the auth state changes
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userFolderRef = ref(storage, `images/${user.uid}`);
                listAll(userFolderRef)
                    .then((res) => {
                        const imageRefs = res.items;
                        return Promise.all(imageRefs.map((imageRef) => 
                            getDownloadURL(imageRef).then((url) => ({
                                id: imageRef.name,
                                image_title: imageRef.name, // You might want to extract the title differently
                                creator_name: user.displayName || user.email, // Adjust as needed
                                image_type: imageRef.name.split('.').pop(), // Assumes type is the file extension
                                image_url: url
                            }))
                        ));
                    })
                    .then((images) => {
                        setImageData(images);
                    })
                    .catch((error) => {
                        console.error("Error fetching images: ", error);
                    });
            }
        });
    }, [auth, storage]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    // Define your deleteData function here if needed

    return (
        <>
            <Modal id={selectionModel} open={open} onClose={handleClose} />
            <div className="flex flex-row">
                <Button onClick={handleOpen} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">
                    Add New Image
                </Button>
                {/* Other buttons */}
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <h2>My Images</h2>
                <DataGrid
                    rows={imageData}
                    columns={columns}
                    checkboxSelection
                    onSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    pageSize={5}
                />
            </div>
        </>
    );
}

export default DataTable;
