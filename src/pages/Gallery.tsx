import SimpleImageSlider from "react-simple-image-slider";
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

type SliderImage = {
    url: string;
};

function Gallery() {
    const [sliderImages, setSliderImages] = useState<SliderImage[]>([]);
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
                        setSliderImages(images);
                    })
                    .catch((error) => {
                        console.error("Error fetching images: ", error);
                    });
            }
        });
    }, [auth, storage]);
    console.log(sliderImages);

    return (
        <div>
            <h3 className="flex justify-center m-2">
                Welcome to My Image Gallery
            </h3>
            <div className="flex justify-center">
                <SimpleImageSlider
                    width='80%'
                    height='80%'
                    images={sliderImages}
                    showNavs={true}
                    showBullets={false}
                    autoPlay={true}
                    autoPlayDelay={1.0}
                />
            </div>
        </div>
    )
}

export default Gallery;
