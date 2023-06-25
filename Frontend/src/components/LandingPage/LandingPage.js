import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'


import "./LandingPage.css"
import { useNavigate } from 'react-router-dom'

function LandingPage() {

    const navigate = useNavigate()

    useEffect (() => {
        const userInfo = localStorage.getItem("userInfo")
    
        if(userInfo){
          navigate('/home')
        }
      }, [])


  return (
    <div className='main'>
     
        <Container>
            <Row>
                <div className="intro-text">
                    <h1 className='title'>welcome to Blah</h1>
                    <p className='sub-title'>One safe place</p>
                   

                <div className='btn-container'>
                    <a href='/login'>
                        <Button size='lg' className='landing-btn'>Login</Button>
                    </a>
                    <a href='/signup'>
                        <Button size='lg' className='landing-btn' variant='outline-primary'>Signup</Button>
                    </a>
                </div>
                </div>
            </Row>
        </Container>
       
    </div>
  )
}

export default LandingPage