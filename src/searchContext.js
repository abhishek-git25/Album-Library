import { createContext, useContext, useState } from "react";


const searchContext =  createContext();

function useValue(){
    const value =  useContext(searchContext);
    return value;
}

function CustomSearchContext({children}){
    
    const [search , setSearch] = useState();
    const [data , setData] = useState()
    console.log(data , "15");

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

    console.log(handleSearch , "25");
 

    return(
        <searchContext.Provider  value={{ data , setData , search , setSearch , handleSearch }}>
        {children}
        
        </searchContext.Provider>
    )


    
}

export { useValue };

export default CustomSearchContext