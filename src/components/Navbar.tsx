import { useState } from "react"
import {Link} from 'react-router-dom'
import Button from "./Button";
import {signInWithPopup, signOut} from 'firebase/auth';
import {auth, Providers} from '../config/firebase';

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);

    const signOutOnClick = () =>{
        signOut(auth)
        location.reload();
    }

    const signInOnClick = async () =>{
        const response = await signInWithPopup(auth, Providers.google);
        if (response.user) {
            location.reload();
        }
    }

    const dropDown = () =>{
        setIsVisible(!isVisible)
    }

    const clicked =() =>{
        setIsVisible(false)
    }

    return (
        //<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <nav className="flex items-center justify-between flex-wrap bg-black bg-opacity-60 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <Link to='/' className="font-semibold tracking-tight" >My Image Gallery</Link>

            </div>
            <div className="block">
                <button className="flex items-center px-3 py-2 text-slate-200 border rounded border-slate-400 hover:text-white hover:border-white"
                    onClick={dropDown}
                    >
                    <i className="fas fa-bars"></i>
                </button>
                { isVisible ? (
                    <div className="w-full block flex-grow items-center">
                        <div className="text-sm lg:flex-grow">
                            <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                                <div>
                                    <Link to='/'  onClick={clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-100 hover:text-white mr-1">Home</Link>
                                </div>
                            </Button>
                            <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                            <div>
                                    <Link to='/gallery'  onClick={clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-100 hover:text-white mr-1">Gallery</Link>
                                </div>
                            </Button>
                            <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                                <div>
                                    <Link to='/search'  onClick={clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-100 hover:text-white mr-1">Search Images</Link>
                                </div>
                            </Button>
                            <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                                <div>
                                    <Link to='/dashboard'  onClick={clicked} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-100 hover:text-white mr-1">Images Dashboard</Link>
                                </div>
                                </Button>
                            {
                                !auth.currentUser ?
                                <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                                    <div>
                                        <Link to="/" onClick={ () => {signInOnClick()}} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white">
                                            Login
                                        </Link>
                                    </div>
                                </Button>
                                :
                                <>
                               <Button className="p-3 m-5 bg-slate-400 justify-center rounded">
                                <div>
                                    <Link to="/" onClick={ () => {signOutOnClick()}} className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-white">
                                        Sign Out
                                    </Link>
                                </div>
                                </Button>
                                </>
                            }
                        </div>
                    </div>
                    ) : (
                    <></>
                )}
            </div>
        </nav>
    )
}

export default Navbar