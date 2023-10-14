import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import Gallery from "../pages/Gallery";
import Search from "../pages/Search";


interface RouteType {
    path: string, 
    component: () => JSX.Element,
    name:string,
    protected: boolean
}


const routes: RouteType[] = [
    {
      path:"",
      component: Home, 
      name: "Home Screen",
      protected: false
    },
    {
      path:"/dashboard",
      component: Dashboard, 
      name: "Dashboard",
      protected: true
    },
    {
      path:"/gallery",
      component: Gallery, 
      name: "Gallery",
      protected: false
    },
    {
      path:"/search",
      component: Search, 
      name: "Search",
      protected: false
    },
  ]

  export default routes;