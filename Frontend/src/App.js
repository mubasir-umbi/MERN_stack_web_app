import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import Login from "./components/LoginForm/LoginForm"
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Signup from "./components/SignupForm/SignupForm";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Profile from "./components/Profile/Profile";
import Admin from "./components/AdminLogin/Admin";
import Dashboard from "./components/AdminDashboard";



function App() {
  return (


    <Router>
      <Header/>
      <main>
        <Routes>
          <Route exact path='/' Component={() => <Landing />} />
          <Route  path='/home' Component={() => <Home />} />
          <Route  path='/login' Component={() => <Login />} />
          <Route  path='/signup' Component={() => <Signup />} />
          <Route  path='/profile' Component={() => <Profile />} />
          <Route  path='/admin' Component={() => <Admin />} />
          <Route  path='/admin/dashboard' Component={() => <Dashboard />} />
        </Routes>
      </main>
      <Footer/>
    </Router>


  );
}

export default App;
