import './App.css';
import NavBar from './components/NavBar';
import Spinner from './components/Spinner';
import {React,useState,useEffect} from 'react';
import About from './components/About';
import New from './components/New';
import Service from './components/Service';
import Portfolio from './components/Portfolio';
import Testimonial from './components/Testimonial';
import Team from './components/Team';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import Register from './SignUp/Register';
import Login from './SignIn/Login';
import Profile from './Profile/Profile';




function App() {
  
  const [loaded, setLoaded] = useState(false);
  
  

  
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 2000); 
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {loaded ? ( 
        <>
          <NavBar />
          <Routes>
            <Route  path="/Register"  element={<Register/>}/>
            <Route path="/Login"  element={<Login />}></Route>
            <Route path="/Profile/:Token" element={<Profile/>}></Route>
          </Routes>
          <About/>
          <New></New>
          <Service></Service>
          <Portfolio></Portfolio>
          <Testimonial></Testimonial>
          <Team></Team>
          <Footer></Footer>
        </>
      ) : ( 
        <Spinner />
      )}
    </div>
  );
}

export default App;
