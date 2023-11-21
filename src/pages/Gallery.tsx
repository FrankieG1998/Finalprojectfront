import { useState, useEffect } from 'react';
import SimpleImageSlider from "react-simple-image-slider";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

function Gallery() {
    const [sliderImages, setSliderImages] = useState<{ url: string; }[]>([]); // Explicitly type the state
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
                            getDownloadURL(imageRef).then((url) => ({ url }))
                        ));
                    })
                    .then((images) => {
                        setSliderImages(images); // Set the fetched URLs in the state
                    })
                    .catch((error) => {
                        console.error("Error fetching images: ", error);
                    });
            } else {
                // Handle the case where there is no user signed in
                setSliderImages([]);
            }
        });
    }, [auth, storage]);

    return (
        <div>
            <h3 className="flex justify-center m-2">Welcome to My Image Gallery</h3>
            <div className="flex justify-center">
                {sliderImages.length > 0 ? (
                    <SimpleImageSlider
                        width={896} // You can use numerical values for width and height
                        height={504}
                        images={sliderImages}
                        showNavs={true}
                        showBullets={false}
                        autoPlay={true}
                        autoPlayDelay={2.0}
                    />
                ) : (
                    <p>Loading images...</p> // Display a loading message or a spinner
                )}
            </div>
        </div>
    );
}

export default Gallery;
