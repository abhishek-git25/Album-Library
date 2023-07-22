import Home from "./app/Home";
import Photos from "./app/Photos";
import Header from "./components/Header/Header.js";
import { RouterProvider ,  createBrowserRouter } from "react-router-dom";
import CustomSearchContext from "./searchContext";



function App() {

  const browserRouter =  createBrowserRouter([
    {
      path : '/',
      element : <Header/>,
      children :[
        {index : true , element : <Home/>},
        {
          path : '/photos',
          element : <Photos/>
        }
      ]
    }
  ])



  return (
    <CustomSearchContext>
      <RouterProvider router = {browserRouter} />
      </CustomSearchContext>
  );
}

export default App;
