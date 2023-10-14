import Background from '../assets/images/my-gallery.jpg'
import {Link} from 'react-router-dom'



function home() {
  return (
    <div 
        style={{ backgroundImage: `url(${Background})`}} 
        className='flex flex-row justify-center mx-auto bg-cover bg-fixed'
        >
           <div className='flex place-items-start align-top h-screen pt-5'>
              <h3 className='p-5 bg-black bg-opacity-50 text-white rounded'>
                <div>
                  <Link to='/gallery' /* onClick={clicked}*/ className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-100 hover:text-white mr-1">Show My Image Gallery</Link>
                </div>
              </h3>
           </div>
    </div>
    



  )
}

export default home