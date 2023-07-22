import React from 'react'
import classNames from 'classnames';
import { Card } from 'react-bootstrap';
import AlbumlistStyles from './AlbumList.module.css'
import { useNavigate } from 'react-router-dom';
import commonStyles from '../../Commonstyles.module.css'

const AlbumList = ({ album , index }) => {

  const navigate = useNavigate()

  const cardClasses = classNames(AlbumlistStyles.cardHover , commonStyles.cursorPointer )

  const redirect = (id) =>{
    navigate('/photos' , {state : { id }})
  }


  return (


    <div key={index} className='me-3' >
      <Card style={{ width: '10rem' }} className={cardClasses} onClick={() => redirect(album.id)}>
        <Card.Body>
          <Card.Img variant="top" src="https://cdn-icons-png.flaticon.com/128/4225/4225960.png"  className={AlbumlistStyles.albumIcon}/>
        </Card.Body>
        <Card.Footer>
          {album.AlbumName}
        </Card.Footer>
      </Card>

    </div>
  )
}

export default AlbumList