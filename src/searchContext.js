import { createContext, useContext, useState } from "react";


const searchContext =  createContext();


// Custom hooks
function useValue(){
    const value =  useContext(searchContext);
    return value;
}


// Global search context
function CustomSearchContext({children}){
    
    const [search , setSearch] = useState();
    const [data , setData] = useState()
   

    const handleSearch =  data?.filter((item) =>{
     let data;
        if(!search || search === ""){
            data =  item;
        }
        const serachTerm = search?.toLowerCase();
        const dataName = item.AlbumName?.toLowerCase() || item.ImageName?.toLowerCase();
        if(search){
            data = dataName?.includes(serachTerm)
        }

        return data;
    })

 

    return(
        <searchContext.Provider  value={{ data , setData , search , setSearch , handleSearch }}>
        {children}
        
        </searchContext.Provider>
    )


    
}

export { useValue };

export default CustomSearchContext