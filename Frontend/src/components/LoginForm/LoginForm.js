import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; 
import Errormessage from '../ErrorMessage/Errormessage';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/user'
import { useNavigate } from 'react-router-dom';

import './LoginForm.css'


const LoginForm = ({history}) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)
  const { loading, error, userInfo } = userLogin


  useEffect(() => {
    if(userInfo) {
      navigate("/home")
    }
  }, [ userInfo, navigate])



  const handleSubmit = async(e) => {
    e.preventDefault();

    dispatch(login(email, password))
    // console.log(email, password);
  };

  return (
   <div className="login-form">
    {error && <Errormessage variant='danger'>{error}</Errormessage>}
    {/* {Loading && <Loading/>} */}
     <form  onSubmit={handleSubmit}>
      <h2>Login</h2>
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

export default LoginForm;
