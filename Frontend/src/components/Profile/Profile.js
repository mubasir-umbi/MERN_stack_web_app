import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Errormessage from '../ErrorMessage/Errormessage'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../actions/user'

function Profile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pic, setPic] = useState()
    const [confirmPassword, setConfirmPassword] = useState('')
    const [picMessage, setPicMessage] = useState()

    const dipatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    console.log(userInfo);

    const userUpdate = useSelector((state) => state.userUpdate)
    const { loading, error, sucess } = userUpdate

    useEffect(() => {
        if(!userInfo){
            navigate('/')
        }else{
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPic(userInfo.pic)
        }
    }, [userInfo])


    const postDetails = (pics) => {
        if(!pics){
          return setPicMessage("Please Select a image")
        }
        setPicMessage(null)
    
        if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
          const data = new FormData()
          data.append('file', pics)
          data.append('upload_preset', 'mernwebapp')
          data.append('cloud_name', 'mubasir umbi')
    
          fetch("https://api.cloudinary.com/v1_1/dxhgcbjxz/image/upload", {
            method: "post",
            body: data,
          }).then(res => res.json())
            .then(data =>{ console.log(data)
            setPic(data.url.toString())
            console.log(pic, '.................................................................');
        }).catch( err => console.log(err))
        }else{
          return setPicMessage("Please Selece a image")
        }
      }  


      const submitHandler = e => {
        e.preventDefault()

        if(password === confirmPassword){
            dipatch(updateProfile({name, email, password, pic}))
        }
      }




  return (
    <div>
       
        <Container>
        
        <Row className='profileContainer'>
            <Col md={6} className="mt-5">
            <h1 style={{textAlign: 'center'}}>Edit Profile</h1>

            {sucess && <Errormessage variant='sucess'>Updated Successfully</Errormessage>}

                <Form onSubmit={submitHandler} >
                    <Form.Group controlId='name' className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter Name'
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='email' className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type='email'
                          placeholder='Enter Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='password' className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Enter Password'
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId='confirmPassword' className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Confirm Password'
                          value={confirmPassword }
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {picMessage &&  <Errormessage variant='danger'>{picMessage}</Errormessage>}
                    <Form.Group controlId="pic" className="mb-3">
                     <Form.Label>Change profile pic</Form.Label>
                       <Form.Control 
                        //  id="custom-file"
                         type="file"
                         label="Upload Profile Picture"
                         custom
                         onChange={(e) => postDetails(e.target.files[0])}
                         >
                         </Form.Control>
                       </Form.Group>

                    <Button className="mt-4 mb-4" type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
                <div >
                <img style={{borderRadius: '50%', maxWidth: '300px'}} src={pic} alt={name} className='profilePic'/>

                </div>
            </Col>
        </Row>
        </Container>
    </div>
  )
}

export default Profile