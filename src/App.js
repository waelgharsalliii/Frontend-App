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
import Registre from './SignUp/Registre';
import { BrowserRouter,createBrowserRouter,RouterProvider } from 'react-router-dom';
import { ReactDOM } from 'react';
import Login from './SignIn';
function App() {
  // Use state to track when the page has loaded
  const root =ReactDOM.createRoot(document.getElementById('root'));
  root.render()
  const [loaded, setLoaded] = useState(false);
  const [currentForm,setCurrentForm]=useState('register');
  const toggleForm=(formName)=>{
    setCurrentForm(formName);
  }
  const router=createBrowserRouter([
    {
      path:'/registre',
      element:<Registre></Registre>
    },
    {
      path:'/login',
      element:<Login></Login>
    }
  ])
  

  // Wait for the page to load, then set loaded to true
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 3000); // Change this to the actual time it takes for your page to load
  }, []);

  return (
    <div className="container-xxl bg-white p-0">
      {loaded ? ( // Show the page content after the page has loaded
        <>
          <NavBar />
          <About/>
          <New></New>
          <Service></Service>
          <Portfolio></Portfolio>
          <Testimonial></Testimonial>
          <Team></Team>
          <Footer></Footer>
        </>
      ) : ( // Show the spinner until the page has loaded
        <Spinner />
      )}
    </div>
  );
}

export default App;
