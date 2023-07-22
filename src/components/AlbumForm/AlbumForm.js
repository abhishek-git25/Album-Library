import React,{useState} from 'react'
import commonStyles from '../../Commonstyles.module.css'
import { Card, Form, FormControl, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseinit';



const AlbumForm = ({setShowToast , setToastType}) => {

  const [albumName, setAlbumName] = useState('')

  const clearInput = () =>{
    setAlbumName('')
  }


  const handleForm = async () => {
    try {
      const docRef = doc(collection(db, 'Albums'));
      await setDoc(docRef, {
        AlbumName: albumName
      });
      setShowToast('Album Added Successfully!')
      setToastType('success')
      clearInput()
    } catch (error) {
      setShowToast('Something Went Wrong')
      setToastType('error')
      console.error('Error adding album:', error);
    }
  };


  
  


  return (
    <div className='d-flex justify-content-center'>
      <Card className={`${commonStyles.formCard} mt-3`}>
        <Card.Header as="h5">Add Album</Card.Header>

        <Card.Body>
          <Form>
            <Form.Group controlId="Album Name">
              <FormControl type="text" placeholder="Album Name"  value={albumName}  onChange={(e) => setAlbumName(e.target.value)}/>
            </Form.Group>
          </Form>
          <div className='d-flex justify-content-end mt-3'>
            <Button variant='primary' style={{ width: "100px" }} onClick={() => handleForm()}>Add</Button>
            <Button variant='danger' style={{ width: "100px" }} className='ms-2' onClick={() => clearInput()}>Clear</Button>
          </div>
        </Card.Body>
      </Card>
      <div>
    
      </div>
    </div>
  )
}

export default AlbumForm