import { useState, useEffect } from 'react';
import Button from "./Button";
import Modal from "./Modal";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';

type ImageRowType = {
    id: string;
    name: string;
    creator_name: string | null;
    image_type: string | undefined;
    image_url: string;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90 }, // Removed 'hide' property
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'creator_name', headerName: 'Creator Name', width: 150 },
    { field: 'image_type', headerName: 'Image Type', width: 110 },
    { field: 'image_url', headerName: 'Image URL', width: 200 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState<ImageRowType[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridRowSelectionModel>([]);
    const auth = getAuth();
    const storage = getStorage();

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const userFolderRef = ref(storage, `images/${user.uid}`);
                listAll(userFolderRef)
                    .then((res) => {
                        const imageRefs = res.items;
                        return Promise.all(imageRefs.map((imageRef) => 
                        getMetadata(imageRef).then((metadata)=>  ({
                            id: metadata.name,
                            name: metadata.customMetadata.name
                        }))
                            // getDownloadURL(imageRef).then((url) => ({
                            //     id: imageRef.name,
                            //     name: imageRef.name,
                            //     creator_name: user.displayName || user.email,
                            //     image_type: imageRef.name.split('.').pop(),
                            //     image_url: url
                            // }))
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
    
    const deleteSelectedImages = async () => {
            const promises = selectionModel.map(async (imageName) => {
                const imageRef = ref(storage, `images/${auth.currentUser?.uid}/${imageName}`);
                await deleteObject(imageRef); // Delete the image from Firebase Storage
            });
    
            try {
                await Promise.all(promises); // Wait for all delete operations to complete
                setImageData(prev => prev.filter(row => !selectionModel.includes(row.id))); // Update state to remove deleted images
            } catch (error) {
                console.error("Error deleting images: ", error);
            }
        };

        const editimages = 
    
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="modal-container" style={{ position: 'fixed', zIndex: 1000 }}>
                <Modal id={selectionModel as string[]} open={open} onClose={handleClose} />
            </div>
            <div className="flex flex-row">
                <Button onClick={handleOpen} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">
                    Add New Image
                </Button>
                <Button onClick={deleteSelectedImages} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">
                    Delete Selected Image
                </Button>
                <Button onClick={editimages} className="p-3 bg-slate-300 rounded m-3 hover:bg-slate-800 hover:text-white">
                    Edit Image
                </Button>
            </div>
            <div style={{ height: 400, width: '100%' }}>
                <h2>My Images</h2>
                <DataGrid
                    rows={imageData}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                />
            </div>
        </>
    );
}

export default DataTable;
