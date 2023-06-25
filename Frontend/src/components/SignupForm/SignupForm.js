import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import ErrorMessage from '../ErrorMessage/Errormessage'
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/user';

import './SignupForm.css';


const SignupForm = () => {

 const [email, setEmail] = useState("")
 const [name, setName] = useState("")
 const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg")
 const [password, setPassword] = useState("")
 const [confirmPassword, setConfirmPassword] = useState("")
 const [message, setMessage] = useState(null)
 const [picMessage, setPicMessage] = useState(null)



 const dispatch = useDispatch()
 const navigate = useNavigate()

 const userRegister = useSelector(state => state.userRegister)
 const { loading, error, userInfo } = userRegister

 useEffect(() => {
  if(userInfo){
    navigate('/home')
  }
 }, [navigate, userInfo])


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password !== confirmPassword){
        setMessage('Password not match')
       }else{
        dispatch(register(name, email, password, pic))
      }
  };

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


  return (
   <div className="signup-form">
    {message && <ErrorMessage variant= "danger">{message}</ErrorMessage>}
    {error && <ErrorMessage variant= "danger">{error}</ErrorMessage>}
     <form  onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="confirm-password">Password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      {picMessage && <ErrorMessage variant= "danger">{picMessage}</ErrorMessage>}

      <div className="form-group">
        <label htmlFor="picture">Profile Picture</label>
        <input
          type="file"
          accept="image/png"
          name="picture"
          id="picture"
           onChange={e => postDetails(e.target.files[0])}
          required
        />
      </div>
      <button type="submit">Sign Up</button>

      <p style={{marginTop: '20px'}}>
        Alredy have an account?{' '}
        <Link to="/login">Signin here</Link>
      </p>
    </form>
   </div>
  );
};

export default SignupForm;
