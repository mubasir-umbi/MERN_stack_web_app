import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Errormessage from '../ErrorMessage/Errormessage';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin } from '../../actions/admin'
import { useNavigate } from 'react-router-dom';

import './AdminLogin.css'


const AdminLogin = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const admin = useSelector(state => state.adminLogin)
  const { loading, error, userInfo } = admin

  console.log(userInfo, 'user infoooooooo 21');


  useEffect(() => {
    if(userInfo) {
      navigate("/admin/dashboard")
    }
  }, [ userInfo, navigate])



  const handleSubmit = async(e) => {
    e.preventDefault();

    dispatch(adminLogin(email, password))
    // console.log(email, password);
  };

  return (
   <div className="login-form">
    {error && <Errormessage variant='danger'>{error}</Errormessage>}
    {/* {Loading && <Loading/>} */}
     <form  onSubmit={handleSubmit}>
      <h2>Admin Login</h2>
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
      <button style={{backgroundColor:'#78c2ad'}} type="submit">Login</button>

      <p style={{marginTop: '20px'}}>
        Don't have an account?{' '}
        <Link to="/signup">Register here</Link>
      </p>

    </form>
   </div>
  );
};



export default AdminLogin;
