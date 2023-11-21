import { useState, useEffect } from 'react';
import Button from "./Button";
import Modal from "./Modal";
import { DataGrid, GridColDef, GridSelectionModel } from '@mui/x-data-grid';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

// Define the type for a row in your data grid
type ImageRowType = {
    id: string;
    image_title: string;
    creator_name: string | null;
    image_type: string | undefined;
    image_url: string;
};

const columns: GridColDef[] = [
    { field: 'id', headerName: "ID", width: 90, hide: true },
    { field: 'image_title', headerName: 'Image Title', width: 150 },
    { field: 'creator_name', headerName: 'Creator Name', width: 150 },
    { field: 'image_type', headerName: 'Image Type', width: 110 },
    { field: 'image_url', headerName: 'Image URL', width: 200 }
];

function DataTable() {
    const [open, setOpen] = useState(false);
    const [imageData, setImageData] = useState<ImageRowType[]>([]);
    const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([]);
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
                            getDownloadURL(imageRef).then((url) => ({
                                id: imageRef.name,
                                image_title: imageRef.name,
                                creator_name: user.displayName || user.email,
                                image_type: imageRef.name.split('.').pop(),
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
            <Modal id={selectionModel as string[]} open={open} onClose={handleClose} />
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
                    onRowSelectionModelChange={(newSelectionModel) => {
                        setSelectionModel(newSelectionModel);
                    }}
                    pageSize={5}
                />
            </div>
        </>
    );
}

export default DataTable;
