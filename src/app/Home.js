import React, { useEffect, useState } from 'react'
import AlbumForm from '../components/AlbumForm/AlbumForm'
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import AlbumList from '../components/AlbumList/AlbumList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseinit';
import { useValue } from '../searchContext';






const Home = () => {

  const [showForm, setshowForm] = useState(false)
  const [showToast, setShowToast] = useState()
  const [toastType, setToastType] = useState('')
  const [albumList, setAlbumList] = useState()

  const {  search ,  setData , handleSearch } = useValue()

  console.log(search , "26");

  useEffect(() => {
  if(showToast){
    toast( showToast  , {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      type : {toastType}
      });
  }
  }, [showToast])


  useEffect(() => {
    fetchAlbums()
    return  () =>{
      console.log("Unmounted component");
    }
  }, [])


  

  const fetchAlbums =  () =>{
    onSnapshot(collection(db , 'Albums') , (snapShot) =>{
      const albums = snapShot.docs.map((doc) =>{
        return{
          id : doc.id,
          ...doc.data()
        }
      })
      setAlbumList(albums)
      setData(albums)
    })
  }  
  
  const handleForm = () => {
    setshowForm(!showForm)
  }




  return (
    <div>
      {showForm && <AlbumForm  setShowToast = {setShowToast} setToastType = {setToastType}/>}

      <ToastContainer  position='top-right'  autClose = {5000} draggable theme = 'light' type = {toastType}/>
      <div className='d-flex justify-content-center mt-2'>
      {!showForm ? 
        <Button variant="outline-primary" onClick={() => handleForm()}><img src='https://cdn-icons-png.flaticon.com/128/9135/9135940.png' width={24} alt='icon'/> Add Album</Button>
        :
        <Button variant="outline-danger" onClick={() => handleForm()}>Close</Button>
      }
      </div>

      
      <div className='mt-5 mx-5 d-flex'>
      {handleSearch?.length > 0 ?  handleSearch?.map((item , index) =>{
        return(
          <AlbumList album = {item}  index = {index}/>
        )
      }) : <div className='text-muted text-center w-100'>No Album Found</div>}
      
      </div>
      
    </div>
  )
}

export default Home