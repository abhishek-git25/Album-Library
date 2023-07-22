import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import headerStyle from './Header.module.css'
import { Form, FormControl } from 'react-bootstrap';
import { MdArrowBackIos } from 'react-icons/md';
import customStyles from '../../Commonstyles.module.css'
import { useValue } from '../../searchContext';




const Header = () => {

    const navigate = useNavigate()

    const  {  setSearch } = useValue()


    return (
        <>
            <div className={headerStyle.mainContainer}>
                <div className='d-flex align-items-center'>
            <MdArrowBackIos className= {`${customStyles.cursorPointer} text-white mt-2`} size={30} onClick={() => navigate('/')} />
                 
                <h3 className= { `${customStyles.cursorPointer} ms-2`} onClick={() => navigate('/')}>Album Library</h3>
                <Form className='ms-auto'>
                <Form.Group controlId="Album Name">
                  <FormControl type="text" placeholder="Search..."  onChange={(e) => setSearch(e.target.value)}/>
                </Form.Group>
              </Form>
                </div>
            </div>
            <Outlet />

        </>
    )
}

export default Header