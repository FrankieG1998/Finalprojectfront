import SimpleImageSlider from "react-simple-image-slider";
import { useGetData } from "../custom-hooks/FetchData";

function gallery() {
  //const {imageData, getData} = useGetData();
  const {imageData} = useGetData();
//   type objType = {
//     url: string;
//  };

  //let sliderImages: Array<objType> = [];
  
  const sliderImages = [{
        url: "https://images.unsplash.com/photo-1500051638674-ff996a0ec29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1218&q=80",
     },];

  for (let i=0; i<imageData.length; i++){
    sliderImages.push({'url': imageData[i]['image_url']});
  }
  //console.log(sliderImages);
 
  return (
    <div>
      <h3 className="flex justify-center m-2">
        {" "}
          Welcome to My Image Gallery 
      </h3>
    <div className="flex justify-center">
    <SimpleImageSlider
        width= '80%'
        height='80%'
        images={sliderImages}
        showNavs={true} showBullets={false} 
        autoPlay={true} 
        autoPlayDelay = {1.0}
          />
    </div>
 </div>
  )
}

export default gallery