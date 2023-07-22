import React,{useEffect, useReducer, useState} from 'react'
import PhotoListForm from '../components/PhotoListForm/PhotoListForm'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import commonStyles from '../Commonstyles.module.css'
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { photosReducer } from '../reducer';
import { collection, doc, setDoc, onSnapshot, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from '../firebaseinit'
import { ToastContainer, toast } from 'react-toastify';
import { useValue } from '../searchContext';




const Photos = () => {

  const location =  useLocation();

  const albumId = location?.state?.id;

  const [showForm, setShowForm] = useState(false)
  const [ photosToUpdate, setPhotosToUpdate] = useState()
  

  const [state , dispatch] = useReducer(photosReducer , {photos : []})

  
  // destructuring context
   const {  setData , handleSearch } = useValue()


  useEffect(() =>{
    fetchPhotos()
  },[])

  // fetching photo list form firebase

  const fetchPhotos = async () =>{
    onSnapshot(collection(db , 'Photos') , (snapShot) =>{
      const photos = snapShot.docs.map((item) =>{
        return{
          id : item.id,
          ...item.data()
        }
      })
      dispatch({
        type : 'SHOW_PHOTOS',
        payload : photos
      })
      setData(photos)
    })
  }

  // handling form visibility

  const handleForm  = () =>{
  setShowForm(!showForm)
  }


  // add photos to firebase

  const addPhotos = async (photos) => {
    const docRef = doc(collection(db , 'Photos'))
    await setDoc(docRef , {
      AlbumId : albumId, ...photos
    })
  
    dispatch({
      type : 'ADD_PHOTOS' , payload :{id : docRef.id , photos}
    })
    toast.success('Photo Added Successfully!')
  }
  
  // filtering data uniquely according to album
  const filteredData = handleSearch?.filter((item) => item?.AlbumId === albumId)   


  // updating photos to firebase
  const updatePhotos = async (photos) => {
    const photoPos = filteredData.findIndex((item) => item.id === photosToUpdate.id)
    if(photoPos === -1){
      return false;
    }

    try {
      const photosRef = doc(db , 'Photos',  photosToUpdate.id)
      await updateDoc(photosRef , {
        AlbumId : albumId , ...photos
      })
      
      dispatch({
        type : 'UPDATE_PHOTO' , payload : {photoPos , photosToUpdate }
      })
      setPhotosToUpdate('');
      toast.success('Photo Updated Successfully!')
      
    } catch (error) {
      console.log(error);
    }
  }

  // handling edit behaviour
  const handleEdit = (data) =>{
    setPhotosToUpdate(data)
    setShowForm(true)
    window.scrollTo(0 , 0)
  }

  // deleting photos from firebase
  const deletePhoto = async (id) =>{
    const docRef =  doc(db , 'Photos' , id);
    await deleteDoc(docRef)
    toast.success('Photo Deleted !')
  }



  return (
    <div>
    <ToastContainer  position='top-right'  autClose = {5000} draggable theme = 'light' />
  
    {showForm && 
    <PhotoListForm  addPhotos = {addPhotos} photosToUpdate = {photosToUpdate}  updatePhotos = {updatePhotos}/>}

    <div className='d-flex justify-content-center mt-4'>
    {!showForm ? 
    <Button variant="outline-primary" onClick={() => handleForm()}><img src='https://cdn-icons-png.flaticon.com/128/9135/9135940.png' width={24} alt='icon' /> Add Photos</Button>:
    <Button variant="outline-danger" onClick={() => handleForm()}> Close</Button>}

    </div>
    
    <div className='m-5 d-flex'>
{filteredData?.map((item , index) =>{
  return(
    <div className='position-relative p-2 me-3' key={index}>
   
    <AiOutlineClose className={`${commonStyles.customCardClose} ${commonStyles.cursorPointer} position-absolute pt-1`}   onClick={() => deletePhoto(item?.id)}/>
    
     <div className={`${commonStyles.customCard} d-flex justify-content-center flex-column w-100`}>
       <img src={item.ImageUrl} alt='gallery' width={250}  height  ={200} className='mx-auto mt-4'></img>
       <div className={`${commonStyles.customCardContainer} mt-2`}>
       {item.ImageName} 
       </div>
       <div className={`${commonStyles.cursorPointer} text-end text-primary me-3 pb-2`} onClick={() => handleEdit(item)}>Edit</div>
     </div>
     </div>
  )
})}
  
    </div>
    </div>
  )
}

export default Photos