import React, { useEffect, useState } from 'react'
import commonStyles from '../../Commonstyles.module.css'
import { Button, Card, Form, FormControl } from 'react-bootstrap'

const PhotoListForm = ({addPhotos , photosToUpdate , updatePhotos
}) => {

  useEffect(() =>{
    if(photosToUpdate){
      setFormData({imageUrl : photosToUpdate.ImageUrl , title : photosToUpdate.ImageName})
    }
  },[photosToUpdate])

  const [formData , setFormData] = useState({imageUrl : "" , title : ""})

  const clearInput = () =>{
    setFormData({imageUrl : "" , title : ""})
  }
 
  const submitForm = () =>{
    const photos = {
      ImageName : formData.title,
      ImageUrl : formData.imageUrl
    }

    if(photosToUpdate){
      updatePhotos(photos)
      clearInput();
      return;
    }

    if(!photosToUpdate){
      addPhotos(photos)
      clearInput();
      return;
    }
  }






  return (
    <div className='d-flex justify-content-center'>
    <Card className={`${commonStyles.formCard} mt-3`}>
      <Card.Header as="h5">Add Photo</Card.Header>

      <Card.Body>
        <Form>
          <Form.Group controlId="Album Name">
            <FormControl type="text" placeholder="Title" value={formData.title}  onChange={(e) => setFormData({title : e.target.value , imageUrl : formData.imageUrl})} />
            <FormControl type="text" placeholder="Image URL" className='mt-2' value={formData.imageUrl}   onChange={(e) => setFormData({imageUrl : e.target.value , title : formData.title})}/>
          </Form.Group>
        </Form>
        <div className='d-flex justify-content-end mt-3'>
          <Button variant='primary' style={{ width: "100px" }} onClick={() =>submitForm() }> {photosToUpdate ? "Edit" : "Add"}</Button>
          <Button variant='danger' style={{ width: "100px" }} className='ms-2' onClick={() => clearInput()}>Clear</Button>
        </div>
      </Card.Body>
    </Card>
    <div>
  
    </div>
  </div>
  )
}

export default PhotoListForm