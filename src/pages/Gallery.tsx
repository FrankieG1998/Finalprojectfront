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
        url: "https://content.api.news/v3/images/bin/f3e024e0f1063afd90e1c94664862e10?width=768",
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
