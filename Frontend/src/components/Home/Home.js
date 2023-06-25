import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Home() {

  const navigate =  useNavigate()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  useEffect(() => {
    if(!userInfo){
        navigate('/')
    }
}, [userInfo])


  return (
    <div style={{minHeight: '500px', textAlign: 'center', marginTop: '80px'}}>
        <h1>Welcome {userInfo && userInfo.name}</h1>
    </div>
  )
}

export default Home